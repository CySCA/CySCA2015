#!/usr/bin/python

import random
import socket
import re
import time
import traceback
import sys


HOST = '0.0.0.0'
PORT = 27182
N_ROUNDS = 20
TIMEOUT = 6.0
WELCOME_BANNER = """Welcome to Lights Out

You will be given lights out boards, give me the moves to turn all of the lights out. Moves are in the 'X,Y' form with one per line,
the top left of the board is '0,0'. Send 'Invalid' if no solution found.

"""
FLAG_FILE = "/opt/lightsout/flag.txt"


class LightsOut(object):
    """
    Class to store the 5x5 lights out board and do operations to it
    """

    def __init__(self, solvable=True, board=None, verbose=0):
        self.verbose = verbose
        self.moves = []

        if (type(board) is list or type(board) is tuple) and len(board) == 25:
            self.board = list(board)
        else:
            self._generate(solvable)

    def is_solvable(self):
        """
        Test the board against Anderson & Fiel's vectors
        """
        N_1 = (0, 1, 1, 1, 0,
               1, 0, 1, 0, 1,
               1, 1, 0, 1, 1,
               1, 0, 1, 0, 1,
               0, 1, 1, 1, 0)
        N_2 = (1, 0, 1, 0, 1,
               1, 0, 1, 0, 1,
               0, 0, 0, 0, 0,
               1, 0, 1, 0, 1,
               1, 0, 1, 0, 1)

        def Z2_dot_product(x, y):
            """
            Calculate the dot product of two Z_2 vectors
            """
            l = len(x)
            if l != len(y):
                return None

            cur_sum = 0
            for i in range(l):
                cur_sum ^= x[i] * y[i]

            return cur_sum

        return Z2_dot_product(self.board, N_1) == 0 and \
            Z2_dot_product(self.board, N_2) == 0

    def is_solved(self):
        """
        Puzzle is solved when all spaces are 0 - test this
        """
        return all(x == 0 for x in self.board)

    def _generate(self, solvable=True):
        """
        Generate a 5x5 lights out board
        Can specify whether the board must be solvable
        """
        found_board = False
        boards_tested = 0

        while not found_board:
            self.board = [0] * 25
            random.seed()
            board_digits = random.getrandbits(len(self.board))
            for i in range(len(self.board)):
                self.board[i] = (board_digits & (1 << i)) >> i

            found_board = not (self.is_solvable() ^ solvable)
            boards_tested += 1

        if self.verbose > 1:
            print "Boards tested for solution: {}".format(boards_tested)

    def __str__(self):
        """
        Get the board as a 5x5 grid - 1 indicates the light is on
        """
        s = ''
        for row in range(0, 25, 5):
            r_s = ' '.join('{:01}'.format(x) for x in self.board[row:row + 5])
            s += "{}\n".format(r_s)
        return s

    def toggle(self, pos):
        """
        Toggle the board at the position
        Can be given in vector or matrix coordinates
        """

        if type(pos) is int and 0 <= pos < 25:
            x = pos % 5
            y = pos / 5
        elif (type(pos) is tuple or type(pos) is list) \
            and len(pos) == 2 and 0 <= pos[0] < 5 \
                and 0 <= pos[1] < 5:

            x = pos[0]
            y = pos[1]
            pos = y * 5 + x
        else:
            return

        self.moves.append(pos)

        self.board[pos] = 0 if self.board[pos] else 1
        if x > 0:
            self.board[pos - 1] = 0 if self.board[pos - 1] else 1
        if x < 4:
            self.board[pos + 1] = 0 if self.board[pos + 1] else 1
        if y > 0:
            self.board[pos - 5] = 0 if self.board[pos - 5] else 1
        if y < 4:
            self.board[pos + 5] = 0 if self.board[pos + 5] else 1

    def chase(self):
        """
        Run the chase algorithm down the board
        """
        for i in range(20):
            if self.board[i]:
                self.toggle(i + 5)

    def solve(self):
        """
        Solve the board using a light chase
        """

        SOLVER = {0b11100: (1, ), 0b11011: (2, ), 0b10110: (4, ),
                  0b10001: (0, 1), 0b01101: (0, ), 0b01010: (0, 3),
                  0b00111: (3, )}

        if self.verbose > 0:
            print "Initial board:"
            print str(self)

        # first chase the board down
        self.chase()

        if self.verbose > 1:
            print "Board after first chase:"
            print str(self)

        # next check the lights left on the bottom row
        bottom_row = reduce(lambda x, y: (x << 1) | y, self.board[20:], 0)
        if bottom_row == 0:
            return self.moves
        if bottom_row not in SOLVER:
            self.moves = None
            return None

        for p in SOLVER[bottom_row]:
            self.toggle(p)

        if self.verbose > 1:
            print "Board after top row fix:"
            print str(self)

        # rechase the board for final solution
        self.chase()
        if self.verbose > 1:
            print "Board after second chase:"
            print str(self)

        return self.moves

    def get_matmoves(self):
        """
        Convert the vector indicies to matrix addresses, top left is 0, 0
        """

        matmoves = []
        for i in range(len(self.moves)):
            matmoves.append((self.moves[i] % 5, self.moves[i] / 5))

        return matmoves


def process_msg(msg):
    """
    Process the incomming message by breaking it up line by line
    """
    RESP_FORMAT = re.compile('(\\d), ?(\\d)')

    msg_lines = msg.split('\n')
    moves = []

    if msg_lines[0] == "Invalid":
        return (False, '')

    for i in range(len(msg_lines)):
        m = RESP_FORMAT.match(msg_lines[i])
        if m:
            moves.append((int(m.group(1)), int(m.group(2))))
        elif i + 1 < len(msg_lines):
            # processing not at the last line and the response is not in the
            # correct format
            return None

    if len(moves) + 1 == len(msg_lines):
        # didn't process the last line, assume the transmission was cut off and
        # return the last message
        return (moves, msg_lines[-1])
    elif len(moves) < len(msg_lines):
        # something bad happened here
        return None
    else:
        # processed all lines successfully no message left to process in
        # the future
        return (moves, '')


def serve_challenge(svr):
    while True:
        conn, addr = svr.accept()

        # Send banner
        conn.send(WELCOME_BANNER)

        completed = False
        for i in range(N_ROUNDS):
            # one in ten boards are invalid
            solvable = random.randrange(10) > 0

            # Create and send the board
            board = LightsOut(solvable=solvable)
            conn.send("Round {}:\n{}\n".format(i+1, str(board)))

            cur_time = TIMEOUT
            end_time = time.time() + TIMEOUT
            msg = ''
            errored = False
            solved = False

            # loop while time is left, the puzzle isn't solved and there
            # haven't been any errors
            while not errored and cur_time > 0.0 and not solved:
                try:
                    conn.settimeout(cur_time)
                    msg += conn.recv(2048)

                    # Process the received message
                    process = process_msg(msg)
                    if process is None:
                        # Couldn't process the message
                        conn.send("Invalid format given\n\n")
                        conn.close()
                        errored = True
                        break
                    else:
                        # the last move may have been cut off - save this part
                        msg = process[1]

                        # The moves will be False if "Invalid" indicated
                        if process[0] == False:
                            # Verify the puzzle wasn't solvable
                            if not solvable:
                                solved = True
                            else:
                                conn.send("Puzzle is solvable\n\n")
                                conn.close()
                                errored = True
                                break
                        else:
                            # Moves were given - process them
                            for move in process[0]:
                                board.toggle(move)
                            solved = board.is_solved()

                        cur_time = end_time - time.time()

                        completed = solved and i == N_ROUNDS-1
                except socket.timeout:
                    cur_time = end_time - time.time()

            if errored:
                # error received, get out of the loop
                break
            if not solved and cur_time <= 0.0:
                conn.send("Idle Time Expired\n\n")
                break

        if completed:
            with open(FLAG_FILE, 'r') as fp:
                flag = fp.read()
                conn.send("\nHere's the flag: {}\n".format(flag))

        conn.close()


def main():
    while True:
        try:
            svr = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            svr.bind((HOST, PORT))
            svr.listen(1)

            serve_challenge(svr)
        except KeyboardInterrupt:
            svr.close()
            print
            return
        except:
            # Got an unhandled exception - wait 10 seconds and start again
            svr.close()
            print traceback.print_exc()
            time.sleep(10)
            continue


def indicate_done(signum, frame):
    print "Everything is likely done... Exiting."
    raise KeyboardInterrupt("Exit")

if __name__ == "__main__":
    main()

#!/usr/bin/env python
'''
    Simple socket server using threads
'''

import os, sys, socket, struct, random
from thread import *

encoders = ['us-ascii', 'rot13', 'base64', 'bz2', 'hex', 'uu', 'zip']

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print 'Socket created'

# Bind socket to local host and port
try:
  s.bind(('', int(os.getenv('PORT'))))
except socket.error as msg:
  print 'Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1]
  sys.exit()

print 'Socket bind complete'

#Start listening on socket
s.listen(4722)
print 'Socket now listening'

#Function for handling connections. This will be used to create threads
def clientthread(conn):
  #Sending message to connected client
  conn.send('g0ldil0cks server 3.0\n') #send only takes string

  #Receiving from client
  data = conn.recv(1024)
  reply = ""
  encoding = random.randint(0, len(encoders)-1)
  if not data:
    return

  if len(data) % 3 == 1:
    reply = "This porridge is too cold."
  elif len(data) % 3 == 2:
    reply = "This porridge is too hot."
  else:
    with open('goldilocks.txt', 'r') as f:
      i = 0
      while i <= len(data) - 3:
        tlv = data[i:i+3]
        i += 3

        (encoding, length, offset) = struct.unpack('BBB', tlv)
        print "DEBUG: Parsing (", encoding, length, offset, ")"

        if encoding >= len(encoders):
          reply = "This encoder is not right."
          encoding = random.randint(0, len(encoders)-1)
          break

        try:
          f.seek(offset, 1)
          reply += f.read(length)
        except:
          reply = "You spilled my porridge!"

  print "DEBUG: encoding:", encoders[encoding]
  print "DEBUG: reply:", reply
  conn.sendall(reply.encode(encoders[encoding]))

  #came out of loop
  conn.close()

#now keep talking with the client
while 1:
  #wait to accept a connection - blocking call
  conn, addr = s.accept()
  print 'Connected with ' + addr[0] + ':' + str(addr[1])

  #start new thread takes 1st argument as a function name to be run, second is the tuple of arguments to the function.
  start_new_thread(clientthread ,(conn,))

s.close()

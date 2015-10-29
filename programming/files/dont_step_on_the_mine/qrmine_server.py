#!/usr/bin/python

import socket
import sys
import time
import random
import pyqrcode
import string

HOST = '0.0.0.0'                 # Symbolic name meaning all available interfaces
PORT = 22524       	       # Arbitrary non-privileged port
flag = open("/opt/qrmine/flag.txt","r").read().strip()	#load flag data into variable
imgpath = "/opt/qrmine/images/"
log_file = open("/opt/qrmine/qrmine.log","a")		##log to logfile
sys.stdout = log_file

print "Starting QRMine Server"
sys.stdout.flush()

def genquestion():
	##generate random error level and random string and create a qrcode
	error=random.choice("LMQ")
	text=''.join(random.choice(string.lowercase) for x in range(20,90))
	data = pyqrcode.create(text,error=error)
	baseqrcode = data.text(quiet_zone=1)

	##clean output
	baseqrcode = baseqrcode.strip("\n")
	##work out length of QR code
	length = len(baseqrcode.split("\n"))
	
	##create matrix
	matrix = [[0 for a in xrange(length)] for a in xrange(length)]
	basex=0
	basey=0

	###put baserq into matrix
	for rowdata in baseqrcode.split("\n"): #loop though y
        	for char in rowdata: #loop though x in each y
         		matrix[basey][basex]=int(char)
	                basex+=1
	        basey+=1
        	basex=0

	##Generate ranedom location for error in safe zone
	xrandom=random.randint(10,length-11)
	yrandom=random.randint(10,length-11)

	##flip the bit in the matrix
	matrix[yrandom][xrandom] = int(not bool(matrix[yrandom][xrandom]))

	#define the asnswer
	answer = "%s,%s"%(xrandom,yrandom)

	##turn the qr matrix back into a string
	qrcode=""
	for pos in range(0,length):
	        for pos2 in range(0,length):
        	        qrcode+=str(matrix[pos][pos2])
	        qrcode+="\n"
	return (qrcode,answer)

##Start socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(1)
print "Listening on %s:%s"%(HOST,PORT)
sys.stdout.flush()

while True:
	try:
		##accept connection send welcome message and set the timeout to 3 seconds
		conn, addr = s.accept()
		print "Connection From %s:%s"%addr
		sys.stdout.flush()
		conn.settimeout(3)
		conn.send("Welcome to QR MineSweeper\n\nYou will be given 20 QR codes containing random text, each code contains a 1 bit error that you need to locate and send back in the from 'XX,YY'. The top Left of the grid is 0,0\n\n")
		time.sleep(.1)
		count=1
		##primary loop
		while True:
			##send the qrcode
			sys.stdout.flush()
			time.sleep(.1)
			conn.send("QRCode %s:\n"%count)		
			qrcode,answer = genquestion()
			conn.send("%s\n\n"%qrcode)
			print "Question: %s"%qrcode
			print "Answer: %s"%answer

			##colelct player answer
			playeranswer = conn.recv(8192)
			playeranswer = playeranswer.strip()
			print "PlayerAnswer: %s"%playeranswer

			##check answer
			if playeranswer==answer:
				conn.send("Correct\n")
			else:
				conn.send("Incorrect Answer\nSession Terminated\n")
				conn.close()
		                sys.stdout.flush()
				break	

			##if 20 have been answered return the flag
			if count == 20:
				print "User solved"
				conn.send("\n------------------------------------------------------\nCongratulations you found all 20 Errors\n")
				conn.send("Flag: %s\n------------------------------------------------------\n" %flag)
				conn.close()
		                sys.stdout.flush()
				break
	
			count+=1\
	##send timeout error
	except socket.timeout:
		conn.send("\n\nIdle Time Expired\n\n")
		print "Connection Expired"
                sys.stdout.flush()
		conn.close()

	##log any other error
	except Exception, e:
		print e
                sys.stdout.flush()
                conn.close()

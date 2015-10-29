#!/usr/bin/python

import socket
import sys
import time
import pyqrcode
import random
import uuid
import Image
from qrtools import QR
from num2words import num2words
from word2num import word2num
HOST = '0.0.0.0'                 # Symbolic name meaning all available interfaces
PORT = 33080       	       # Arbitrary non-privileged port
flag = open("/opt/qrquiz/flag.txt","r").read().strip()
imgpath = "/opt/qrquiz/images/"
log_file = open("/opt/qrquiz/qrquiz.log","a")
sys.stdout = log_file

print "Starting QRquiz Server"
sys.stdout.flush()
def genquestion():
	sign = random.choice('+-*')
	if sign == "+":
		outsign = "Plus"
		num1 = random.randint(1, 1000)
		num2 = random.randint(1, 1000)
		answer = num1+num2
	if sign == "-":
		outsign = "Minus"
		num1 = random.randint(1, 1000)
		num2 = random.randint(1, 1000)
		while num1 < num2:
			num2 = random.randint(1, 1000)
		answer = num1-num2
	if sign == "*":
		outsign = "Times"
		num1 = random.randint(2, 99)
		num2 = random.randint(2, 99)
		answer = num1*num2

	outstring = "%s %s %s"%(num2words(num1),outsign,num2words(num2))
	return (outstring,answer)

def readqr(data):
	filename = "%s%s.bmp" %(imgpath,str(uuid.uuid4()))
	##qr mappings
	cmap = {'0': (255,255,255),
        	'1': (0,0,0)}

	## clean up the data
	data = data.strip("\n")
	length = len(data.split("\n"))
	data = data.replace("\n","")

	##build image
	rawdata = [cmap[letter] for letter in data]
	img = Image.new('RGB', (length, len(data)//length), "white")
	img.putdata(rawdata)
	img.save(filename, 'BMP')

	##decode image
	myCode = QR(filename=filename)
	if myCode.decode():
        	text=myCode.data
		return text.lower()
	else:
		return False


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(1)
print "Listening on %s:%s"%(HOST,PORT)
sys.stdout.flush()
while True:
	try:
		conn, addr = s.accept()
		print "Connection From %s:%s"%addr
		sys.stdout.flush()
		conn.settimeout(3)
		conn.send("Welcome to QR Maths Quiz\n\nYou will be given 20 QR codes containing simple maths questions.\nYou need to decode these QR codes and answer the question reponding in the same fromat as the question is received\n\n")
		time.sleep(.1)
		count=1
		while True:
			sys.stdout.flush()
			time.sleep(.1)
			conn.send("Question %s:\n"%count)		
			question,answer = genquestion()

			##generate my own QR code data
			questionqr = pyqrcode.create(question)
			questiontext = questionqr.text(quiet_zone=1)
			
			conn.send("%s\n\n"%questiontext)
			print "Question: %s"%question
			print "Answer: %s"%answer
			data=conn.recv(8192)
			data = data.strip()
			playerwords = readqr(data)
			if playerwords:
				try:
					print "PlayerAnswer: %s"%playerwords
					playeranswer = word2num(playerwords)
					print "PlayerAnswer: %s"%playeranswer
				except:
					playeranswer = False

				if playeranswer == answer:
					conn.send("Correct\n")
				else:
					conn.send("Incorrect Answer\nSession Terminated\n")
					conn.close()
			                sys.stdout.flush()
					break	
			else:
				conn.send("Could not Parse QR code\nSession Terminated\n")
                                conn.close()
		                sys.stdout.flush()
                                break

			if count == 20:
				print "User solved"
				conn.send("\n------------------------------------------------------\nCongratulations you answerd all 20 questions correctly\n")
				conn.send("Flag: %s\n------------------------------------------------------\n" %flag)
				conn.close()
		                sys.stdout.flush()
				break
	
			count+=1
	except socket.timeout:
		conn.send("\n\nIdle Time Expired\n\n")
		print "Connection Expired"
                sys.stdout.flush()
		conn.close()
	except Exception, e:
		print e
                sys.stdout.flush()
                conn.close()

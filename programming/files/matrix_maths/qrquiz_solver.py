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
HOST = '127.0.0.1'                 # Symbolic name meaning all available interfaces
PORT = 50007                   # Arbitrary non-privileged port
imgpath = "./images/"

def readqr(data):
        filename = "%s%s.bmp" %(imgpath,str(uuid.uuid4()))
        ##qr mappings
        cmap = {'0': (255,255,255),
                '1': (0,0,0)}

        ## clean up the data
        data = data.strip()
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


sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

print sock.recv(8192)
qcount = 1
while qcount <= 20:
	qcount+=1
	qnumber=sock.recv(8192)
	print qnumber
	question=sock.recv(8192)
#	print question
	qrtxt = readqr(question)
	print(qrtxt)	
	answer = word2num(qrtxt)
	answerwords = num2words(answer)
	print answerwords
        answerqr = pyqrcode.create(answerwords)
 	answertext = answerqr.text(quiet_zone=1)
#	print answertext
	sock.send(answertext)
	reply = sock.recv(1024).strip()
	if reply == "Correct":
		continue
	else:
		print reply
		

print sock.recv(8192)
sock.close()

#!/usr/bin/python

import socket
import sys
import time
import pyqrcode
import random
import uuid
import Image
from qrtools import QR

HOST = '127.0.0.1'                 # Symbolic name meaning all available interfaces
PORT = 22524	                   # Arbitrary non-privileged port
imgpath = "./images/"

def readqr(data):
        filename = "%s%s.bmp" %(imgpath,str(uuid.uuid4()))
        ##qr mappings
        cmap = {'0': (255,255,255),
                '1': (0,0,0)}

        ## clean up the data
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
	qrcode=sock.recv(8192)
	#print qrcode
	qrcode = qrcode.strip("\n")
	
	##get the text from the qrcode
	qrtxt = readqr(qrcode)
	#print qrtxt

	##get the length data
	length = len(qrcode.split("\n"))

	##initalise rows/cols to 0
	x = 0
	y = 0
	#create matrix
	matrix = [[0 for a in xrange(length)] for a in xrange(length)]
	###put received qr into matrix
	for rowdata in qrcode.split("\n"): #loop though y
        	for char in rowdata: #loop though x in each y
                	matrix[y][x]=int(char)
	                x+=1
        	y+=1
		x=0

	##work out error correction
	if matrix[length-3][9] == 1 and matrix[length-2][9] == 1:
	        error="L"
	if matrix[length-3][9] == 0 and matrix[length-2][9] == 1:
        	error="M"
	if matrix[length-3][9] == 1 and matrix[length-2][9] == 0:
        	error="Q"
	if matrix[length-3][9] == 0 and matrix[length-2][9] == 0:
        	error="H"


	##generate qr code using text from the origional
	data = pyqrcode.create(qrtxt,error=error)
	fixedqrcode = data.text(quiet_zone=1)

	##clean extra new line off
	fixedqrcode = fixedqrcode.strip("\n")

	##reinitalise row/cols to 0
	x=0
	y=0
	for rowdata in fixedqrcode.split("\n"):
        	for char in rowdata:
	                if int(char) != matrix[y][x]:
        	                print "X: %s Y: %s"%(x,y)
				answer="%s,%s"%(x,y)	
                	x+=1
	        y+=1
        	x=0

	##fill the answer in

	##send asnwer
	sock.send(answer)
	reply = sock.recv(1024).strip()
	if reply == "Correct":
		continue
	else:
		print reply
		sys.exit()
		

print sock.recv(8192)
sock.close()

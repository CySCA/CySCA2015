#!/usr/bin/python

word_array={"zero":0,"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9,"ten":10,"eleven":11,"twelve":12,"thirteen":13,"fourteen":14,"fifteen":15,"sixteen":16,"seventeen":17,"eighteen":18,"nineteen":19,"twenty":20,"thirty":30,"forty":40,"fifty":50,"sixty":60,"seventy":70,"eighty":80,"ninety":90,"hundred":100,"thousand,":1000,"thousand":1000}

signs_list=("plus","minus","times")

def word2num(text):
	outnums={}
	outnums[0]=0
	outnums[1]=0
	outpos=0
	prevnum = 0
	sign = None
	txtarray = text.split(" ")
	for txt in txtarray:
		#print txt
		if txt == "and":
			continue
		if txt in signs_list:
			sign = txt
			outpos=1
			continue
		if "-" in txt:
			txt = txt.split("-")
			for value in txt:
				num = word_array[value]
				outnums[outpos] = outnums[outpos] + num
		else:
			num = word_array[txt]
			if num == 100 or num == 1000:
				outnums[outpos] = outnums[outpos]-prevnum
				outnums[outpos] = outnums[outpos]+(prevnum*num)
			else:
				prevnum = num
				outnums[outpos] = outnums[outpos]+num
	if sign == "plus":
		return outnums[0]+outnums[1]
	if sign == "minus":
		return outnums[0]-outnums[1]
	if sign == "times":
		return outnums[0]*outnums[1]
	if sign == None:
		return outnums[0]

#print word2num("sixty Minus one")
#print word2num("four thousand one hundred and sixty Minus one")
#print word2num("four thousand one hundred and sixty")

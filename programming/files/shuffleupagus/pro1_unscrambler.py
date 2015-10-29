lines = open("chal_file.txt")

linedict = dict()
for line in lines:
    line = line [:-1]
    i1 = line.find(":")
    i2 = line.find(":",i1+1)
    index = line[i1:i2+1]
    i = int(index[1:4])
    outline =  line[:i1] + line[i2+1:]
    linedict[i] = outline


for x in range(0,len(linedict)):
    print linedict[x]

import random

lines = open("ascii_art_flag.txt","r").readlines()

sortlines = list()


i=0
for line in lines:
    if len(line.strip()) == 0:
        continue
    outline = line[:-1]
    index = i
    insert_ind = ":"+("%d" % i).zfill(3)+":"

    insert_pos = random.randint(0,len(line))

    finalline = outline[:insert_pos] + insert_ind + outline[insert_pos:]
    sortlines.append([index,finalline])
    i += 1

while len(sortlines) > 0:
    (index,outline) = random.choice(sortlines)
    #(index,outline) = sortlines[0]
    sortlines.remove([index,outline])
    print outline



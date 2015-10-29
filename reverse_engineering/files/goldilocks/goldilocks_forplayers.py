######################### SNIP #############################
def parseresponse(data):
    UNPACK_STR = "!BBB"
    with open('goldilocks.txt', 'r') as f:
        i = 0
        while i <= len(data) - 3:
            tlv = data[i:i+3]
            i += 3

            (b1, b2, b3) = struct.unpack('BBB', tlv)

            if b1 >= len(ENCODERS):
                reply = S1
                encoding = None
                break

            try:
                f.seek(b3, 1)
                reply += f.read(b2)
            except:
                reply = S2

    return (reply, encoding)

def checkresponse(data):
    encoding = random.randint(0, len(ENCODERS)-1)
    req_encoding = None

    if len(data) % 3 == 1:
        reply = S8
    elif len(data) % 3 == 2:
        reply = S5
    else:
        reply, req_encoding = parseresponse(data)

    if req_encoding:
        encoding = req_encoding

    return (reply, encoding)
######################### SNIP #############################
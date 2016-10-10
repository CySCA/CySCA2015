Daves Amazing Hash TM Writeup
===================
## Category
Hash Cracking and Crypto

## Question
Daves Amazing Hash TM - An ex-employee, Dave, wrote a secure hashing algorithm. Is it amazing as it appears? Go to http://10.13.37.10/daves/daves.php to get started.

## Designed Solution
Create a hash generator; that can collide hash’s.

## Hints Given
None

## Player Solution Comments
Players used a variety of programming languages to implement the solution described below.

## Writeup
This is all about hash collisions, because only a small section of the hash’s is used, there is a far greater chance that a collision will occur.

Using the hint we can see that a user enters a 36 character string and a 36 character hash is returned.
Using the mid-section of the hint we get the hash’s used in generating Daves hash and some other information.
You could generate a hash for each of the algorithms and then compare that outcome to the check your hash functions output to understand what the numbers mean in the brackets.
But essentially its:
The MD2 function takes the first 6 chars of the string and generates a hash
from the output of the hash a couple of the chars are selected (0,6,12,18,24,30)
These are then placed in the positions (0,6,12,18,24,30) of the final hash
This is repeated for each of the hash algorithms.

```python
import hashlib
import itertools
import string
import sys
from timeit import default_timer as timer

#Global Variables
start = timer()
md_array = ["", "", "", "", "", ""]
hash_array = ["MD2", "MD5", "SHA1", "SHA256", "SHA384", "SHA512"]

#Daves Hash
def daves(passwd,hashs):
    hashed=""
    h = hashlib.new(hashs)
    h.update(passwd)
    temp = h.hexdigest()
    i=0 if hashs == 'MD2' else 1 if hashs == 'MD5' else 2 if hashs == 'SHA1' else 3 if hashs == 'SHA256' else 4 if hashs == 'SHA384' else 5 if hashs == 'SHA512' else 6
    hashed = temp[i] + temp[i+6] + temp[i+12] + temp[i+18] + temp[i+24] + temp[i+30]
    return hashed;

#Split up the hash to solve
def hash_split(r):
    for i in range(0,6):
        md_array[i] = r[i] + r[i+6] + r[i+12] + r[i+18] + r[i+24] +  r[i+30]      

#Main
hash_to_solve = hash_split("2e8033d70365728c5e945537673b06a948d4")
for chars in itertools.product(string.ascii_letters+string.digits,repeat=6):
    passwd = ''.join(chars)
    z=0
    for hashs in hash_array:
        hashout = daves(passwd,hashs)
        if hashout == md_array[z]:
            print "found " + hashs + " - " + passwd
            hash_array.remove(hashs)
            md_array.remove(md_array[z])
        z+=1
        if len(hash_array) == 0:
            elapsed_time = timer() - start
            print str(int(elapsed_time)) + " Seconds Done\n"
            sys.exit()
```

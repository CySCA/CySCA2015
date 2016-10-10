2-Factor Writeup
===================
## Category
Hash Cracking and Crypto

## Question
2-factor is a great way to add security, if it's secure to begin with. Can you log in with administrative access? Read-only access is available with: Username: davedavington@ecwi.cysca, Password: asfjbv459dQA, Pin: 000000. Go to http://10.13.37.10/2fact/2fact.php to get started.

## Designed Solution
Create a LCG seed brute force based on the multiplier, increment, modulus and output history (previous pins).

## Hints Given
* "Determine the seed, see where it leads." - PRNG

## Player Solution Comments
Players used a variety of programming languages to recover the seed for the LCG. Most used Python, however a number used C.

## Writeup
Initially it might not be obvious that you need to generate based on LCG so you might try to brute force the login page. This should produce a lock out which would take a user a long time to break.

So the next option would be to look up “seed multiplier modulus increment”
Which might lead to Random Numbers or Pseudo number generators.
Which in turn leads to LCG (Linear Congruential Generator)
from here it’s just a matter of implementing a solution that tries all seeds from 0 to modulus.

```python
import time
start = time.time()

a = 1435602927      #Multiplier
c = 2045458325      #Increment
m = 2147483648      #Modulus

#seed store
pins_known=[
    '911061',
    '075376',
    '475237',
    '749408',
    '249589',
    '553936',
    '297157',
    '577792',
    '336277']

def xlongrange(start, limit, step):
    n = start
    while n < limit:
        yield n
        n += step

def seed(x):
    global xi
    xi = x

#LCG
def rng():
    global xi
    xi = (a*xi + c)%m
    return xi

#Bruteforce
for z in xlongrange(0,2147483648,1):
    xi = z
    seed2 = str(rng())
    if str(seed2[-6:]) == pins_known[0]:
        seed2 = str(rng())
        if str(seed2[-6:]) == pins_known[1]:
            seed2 = str(rng())
            if str(seed2[-6:]) == pins_known[2]:
                seed2 = str(rng())
                if str(seed2[-6:]) == pins_known[3]:
                    seed2 = str(rng())
                    if str(seed2[-6:]) == pins_known[4]:
                        seed2 = str(rng())
                        if str(seed2[-6:]) == pins_known[5]:
                            seed2 = str(rng())
                            if str(seed2[-6:]) == pins_known[6]:
                                seed2 = str(rng())
                                if str(seed2[-6:]) == pins_known[7]:
                                    seed2 = str(rng())
                                    if str(seed2[-6:]) == pins_known[8]:
                                        print "found seed : " + str(z)
                                        seed2 = str(rng())
                                        print "Next pin is: " + seed2[-6:]
                                        break;
print "done!"
end = time.time()
elapsed = end-start
print "Time taken: ", elapsed, "seconds."
```

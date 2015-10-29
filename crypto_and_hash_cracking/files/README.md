# Extra Challenges


## challenge 1 - Daves Secret Hashing Algorithm

http://10.0.0.116/daves/daves.php

### Task

Players are given a site were one of the employees has created their own Hashing algorithm.
however this hash algorithm is vulnerable to hash clashing.

players are required to create a script that can solve the problem.

### Requirements

some programming skills

### Hint

hash clashing is easier if the hash you are clashing isnt the full length of the hash

### Flag

The flag is printed on the top of the webpage once the user clashes with the hash

## Challenge 2 - Password Hash Cracking Challenges

http://10.0.0.116/hash/hash-cracking.php

### Task

players are given 4 different hash cracking challenges.
	1. Numeric PIN (16 digits) or fixed length custom char set challenge 
	2. Single word (lowercase only) - custom dictionary building
	3. Complex word (1 upper, 1 substitution, ending with punctuation + digit) -custom substitution and custom char ruleset
	4. Multi-Word (lowercase only) - combination dictionary attack
	
### Requirements

hashcat or any other hash cracking program.
possibly programming skills 

### Flag

The flag is printed on the top of the webpage once the user clashes with the hash

### Solution
chal 1:
	-1 1379 ?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1
chal 2:
	create a dictionary based off the hackers movie script
chal 3:	
	build a 1337 substitution ruleset for hashcat
chal 4:	
	Build a script That uses the dictionary 4 times and concats.


## Challenge 3 - Linear Congruential Generator

http://10.0.0.116/linear/linear.php

### Task

log in with the default pin to find that you can log in as the admin if you know the pin.


### Requirements

using the Multipler,Increment,Modulus and the previous pins you can bruteforce the seed value

### Flag

The flag is printed on the top of the webpage once the user logs in with todays pin.


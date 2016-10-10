Hash 1 Writeup
===================
## Category
Hash Cracking and Crypto

## Question
None

## Designed Solution
Run hashcat with a custom charset, hash is SHA-1 `-1 2490 ?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1`

## Hints Given
None

## Player Solution Comments
Most teams used `hashcat` or `John the Ripper` with the custom charset of 2,4,9,0 as described below. Some teams used either `crunch` or `python` to generate a wordlist with every possible permutation of 2,4,9,0 and then used that as a dictionary for `hashcat` or `John the Ripper`. Some teams wrote custom SHA1 password crackers; this was mostly done in Python, but one was in Java and one was in C.

## Writeup
This challenge involves cracking a Hash that is 16 digits long.
An effective way to do this would be to shrink the time needed to brute force the hash by limiting the key space.
Using the Hint (heat map) you can see that the person has only used a combination of 4 different digits.
1. Identify the hash.
    There are plenty of online hash identifiers or you can use hashID.
    hashID returns a couple possibilities which are ranked by likelihood
    given SHA-1 is at the top we will attempt it first.
2. Create the custom charset
    hashcat is quite hand as you can set a custom charset, so by set the char set to only 2490 you limit the iterations needed to bruteforce the hash.
    the syntax is  -1 2490 ?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1
    -1 means custom followed by charset then where you want to place the custom charset ?1

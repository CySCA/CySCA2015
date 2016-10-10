Hash 4 Writeup
===================
## Category
Hash Cracking and Crypto

## Question
None

## Designed Solution
Create a custom dictionary based on the dictionary supplied and use hashcat combination attack
Hash: SHA1
Combination of 4 words

## Hints Given
None

## Player Solution Comments
Most players either used hashcat to combine the supplied dictionary to itself, then used that dictionary again in a combination attack. Many used custom python to SHA1 hash all combinations of words in the supplied wordlist. Others used python to generate a wordlist containing all combinations of words in the supplied wordlist and then passed that into hashcat or John the ripper.

## Writeup
This challenge cracking a hash using a custom dictionary.
There is a way you can do this with hashcat which is to create a dictionary of each combination of 2 words then duplicate the dictionary and do a combination attack. You could do something similar to Hash 2 for the generation of the word list. Or just iterate over the dictionary and generate hashes in python and do a comparison to the hash you need to crack.

1. Identify the hash.
  `sha-1`
2. Use python to generate a hash file with all 2 word combinations **See below for code**
3. Use hashcat combination attack with the combineddict.txt

```python
provideddict = open("dictionary.txt","r")
combineddict = open("combineddict.txt","w")
lines = provideddict.readlines()
for word1 in lines:
    for word2 in lines:
        combineddict.write(word1.strip()+word2.strip()+"\n")

provideddict.close()
combineddict.close()
```

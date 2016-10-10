Hash 3 Writeup
===================
## Category
Hash Cracking and Crypto

## Question
None

## Designed Solution
Create a custom rule for hashcat and use the supplied dictionary.
Hash: md5
Keyword: A version of l3x1c0n?? where ?? is ether a digit or special char and the first char is ether upper or lower

## Hints Given
* Hashcat likes rules CSSS$$

## Player Solution Comments
Most players used `hashcat` or `John the Ripper` with a custom ruleset. Some wrote custom password crackers in Python.

## Writeup
This challenge cracking a hash using a custom dictionary.
the hint is great at informing us what rules we have to generate,  hashcat has a great feature where if a dictionary is supplied you can manipulate the entries based on rules.
A rule looks something like this
cse3$!$0
the “c” uppercase  on the first char of the word
the “s” means Replace all instances of X with Y so sa@ replace all a’s with @’s
the “$!” means  Append character X to end.

This means this rule would convert lexicon to L3xicon!0

1. Identify the hash.
    [+] MD2
    [+] MD5
    [+] MD4
    These are all probable, however it is MD5.
2. Create the custom ruleset.
    Using python you can generate a file to import to hashcat

```python
spec = "!@#$%^&*()_+|<>?:\"[];'./{}=-"
l33t =  "abeghilostz"
l33t2 = "@836#110$72"

f = open('leet_rule','w')

for s in spec:
    for c in range(11):
        for n in range(10):
            f.write("cs"+str(l33t[c])+str(l33t2[c])+"$"+str(s)+"$"+str(n)+"\n")
			f.write("s"+str(l33t[c])+str(l33t2[c])+"$"+str(s)+"$"+str(n)+"\n")
for s in spec:
    for a in range(11):
        for c in range(11):
            for n in range(10):
                f.write("cs"+str(l33t[a])+str(l33t2[a])+"s"+str(l33t[c])+str(l33t2[c])+"$"+str(s)+"$"+str(n)+"\n")
				f.write("s"+str(l33t[a])+str(l33t2[a])+"s"+str(l33t[c])+str(l33t2[c])+"$"+str(s)+"$"+str(n)+"\n")
for s in spec:
    for a in range(11):
        for b in range(11):
            for c in range(11):
                for n in range(10):
                    f.write("cs"+str(l33t[a])+str(l33t2[a])+"s"+str(l33t[b])+str(l33t2[b])+"s"+str(l33t[c])+str(l33t2[c])+"$"+str(s)+"$"+str(n)+"\n")
					f.write("s"+str(l33t[a])+str(l33t2[a])+"s"+str(l33t[b])+str(l33t2[b])+"s"+str(l33t[c])+str(l33t2[c])+"$"+str(s)+"$"+str(n)+"\n")
f.close()
```

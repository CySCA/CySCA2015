Hash 2 Writeup
===================
## Category
Hash Cracking and Crypto

## Question
None

## Designed Solution
Create a dictionary based on the hackers movie script.
Hash: sha-256
Keyword: ellingson

## Hints Given
None

## Player Solution Comments
One team created a wordlist from the Hacker's movie subtitles as listed below. Most teams used the `rockyou.txt` or `openwall all.lst` dictionary with either `John the Ripper` or `hashcat`. A couple of teams wrote their own dictionary based password crackers in Python.

## Writeup
This challenge is about cracking a hash using a custom dictionary.
Custom dictionaries make life so much easier than a 10gb+ dictionary.
The more you know about a target the more you can shrink the dictionary.
Using the hint we know it’s relating to the hacker’s movie, a good idea would be to get every word spoken in the movie and create a dictionary from that.

1. Identify the hash.
    Snefru-256 is at the top this time and sha-256 is next.
    it’s probably sha-256
2. Create the custom dictionary
    scripts can be found on the internet or watch the movie and write down all non-standard words.
    i.e ellingson

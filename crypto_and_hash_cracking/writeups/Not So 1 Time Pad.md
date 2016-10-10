Not So 1 Time Pad Writeup
===================
## Category
Hash Cracking and Crypto

## Question
Some strange traffic was detected on the network, the initiative staff believe it to be covert communication. Try and decode the messages in covertcoms.pcap. Submit the keys XORed together as your answer.

## Designed Solution
Extract the communications in the supplied pcap file. XOR messages together, then use crib dragging to to determine the plaintext messages. Do this for both sides of the communication to recover the each key.

## Hints Given
None

## Player Solution Comments
All teams solved this challenge as designed. One team used the `cribtastic.py` tool. Other players completed it with help from Python. Some successful teams lost a couple of points as they had one bit errors in their answers due to not checking capitalisation in the communications.

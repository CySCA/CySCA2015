Poppin' Writeup
===================
## Category
Forensics

## Question
Identify the process spawned by the attacker in the network pcap. Submit the just the executable file name as your answer.

## Designed Solution
Players use either static analysis or dynamic analysis to determine that the payload eventually spawns the process calc.exe.

## Hints Given
None

## Player Solution Comments
Only two teams got this one correct. There seemed to be confusion of the actual process spawned and the other elements of the payload. Some submitted `Sayonara` or `msvcr71.dll` or other responses.

## Writeup
For this challenge you’ll have to decode the payload. You can do that in multiple ways, for example run it through a debugged on an XP machine, or you can also just decode it and symbolically execute. When you do that, you’ll see calc.exe being called, which is the answer.

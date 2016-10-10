Violation! Writeup
===================
## Category
Detect and Defend

## Question
There has been a report of suspicious activity by a user in head office. [Netflow telemetry](../files/netflow.zip) has been provided for some network segments. Refer to ECWI's [Acceptable Use Policy](../files/aup_ecwi.pdf) and determine any IP host addresses that should be investigated further. Submit the IP of the machine that violated the AUP as your answer.

## Designed Solution
There is suspicion of behaviour that violates the Acceptable Use Policy. Netflow data has been provided from a corporate router which connects both the client and server networks. The netflow data will reveal unacceptable behaviour.

## Hints Given
None

## Player Solution Comments
Players generally identified the correct IP. Some identified the server that was scanned as the AUP violator. Teams used some form of spreadsheet software to analyse the supplied csv data.

## Writeup
Using some data analysis tool identify outliers of behaviour. I used both the free version of Splunk and also Microsoft Excel. Any netflow aware analysis tool or that can produce scatter graphs etc of CSV data should work. The misbehaving client should be evident either by scanning an entire subnet of addresses and / or scanning ports of one of the servers.

Scanning is specifically prohibited by section 3.4.8 of the ECWI AUP policy.

Note on excel.
Excel scatter graph of SA/DA or SA/DP will reveal obvious behaviours but formatting is untidy and the x / y axis confusing due to treatment of IP addresses as text fields. You could look for a function / formula to convert IP to numeric but it is also simple to select the dataset and insert a pivot table and pivot graph. By simply playing around with selection of fields it is very evident which client IP is different to the others. A netflow aware tool such as Splunk or other should not have to IP as text problem.

Answer : 172.16.202.102

*For reference the commands executed from this client were*
```
# scan the server subnet. The rate limit is to try and better hide in the background traffic otherwise there are too many sequential netflow records which are simple to spot.
nmap --max-rate 10 -v -sn 172.16.203.0/24
# scan a specific server
nmap -O -v 172.16.203.200
```

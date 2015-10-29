CySCA2015 - Detect and Defend
=============================

Category Description
--------------------
After being notifed by the ECWI network administrator, the initiative took some network traffic dumps and recovered a malware sample. However, they don't know how to discover if there is any maliciousness within.Once you have located the malicious data, the initiative would like you to create STIX reports so they can share information with enterprises to improve their cloud wellness.

Questions
---------
* Pick Up STIX - During a change window late on the 2nd August 2015, Enterprise Cloud Wellness Initiative server administrator Jeremy Amadio discovered malware on the DHCP server that was making suspicious network connections. It eventuated this was part of the recent theft of ECWI corporate secrets. ECWI would like to share information of this compromise to improve the cloud wellness of enterprises. Create a STIX http://stixproject.github.io/ formatted file capturing the Who, What and when details of the incident. See https://stixproject.github.io/documentation/idioms/simple-incident/
* See What STIX - As part of your further investigation, you have been provided with a copy of the malware that was recovered by Jeremy Amadio on the DHCP server. ECWI would like to share information relating to this malware to improve the cloud wellness of enterprises. [foundmalware.exe](files/foundmalware.exe.extension). Create a STIX (http://stixproject.github.io/) formatted file capturing malicious urls and the hash details of the malware recovered from the DHCP server. We suggest dynamic analysis to recover urls. See https://stixproject.github.io/documentation/idioms/malware-hash/ and https://stixproject.github.io/documentation/idioms/malicious-url/
* Sniff, Sniff, Snort - SNORT is not alerting on all outbound SSH sessions from the server network. Tune the rule using the test pcap so all outbound SSH is alerted on. [snort.zip](files/snort.zip). Submit your tuned local.rules as the answer. 
* Violation! - There has been a report of suspicious activity by a user in head office. [Netflow telemetry](files/netflow.zip) has been provided for some network segments. Refer to ECWI's [Acceptable Use Policy](files/aup_ecwi.pdf) and determine any IP host addresses that should be investigated further. Submit the IP of the machine that violated the AUP as your answer.
* Escapee - Corporate secrets have been exfiltrated. Analyse the pcap, locate the victim and find the exploit. [exfil.zip (~241MB)](https://drive.google.com/file/d/0BwXhXHcd49sSNWhyLWs4bHAwcFU) **Password: Yei7igohjoteixoxe2qu**. Submit the VICTIM IP and full exploit payload in quotes as your answer. I.e XX.XX.XX.XX "{exploit payload}"

Folders
-------
* files/ - Category files
* writeups/ - Category writeups

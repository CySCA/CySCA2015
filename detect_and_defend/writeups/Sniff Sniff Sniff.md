Sniff, Sniff, Snort Writeup
===================
## Category
Detect and Defend

## Question
SNORT is not alerting on all outbound SSH sessions from the server network. Tune the rule using the test pcap so all outbound SSH is alerted on. [snort.zip](../files/snort.zip). Submit your tuned local.rules as the answer.

## Designed Solution
In the exfil challenge the final exfil was SCP on port 80. ECWI have a Snort IPS that has a rule to detect SSH / SCP on port 22. A new rule needs to be added to also alert for SSH on non standard ports. A test pcap is provided with traffic on both port 22 and non-standard (80) ports that can be used to playback into a test Snort box.

## Hints Given
None

## Player Solution Comments
Four teams submitted updated rules files that would have detected the malicious traffic. A number of submissions did not account for ssh on non-standard ports or removed the original detection rule.

## Writeup
Deploy Snort (eg security onion) and use the supplied local.rules file to verify that snort is working and detecting SSH/22 traffic. Define a second rule to detect additional SSH traffic.

**Completed Snort Rule**
```
Provided rule is
#-------------
# LOCAL RULES
#-------------
#
# testing - Rule to detect outbound SSH from server net
alert tcp $HOME_NET any -> any $SSH_PORTS (msg: "Detected Outbound SSH"; sid:10000001;)

Additional rule 1 using OpenAppID
alert tcp $HOME_NET any -> any any (msg:"Detected Outbound SSH with OpenAppID"; appid: ssh; sid: 10000002; rev:4; )
Additional rule 2 using Payload detection
alert tcp $HOME_NET any -> any !$SSH_PORTS (content: "SSH-"; depth: 4; msg: "Detected Outbound SSH on non-standard port"; sid; 10000003;)
```

Note : if the team includes Talos or Community rule sets then they may see alerts for malformed HTTP traffic on port 80. This is not a solution as it doesn’t work if some other port is used.

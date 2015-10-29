# Business Excellence file server

## Details

This challenge involves 3 layers, Heartbleed, Weak Debian SSH keys, and a NFS mount point that allows a setuid binary to be pushed to the system.

The vulnerable system will be discovered by scanning the Misc challenge network.

This challenge will have unique flag files.

## Layer 1 - HeartBleed

### Task

Player needs to get the username/password to get the flag from the page

### Requirements

A webserver vulnerable to heartbleed.with a php page/form on it that allows a user to login

A script constantly logging in with username/password.

### Hint

Current apache and SSL version can be queried from the webserver

### Hint for next layer

Page displays text that the users account has already been added to the fileserver. The page displays their userid, Their SSH public key and the Date the key was generated

### Flag

The flag is printed on the top of the webpage once the user logs in.

### Solution

Use any of the many heartbleed scripts to find the username/password in the post.

Base64 decode the password.

Login to page

## Layer 2 - Debian Weak SSH key

[http://arstechnica.com/security/2015/06/assume-your-github-account-is-hacked-users-with-weak-crypto-keys-told](http://arstechnica.com/security/2015/06/assume-your-github-account-is-hacked-users-with-weak-crypto-keys-told/)

### Task

Player needs to get the flag by logging in as the user via SSH.

The website provides the key randomart and they need to find which private key that matches.

### Requirements

User account with a weak ssh public key in its authorized_keys file

### Flag

Flag will be in the user's home directory and echoed when they connect with SSH.

### Solution
Download all the ssh keys for 2048bit RSA

generate the randomart for all the keys and compare to the key on the webpage

Login to server

## Layer 3 - NFS share with no root-squash

### Task

Player needs to put a SETUID binary on the NFS share that they then run to get a root shell. Players can mount the NFS share as root and then setuid the binary.

### Requirements
NFS server with the nosetuid,noexecute flags turned off.

### Flag
Flag file will be located in /root/flag.txt 

### Solution

Mount the nfs share as root from another machine

Create a setuid binary

```
<setuid.c>

#include <stdio.h>
#include <stdlib.h>
int main(void){
  setuid( 0 );   // you can set it at run time also
  system("bash");
}


>gcc -o setuid setuid.c

>cp setuid binary to NFS share

>chmod a+s setuid

log in via SSH as the user

run setuid
```

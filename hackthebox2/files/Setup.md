Setting up the Hack the Box 2 server
------------------------------------
1. Install Ubuntu Server 14.04.2 LTS x86_64
2. Check kernel version is 3.16.0. 
3. Hold the following packages to restrict kernel updates (So the FUSE vulnerabilities are still present)
    * linux-firmware                    
    * linux-headers-3.16.0-30             
    * linux-headers-3.16.0-30-generic         
    * linux-headers-generic-lts-utopic        
    * linux-image-3.16.0-30-generic           
    * linux-image-extra-3.16.0-30-generic     
    * linux-image-generic-lts-utopic          
4. Install the following packages to install tomcat 6.0.39
    * tomcat6
    * tomcat6-admin
    * tomcat6-common
    * libtomcat6-java
5. Add a password to the tomcat6 user and set its login shell to /bin/bash. 
6. Create a file named sshpasswd and add the password into the tomcat application root directory.
7. Enable the admin console accounts and enable the default account. Copy/Paste from documentation in %TOMCAT_FOLDER%/conf/tomcat-users.xml
6. Install iptables rules.

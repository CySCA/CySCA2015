a = 1357172052#Multiplier
c = 1304548919 	#Increment
m = 2147483648#Modulus
xi = 1240717431 #Seed

xi = (a*xi + c)%m

for i in range(10):
print str(xi)[-6:]
xi = (a*xi + c)%m

print "done!"

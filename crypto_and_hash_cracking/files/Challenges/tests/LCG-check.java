
package lastegg;

import java.math.BigInteger;

public class LCG {

public static void main(String args[]) {
BigInteger n = new BigInteger("2073867623");//seed
BigInteger m = new BigInteger("2147483648");//modulus
BigInteger a = new BigInteger("13371337");//multipler
BigInteger c = new BigInteger("1015244223");//increment

n = (a.multiply(n).add(c)).mod(m);

for (int i = 0; i < 10; i++) {
System.out.println(n.toString().substring(n.toString().length()-6));
n = (a.multiply(n).add(c)).mod(m);

}
System.out.println("... ");
}
}

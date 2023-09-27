let decryptExp;

function gcd(a, h) {

  let temp;

  while (true) {
    temp = a % h;
    if (temp == 0) return h;
    a = h;
    h = temp;

  }
}



function generateEncryptionExponent(phi) {
    let exp = 47n;
  
    while (gcd(exp, phi) !== 1n) {
      exp += 2n;
    }
  
    return exp;
  }


function computeDecryptionExponent(exp, phi) {
  const k = 2n; // A constant value
  let decryptExp = BigInt((1n + (k * phi)) / exp);
  
  while (decryptExp < 1n) {
      decryptExp += phi;
    }
  
    return decryptExp;
  }  




function encrypt(message, publicKey) {
    const { exp, n } = publicKey;
  
    if (message < 0n || message >= n) {
      throw new Error(`Condition 0 <= message < n not met. message = ${message}`);
    }
  
    if (gcd(message, n) !== 1n) {
      throw new Error("Condition gcd(message, n) = 1 not met.");
    }
  
    const crypted = message ** exp % n;
  
    return crypted;
  }


  function decrypt(crypted, secretKey) {
    const { d, n } = secretKey;
  
    const message = crypted ** decryptExp % n;
  
    return message;
  }

  function rsaExample() {
    const firstPrime = 191n;
    const secondPrime = 223n;
  
    const n = firstPrime * secondPrime;
    const phi = (firstPrime - 1n) * (secondPrime - 1n);
  
    const exp = generateEncryptionExponent(phi);
    const decryptExp = computeDecryptionExponent(exp, phi);
  
    const publicKey = { exp, n };
    const secretKey = { decryptExp, n };
  
    const message = textToNumber("Hi");
    const crypted = encrypt(message, publicKey);
    const m2 = decrypt(crypted, secretKey);
  
    console.log(numberToText(m2));
    // Hi
  }

  console.log(rsaExample());


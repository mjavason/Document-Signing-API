Yes, that's correct. If you want to use a separate public key file in your code, you can generate a public key file from your private key as you've described using OpenSSL. Here are the steps again:

1. Generate a public key file from your private key:
   
   ```bash
   $ openssl rsa -in private_key.pem -pubout -out public_key.pem
   ```

   This command generates a `public_key.pem` file containing the public key corresponding to your private key.

2. Use this generated `public_key.pem` file in your code:

   ```typescript
   const publicKeyPem = fs.readFileSync('public_key.pem', 'utf8');
   this.publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
   ```

   This will load the public key from the `public_key.pem` file, and you can use it for signature verification.

By following these steps, you'll ensure that the public key used for verification is distinct from your private key, as it should be in secure cryptographic systems.
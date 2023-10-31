Yes, that's correct. If you want to use a separate public key file in your code, you can generate a public key file from your private key as you've described using OpenSSL. Here are the steps again:

1. Generate a public key file from your private key:
   
   ```bash
   $ openssl rsa -in private_key.pem -pubout -out public_key.pem
   ```

   This command generates a `public_key.pem` file containing the public key corresponding to your private key.


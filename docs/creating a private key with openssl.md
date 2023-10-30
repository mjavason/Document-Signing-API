To create a PEM-encoded RSA private key file step by step, you can use OpenSSL, a widely used open-source tool for working with SSL and cryptographic operations. Here's a step-by-step guide to generating an RSA private key and saving it to a `private_key.pem` file:

1. **Install OpenSSL**:

   If you don't have OpenSSL installed on your system, you can download it from the official website (https://www.openssl.org/) or install it using a package manager appropriate for your operating system.

2. **Generate an RSA Private Key**:

   Open a terminal or command prompt and run the following command to generate a new RSA private key:

   ```bash
   openssl genpkey -algorithm RSA -out private_key.pem
   ```

   This command generates a new RSA private key and saves it to a file named `private_key.pem`.

3. **Protect the Private Key with a Passphrase (Optional)**:

   If you want to add an extra layer of security to your private key by protecting it with a passphrase, you can generate an encrypted private key with the following command:

   ```bash
   openssl genpkey -algorithm RSA -aes256 -out private_key_encrypted.pem
   ```

   You'll be prompted to set a passphrase for the key.

4. **Verify the Private Key (Optional)**:

   To verify that the private key was successfully generated and is in the correct format, you can view the contents of the key using the following command:

   ```bash
   openssl rsa -in private_key.pem -check
   ```

   This command will display the details of the RSA private key.

5. **Use Your Private Key**:

   You can now use the generated `private_key.pem` or `private_key_encrypted.pem` file in your applications for cryptographic operations, such as signing documents, as demonstrated in the previous code examples.

Remember to keep your private key secure and confidential. If you have an encrypted private key (protected with a passphrase), you'll need to provide the passphrase whenever you use the key in your applications.

Please be cautious with private keys and ensure they are stored in a secure location, as they are critical for securing your data and should not be shared or exposed to unauthorized users.
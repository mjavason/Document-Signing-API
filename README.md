# Document Signer API

## Description

The Document Signer API is a TypeScript and NestJS-based web service that securely signs digital documents with digital signatures. It ensures document integrity and authenticity with ease. Users can sign legal documents, contracts, certificates, and more electronically while also verifying the authenticity of signed documents.

The live version of the API is hosted at [Document Signer Live Version](https://document-signer.onrender.com).

## Installation

To get started, install the project dependencies using npm:

```bash
$ npm install
```

## Running the App

You can run the application in different modes:

- Development Mode:

```bash
$ npm run start:dev
```

- Production Mode:

```bash
$ npm run start:prod
```

## Documentation

For detailed documentation on how to use the Document Signer API and its endpoints, you can access the Swagger documentation at:

[Swagger Documentation](https://document-signer.onrender.com/docs)

The Swagger documentation provides information on available endpoints, request parameters, and response structures, making it easier to interact with the API.

## Generating RSA Keys with OpenSSL on Windows

If you need to generate RSA keys for signing and verifying documents, you can use OpenSSL. Here are the steps for installing and using OpenSSL on Windows:

### Installing OpenSSL on Windows

1. **Download OpenSSL Binary**:

   Visit the OpenSSL official website's "Win32/Win64 OpenSSL Installer" page to download the OpenSSL binaries for Windows. You can find it here: [OpenSSL Downloads](https://slproweb.com/products/Win32OpenSSL.html)

   Choose the appropriate version (32-bit or 64-bit) and download the "Light" version, which includes essential components.

2. **Run the Installer**:

   Double-click the downloaded installer and follow the installation instructions. You can accept the default settings.

3. **Add OpenSSL to System Path (Optional)**:

   To use OpenSSL from the command prompt or PowerShell, add OpenSSL to your system's PATH environment variable. Here's how:

   - Right-click on "This PC" or "My Computer" and select "Properties."
   - Click on "Advanced system settings" on the left side.
   - Click the "Environment Variables" button.
   - In the "System Variables" section, find and select "Path," then click the "Edit" button.
   - Add the path to the OpenSSL bin directory (usually `C:\Program Files\OpenSSL-Win64\bin` or `C:\Program Files\OpenSSL-Win32\bin`) to the list of paths.
   - Click "OK" to save the changes.

4. **Verify Installation**:

   Open a command prompt or PowerShell and run the following command:

   ```bash
   openssl version
   ```

   If OpenSSL is correctly installed and added to your system's PATH, this command should display the OpenSSL version information.

### Generating an RSA Private Key

To generate an RSA private key with OpenSSL:

1. **Generate an RSA Private Key**:

   Open a terminal or command prompt and run this command to generate a new RSA private key and save it to a `private_key.pem` file:

   ```bash
   openssl genpkey -algorithm RSA -out private_key.pem
   ```


2. **Verify the Private Key (Optional)**:

   To verify the private key:

   ```bash
   openssl rsa -in private_key.pem -check
   ```

   This command will display the details of the RSA private key.

3. **Create a Public Key from the Private Key**:

   To create a public key from the private key:

   ```bash
   openssl rsa -in private_key.pem -pubout -out public_key.pem
   ```

   This command generates a `public_key.pem` file containing the public key corresponding to your private key.

Now you have both private (`private_key.pem`) and public (`public_key.pem`) keys for use with your Document Signer API.

## Usage

### Signing a Document

To sign a document, make a POST request to the `/sign` endpoint with the document content in the request body. This will return the digital signature in base64 format.

```
POST http://localhost:3000/sign
Request Body: {
  "document": "This is the document content"
}
Response: {
  "digitalSignature": "base64_encoded_signature"
}
```

### Verifying a Document

To verify a document, make a POST request to the `/verify` endpoint with the document content and the digital signature in the request body. The API will return whether the document has been tampered with or not.

```
POST http://localhost:3000/verify
Request Body: {
  "document": "This is the document content",
  "digitalSignature": "base64_encoded_signature"
}
Response: {
  "isSignatureValid": true
}
```

## Contributing

Contributions to the Document Signer API are welcome! If you'd like to contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Make your improvements or additions.

4. Thoroughly test your changes.

5. Create a pull request with a clear description of your changes.

Remember to keep your private key secure and confidential. If you have an encrypted private key (protected with a passphrase), you'll need to provide the passphrase whenever you use the key in your applications.

Please be cautious with private keys and ensure they are stored in a secure location, as they are critical for securing your data and should not be shared or exposed to unauthorized users.
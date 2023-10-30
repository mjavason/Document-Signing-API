# Document Signer API

## Description

The Document Signer API is a TypeScript and NestJS-based web service that securely signs digital documents with digital signatures. It ensures document integrity and authenticity with ease. Users can sign legal documents, contracts, certificates, and more electronically while also verifying the authenticity of signed documents.

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
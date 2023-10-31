import { Injectable } from '@nestjs/common';
import * as forge from 'node-forge';
import * as fs from 'fs';

@Injectable()
export class SignerService {
  private privateKey: forge.pki.PrivateKey;
  private publicKey: forge.pki.PublicKey;

  constructor() {
    // Initialize and load the keys during service instantiation
    this.loadKeys();
  }

  private loadKeys() {
    try {
      // Load the private key from a file (replace with your private key file path)
      const privateKeyPem = fs.readFileSync('private_key.pem', 'utf8');

      // Initialize and load the private key
      this.privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

      // Load the public key from a file (replace with your public key file path)
      const publicKeyPem = fs.readFileSync('public_key.pem', 'utf8');

      // Initialize and load the public key
      this.publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

      // Initialize and load the public key
      this.publicKey = forge.pki.privateKeyFromPem(publicKeyPem);
    } catch (error) {
      console.log('Failed to load keys:', error.message);
      // throw error;
      return false;
    }
  }

  async signDocument(documentToSign: any) {
    try {
      // Create a SHA-256 hash of the document
      const sha256 = forge.md.sha256.create();
      sha256.update(documentToSign, 'utf8');

      // Sign the hash with the private key
      const digitalSignature = this.privateKey.sign(sha256);

      console.log('Digital Signature:', forge.util.encode64(digitalSignature));
      return forge.util.encode64(digitalSignature);
    } catch (error) {
      console.log('Failed to sign document', error.message);
      // throw new Error('Failed to sign document: ' + error.message);
    }
  }

  async verifyDocument(documentToVerify: any, signature: string) {
    try {
      // Verify the signature
      const sha256 = forge.md.sha256.create();
      sha256.update(documentToVerify, 'utf8');

      const signatureBytes = forge.util.decode64(signature);
      const isSignatureValid = this.publicKey.verify(
        sha256.digest().getBytes(),
        signatureBytes,
      );

      if (isSignatureValid) {
        console.log(
          'Signature Verified: The document has not been tampered with.',
        );
        return true;
      } else {
        console.log(
          'Signature Verification Failed: The document may have been tampered with.',
        );
        return false;
      }
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
}

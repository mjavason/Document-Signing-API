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
      // Read the private key from a file (replace with your private key)
      const privateKeyPem = fs.readFileSync('private_key.pem', 'utf8');

      // Load the private key
      this.privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

      // Load the public key from the private key (for demonstration purposes)
      const publicKeyPem = forge.pki.publicKeyToPem(this.privateKey.publicKey);

      // Load the public key
      this.publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    } catch (error) {
      // throw new Error('Failed to load keys: ' + error.message);
      console.log('Failed to load keys:', error.message);
    }
  }

  async signDocument(documentToSign: any) {
    try {
      // Compute the SHA-256 hash of the document
      const md = forge.md.sha256.create();
      md.update(documentToSign, 'utf8');

      // Sign the hash
      const signature = this.privateKey.sign(md);

      console.log('Digital Signature:', forge.util.encode64(signature));
      return forge.util.encode64(signature);
    } catch (error) {
      console.log('Failed to sign document', error.message);
      // throw new Error('Failed to sign document: ' + error.message);
    }
  }

  async verifyDocument(documentToVerify: any, signature: string) {
    // Verify the signature
    const md = forge.md.sha256.create();
    md.update(documentToVerify, 'utf8');

    const signatureBytes = forge.util.decode64(signature);
    const verified = this.publicKey.verify(
      md.digest().getBytes(),
      signatureBytes,
    );

    if (verified) {
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
  }
}

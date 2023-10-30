// async demonstrateSignature() {
//     try {
//       // replace with your actual String
//       let exampleString =
//         'Text that should be signed to prevent unknown tampering with its content.';

//       // generate a keypair, in asynchronous encryption both keys need to be related
//       // and cannot be independently generated keys
//       // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
//       // not needed if you already posses public and private key
//       let keypair = forge.pki.rsa.generateKeyPair({ bits: 3072, e: 0x10001 });

//       // SIGN the string
//       let pss = forge.pss.create({
//         md: forge.md.sha512.create(),
//         mgf: forge.mgf.mgf1.create(forge.md.sha512.create()),
//         saltLength: 20,
//       });

//       let md = forge.md.sha512.create();
//       md.update(exampleString, 'utf8');
//       let signature = forge.util.encode64(keypair['privateKey'].sign(md, pss));

//       // VERIFY the String
//       pss = forge.pss.create({
//         md: forge.md.sha512.create(),
//         mgf: forge.mgf.mgf1.create(forge.md.sha512.create()),
//         saltLength: 20,
//       });
//       md = forge.md.sha512.create();
//       md.update(exampleString, 'utf8');
//       let verified = keypair['publicKey'].verify(
//         md.digest().getBytes(),
//         forge.util.decode64(signature),
//         pss,
//       );

//       console.log('is signature ok?: %s', verified);
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// Proje: Anoma NFT Mint DApp (Tam Entegre)
// Frontend: React + Tailwind
// IPFS: Web3.Storage
// Mint: REST API üzerinden Anoma (CLI opsiyonel)

import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';

export default function App() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ name: '', description: '' });
  const [status, setStatus] = useState('');
  const [txHash, setTxHash] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_TOKEN });

  const connectWallet = async () => {
    // Kullanıcı Anoma cüzdan bağlama (örnek, REST API auth ile)
    const address = await getWalletAddress(); // kendi auth/connector fonksiyonunu ekleyin
    setWalletAddress(address);
  };

  const handleUpload = async () => {
    if (!file || !metadata.name || !walletAddress) return;
    setStatus('IPFS\'e yükleniyor...');

    // Dosya yükleme
    const cidFile = await client.put([file]);

    // Metadata oluşturma
    const metadataBlob = new Blob([
      JSON.stringify({
        name: metadata.name,
        description: metadata.description,
        image: `ipfs://${cidFile}/${file.name}`
      })
    ], { type: 'application/json' });

    const cidMetadata = await client.put([new File([metadataBlob], 'metadata.json')]);

    setStatus('Mint intent oluşturuluyor...');

    try {
      // REST API üzerinden Anoma mint çağrısı
      const response = await axios.post(`${process.env.REACT_APP_ANOMA_API_ENDPOINT}/mint`, {
        to: walletAddress,
        uri: `ipfs://${cidMetadata}/metadata.json`
      }, {
        headers: { 'Authorization': `Bearer ${process.env.REACT_APP_ANOMA_API_KEY}` }
      });

      setTxHash(response.data.txHash);
      setStatus('✅ NFT başarıyla mint edildi!');
    } catch (error) {
      console.error(error);
      setStatus('❌ Mint işlemi başarısız oldu.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Anoma NFT Mint DApp</h1>
      {!walletAddress && <button onClick={connectWallet} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Cüzdan Bağla</button>}
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-2" />
      <input type="text" placeholder="Name" onChange={e => setMetadata({ ...metadata, name: e.target.value })} className="mb-2 p-1 border" />
      <textarea placeholder="Description" onChange={e => setMetadata({ ...metadata, description: e.target.value })} className="mb-2 p-1 border"></textarea>
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Mint NFT</button>
      <p className="mt-2">{status}</p>
      {txHash && <p className="mt-2">Transaction Hash: {txHash}</p>}
    </div>
  );
}

async function getWalletAddress() {
  // Bu fonksiyonu kendi Anoma auth/connector ile değiştirin
  return 'anoma_wallet_address_örnek';
}

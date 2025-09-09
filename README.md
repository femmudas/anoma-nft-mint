# Anoma NFT Mint DApp User Guide

This project is a React-based DApp that allows users to mint NFTs directly on the Anoma blockchain. Users can create NFTs through a simple web interface, with data securely stored on IPFS.

---

## Features

* User-friendly interface for minting NFTs.
* Create NFTs using text or file input.
* IPFS (Web3.Storage) integration for data storage.
* NFT minting via Anoma blockchain API.

---

## Setup

1. Clone the repository or download the ZIP:

```bash
git clone https://github.com/YOUR_USERNAME/anoma-nft-dapp.git
cd anoma-nft-dapp
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your API keys:

```env
REACT_APP_WEB3STORAGE_TOKEN=YOUR_WEB3_STORAGE_API_KEY
REACT_APP_ANOMA_API_ENDPOINT=https://api.anoma.net
REACT_APP_ANOMA_API_KEY=YOUR_ANOMA_API_KEY
```

---

## Usage

1. Start the application:

```bash
npm start
```

2. Open your browser and go to `http://localhost:3000`.
3. Enter text or upload a file to create your NFT.
4. Click the "Mint NFT" button.
5. After the minting process is complete, the transaction hash (Tx Hash) will be displayed on the screen.

---

## File Structure

```
anoma-nft-dapp/
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ .env
├─ .gitignore
├─ public/
│  └─ index.html
└─ src/
   ├─ index.js
   ├─ index.css
   ├─ App.js
   └─ getWalletAddress.js
```

---

## Important Notes

* Keep your `.env` file and API keys secure; do not upload them to GitHub.
* Text-based NFTs should have a reasonable content size to ensure smooth IPFS uploads.
* Keep your Anoma API key private and secure.

---

## Development

* To add advanced NFT minting features, integrate rich text editors like `react-quill` or `draft-js`.
* UI improvements can be easily done using TailwindCSS components.

---

## License

MIT License

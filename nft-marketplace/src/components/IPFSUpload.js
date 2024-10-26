import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// Initialize the IPFS client (using Infura)
const client = create('https://ipfs.infura.io:5001/api/v0');

export default function IPFSUpload() {
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState('');
  const [cid, setCid] = useState('');
  const [retrievedFile, setRetrievedFile] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  // Upload file to IPFS
  const handleFileUpload = async () => {
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileHash(url);
      console.log('File uploaded to IPFS:', url);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  // Retrieve file from IPFS
  const handleRetrieveFile = async () => {
    try {
      const url = `https://ipfs.infura.io/ipfs/${cid}`;
      setRetrievedFile(url);
    } catch (error) {
      console.error('Error retrieving file from IPFS:', error);
    }
  };

  return (
    <div className="ipfs-upload">
      <h2 className="text-2xl font-bold mb-4">Upload File to IPFS</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Upload to IPFS
      </button>

      {fileHash && (
        <div className="mt-4">
          <p><strong>Uploaded File:</strong></p>
          <a href={fileHash} target="_blank" rel="noopener noreferrer">
            {fileHash}
          </a>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-4">Retrieve File from IPFS</h2>
      <input
        type="text"
        placeholder="Enter CID"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={handleRetrieveFile} className="mt-2 p-2 bg-green-500 text-white rounded">
        Retrieve File
      </button>

      {retrievedFile && (
        <div className="mt-4">
          <p><strong>Retrieved File:</strong></p>
          <a href={retrievedFile} target="_blank" rel="noopener noreferrer">
            {retrievedFile}
          </a>
        </div>
      )}
    </div>
  );
}

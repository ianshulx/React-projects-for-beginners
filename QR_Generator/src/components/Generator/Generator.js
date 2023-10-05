import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import styles from "./Generator.module.css";

export default function Generator() {
  const [text, setText] = useState("");
  const [qrCodeData, setQRCodeData] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const dataURL = await QRCode.toDataURL(text);
        setQRCodeData(dataURL);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    text && generateQRCode();
  }, [text]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Enter your text here..."
        value={text}
        onChange={(event) => setText(event.target.value.trim())}
        autoFocus
      />
      {qrCodeData && text && <img src={qrCodeData} alt="qr-code" />}
    </div>
  );
}

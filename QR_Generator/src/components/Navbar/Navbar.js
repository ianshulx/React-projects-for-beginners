import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <p>
        <img alt="logo" src="/logo.png" />
        QR Generator
      </p>
    </div>
  );
}

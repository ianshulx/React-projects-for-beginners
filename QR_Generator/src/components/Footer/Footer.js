import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <p>
        Made with &#10084; by{" "}
        <a className={styles.anchor} href="https://github.com/sandeepkrsuman">
          SandeepKrSuman
        </a>
      </p>
    </footer>
  );
}

import React from "react";
import styles from "./index.module.css";

export default function Loading() {
  return (
    <div className={styles.bg}>
      <span className={styles.loader}></span>
    </div>
  );
}

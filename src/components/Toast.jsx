import React, { useEffect } from "react";
import styles from "../styles/Toast.module.css";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000); // Tự động đóng sau 3 giây
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.content}>
        {type === "success" && <span className={styles.icon}>✓</span>}
        {type === "error" && <span className={styles.icon}>✕</span>}
        <span className={styles.message}>{message}</span>
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

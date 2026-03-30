import React, { useState } from "react";
import styles from "../styles/getInformation.module.css";
import Toast from "./Toast";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzgYpSnaUB7vn7hmXMRuuEUF9J9bPu2UR5VxN2Rbi-AJTlRJAk5yW0aPNf-XDW-Rk95MA/exec";

export default function GetInformation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone.replace(/\s/g, ""));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Gửi request mà không cần đợi response (fire and forget)
      fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {
        // Bỏ qua lỗi vì mode no-cors không cho phép đọc response
      });

      // Hiện toast ngay lập tức
      setToast({
        message: "Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.",
        type: "success",
      });

      // Reset form ngay lập tức
      setFormData({
        name: "",
        phone: "",
        product: "",
      });

      setSubmitted(true);
      setLoading(false);

      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim() &&
    validatePhone(formData.phone);

  return (
    <div className={styles.wrapper}>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
      <div className={styles.container}>
        {/* TEXT */}
        <p className={styles.desc}>
          Quý Anh/Chị điền thông tin bên dưới để nhận tư vấn ngay về tiềm năng
          vị trí của Lusso Saigon.
        </p>

        {/* FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="name"
              placeholder="Họ tên (*)"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại (*)"
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="product"
              placeholder="Quan tâm sản phẩm"
              className={styles.input}
              value={formData.product}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className={`${styles.input} ${styles.button}`}
            disabled={loading}
          >
            {loading ? "ĐANG GỬI..." : "NHẬN THÔNG TIN"}
          </button>
        </form>

        {/* HOTLINE */}
        <div className={styles.hotline}>HOTLINE: 0906 757 276</div>
      </div>
    </div>
  );
}

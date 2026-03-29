import React, { useState } from "react";
import styles from "../styles/GetInformation2.module.css";
import logoLusso from "../assets/images/logo-lusso-saigon.png";

export default function GetInformation2() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Đăng ký thành công!");
  };

  return (
    <section className={styles.section} id="lien-he">
      <div className={styles.container}>
        {/* Logo */}
        <img src={logoLusso} alt="Lusso Saigon" className={styles.logo} />

        {/* Title */}
        <h2>NHẬN BẢNG GIÁ VÀ CHÍNH SÁCH MỚI NHẤT LUSSO SAIGON</h2>

        <p>
          Để tiết kiệm thời gian tìm hiểu dự án, vui lòng để lại thông tin.
          Chuyên viên sẽ liên hệ ngay cho bạn.
        </p>

        {/* FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên *"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại *"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Nội dung / Lời nhắn"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit">ĐĂNG KÝ</button>
        </form>
      </div>
    </section>
  );
}

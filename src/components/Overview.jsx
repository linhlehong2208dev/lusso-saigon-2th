import React from "react";
import styles from "../styles/overview.module.css";
import phatDatLogo from "../assets/images/phat-dat-corp.png";
import worldHotelsLogo from "../assets/images/worldhotels.png";
import waveBg from "../assets/images/wave.png";

export default function Overview() {
  return (
    <div className={styles.wrapper} id="tong-quan">
      <div className={styles.container}>
        {/* TITLE */}
        <div className={styles.title}>
          <h1 className={styles.title}>TỔNG QUAN DỰ ÁN</h1>
          <h1 className={styles.title}>LUSSO SAIGON</h1>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>ĐƠN VỊ PHÁT TRIỂN</div>
            <div
              className={styles.logo}
              style={{
                backgroundImage: `url(${phatDatLogo})`,
              }}
            />
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>QUẢN LÝ & VẬN HÀNH</div>
            <div
              className={styles.logo}
              style={{
                backgroundImage: `url(${worldHotelsLogo})`,
              }}
            />
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>VỊ TRÍ</div>
            <div className={styles.cardText}>
              Thuộc tổ hợp LA PURA, mặt tiền Quốc lộ 13, Phường Bình Hòa, TP.HCM
            </div>
          </div>

          {/* Card 4 */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>QUY MÔ</div>
            <div className={`${styles.cardText} ${styles.textBig}`}>
              02 Tháp căn hộ hàng hiệu
            </div>
          </div>

          {/* Card 5 */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>SỐ LƯỢNG</div>
            <div className={`${styles.cardText} ${styles.textHuge}`}>
              1.136 Căn
            </div>
          </div>
        </div>

        {/* BOX SECTION */}
        <div className={styles.boxRow}>
          {/* Box 1 */}
          <div className={styles.box}>
            <div
              className={styles.boxInner}
              style={{
                backgroundImage: `url(${waveBg})`,
              }}
            >
              <div className={styles.boxContent}>
                <div className={styles.boxTitle}>THANH TOÁN</div>
                <div className={styles.boxValue}>11%</div>
                <div className={styles.boxDesc}>ĐẾN KHI NHẬN NHÀ</div>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className={styles.box}>
            <div
              className={styles.boxInner}
              style={{
                backgroundImage: `url(${waveBg})`,
              }}
            >
              <div className={styles.boxContent}>
                <div className={styles.boxTitle}>GIÁ BÁN TỪ</div>
                <div className={styles.boxValue}>3TỶ</div>
                <div className={styles.boxDesc}>CĂN HỘ CAO CẤP</div>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className={styles.box}>
            <div
              className={styles.boxInner}
              style={{
                backgroundImage: `url(${waveBg})`,
              }}
            >
              <div className={styles.boxContent}>
                <div className={styles.boxTitle}>HỖ TRỢ VAY</div>
                <div className={styles.boxValue}>75%</div>
                <div className={styles.boxDesc}>GIÁ TRỊ CĂN HỘ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BACKGROUND */}
      <div className={styles.bgSection}>
        <div className={styles.bgImage}></div>
      </div>
    </div>
  );
}

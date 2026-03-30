import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/CanHo.module.css";
import arrowIcon from "../assets/images/arrow-icon.png";

// ── Import ảnh tĩnh → Vite hash + optimize lúc build, không bị 404 trên Vercel
import img1pn_1 from "../assets/images/canho/1PN/Prime_1PN.webp";
import img1pn_2 from "../assets/images/canho/1PN/Prime_Plus_1PN_plus-Layout_1.webp";
import img1pn_3 from "../assets/images/canho/1PN/Prime_Plus_1PN_plus-Layout_2.webp";

import img2pn_1 from "../assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_1.webp";
import img2pn_2 from "../assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_2.webp";
import img2pn_3 from "../assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_3.webp";
import img2pn_4 from "../assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_4.webp";
import img2pn_5 from "../assets/images/canho/2PN/Residences_2PN_1WC.webp";

import img3pn_1 from "../assets/images/canho/3PN/Signature_3PN-Layout_1.webp";
import img3pn_2 from "../assets/images/canho/3PN/Signature_3PN-Layout_2.webp";
import img3pn_3 from "../assets/images/canho/3PN/Signature_3PN-Layout_3.webp";
import img3pn_4 from "../assets/images/canho/3PN/Sky_Villa_3PN.webp";

import img4pn_1 from "../assets/images/canho/4PN/Sky_Signature_4PN.webp";
import img4pn_2 from "../assets/images/canho/4PN/Sky_Villa_4PN.webp";

// ── Data ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "1pn", label: "Căn hộ 1PN", images: [img1pn_1, img1pn_2, img1pn_3] },
  {
    id: "2pn",
    label: "Căn hộ 2PN",
    images: [img2pn_1, img2pn_2, img2pn_3, img2pn_4, img2pn_5],
  },
  {
    id: "3pn",
    label: "Căn hộ 3PN",
    images: [img3pn_1, img3pn_2, img3pn_3, img3pn_4],
  },
  { id: "4pn", label: "Căn hộ 4PN", images: [img4pn_1, img4pn_2] },
];

// Preload ảnh kế tiếp để chuyển slide không bị giật
function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

export default function CanHo({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState("1pn");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); // điều khiển CSS fade transition
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);

  const activeTabData = TABS.find((t) => t.id === activeTab);
  const currentImages = activeTabData.images;

  // Preload ảnh tab đang active (tất cả) và ảnh prev/next
  useEffect(() => {
    currentImages.forEach((src) => preloadImage(src));
  }, [activeTab]);

  useEffect(() => {
    const next = currentImages[(currentIndex + 1) % currentImages.length];
    const prev =
      currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ];
    preloadImage(next);
    preloadImage(prev);
  }, [currentIndex, currentImages]);

  // Wrapper để chạy fade out → đổi ảnh → fade in
  const changeSlide = (newIndex) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(true);
    }, 180); // khớp với transition-duration trong CSS
  };

  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return;
    setFade(false);
    setTimeout(() => {
      setActiveTab(tabId);
      setCurrentIndex(0);
      setFade(true);
    }, 180);
  };

  const handlePrev = () => {
    const newIndex =
      currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  };

  const openZoom = () => {
    setIsZoomOpen(true);
    setZoomImageIndex(currentIndex);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
  };

  const handleZoomPrev = () => {
    const newIndex =
      zoomImageIndex === 0 ? currentImages.length - 1 : zoomImageIndex - 1;
    setZoomImageIndex(newIndex);
  };

  const handleZoomNext = () => {
    const newIndex =
      zoomImageIndex === currentImages.length - 1 ? 0 : zoomImageIndex + 1;
    setZoomImageIndex(newIndex);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.header}>
          <h2>THIẾT KẾ CĂN HỘ</h2>
          <h2>LUSSO SAIGON</h2>
          <p>Đa dạng loại hình căn hộ · Tư vấn bởi chuyên viên Rever.vn</p>
        </div>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image — dùng <img> thay background-image để browser tự lazy load */}
          <div className={styles.imageWrapper}>
            <img
              key={`${activeTab}-${currentIndex}`} // key thay đổi → trigger fade
              src={currentImages[currentIndex]}
              alt={`${activeTabData.label} - ảnh ${currentIndex + 1}`}
              className={`${styles.slideImg} ${fade ? styles.fadeIn : styles.fadeOut}`}
              loading="lazy"
              decoding="async"
              onClick={openZoom}
            />

            {/* Prev arrow */}
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={handlePrev}
              aria-label="Ảnh trước"
            >
              <img src={arrowIcon} alt="" style={{ transform: "scaleX(1)" }} />
            </button>

            {/* Next arrow */}
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={handleNext}
              aria-label="Ảnh tiếp theo"
            >
              <img src={arrowIcon} alt="" style={{ transform: "scaleX(-1)" }} />
            </button>

            {/* Dots */}
            <div className={styles.dots}>
              {currentImages.map((_, index) => (
                <span
                  key={index}
                  className={index === currentIndex ? styles.activeDot : ""}
                  onClick={() => changeSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <button onClick={() => onOpenModal?.()}>NHẬN BÁO GIÁ CHI TIẾT</button>
        </div>

        {/* ZOOM MODAL */}
        {isZoomOpen && (
          <div className={styles.zoomOverlay} onClick={closeZoom}>
            <div
              className={styles.zoomModal}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.zoomCloseBtn} onClick={closeZoom}>
                ✕
              </button>

              <img
                src={currentImages[zoomImageIndex]}
                alt={`${activeTabData.label} - Chi tiết`}
                className={styles.zoomImage}
              />

              {currentImages.length > 1 && (
                <>
                  <button
                    className={`${styles.zoomArrow} ${styles.zoomArrowLeft}`}
                    onClick={handleZoomPrev}
                  >
                    <img
                      src={arrowIcon}
                      alt="prev"
                      style={{ transform: "scaleX(1)" }}
                    />
                  </button>

                  <button
                    className={`${styles.zoomArrow} ${styles.zoomArrowRight}`}
                    onClick={handleZoomNext}
                  >
                    <img
                      src={arrowIcon}
                      alt="next"
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </button>

                  <div className={styles.zoomDots}>
                    {currentImages.map((_, index) => (
                      <span
                        key={index}
                        className={
                          index === zoomImageIndex ? styles.zoomActiveDot : ""
                        }
                        onClick={() => setZoomImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

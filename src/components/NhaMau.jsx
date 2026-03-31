import { useState, useEffect, useRef } from "react";
import "../styles/NhaMau.css";

// ── Import 11 ảnh phối cảnh ───────────────────────────────────────────────────
import img1 from "/images/phoicanh/1.webp";
import img2 from "/images/phoicanh/2.webp";
import img3 from "/images/phoicanh/3.webp";
import img4 from "/images/phoicanh/4.webp";
import img5 from "/images/phoicanh/5.webp";
import img6 from "/images/phoicanh/6.webp";
import img7 from "/images/phoicanh/7.webp";
import img8 from "/images/phoicanh/8.webp";
import img9 from "/images/phoicanh/9.webp";
import img10 from "/images/phoicanh/10.webp";
import img11 from "/images/phoicanh/11.webp";

// ── Data: 11 ảnh phối cảnh ────────────────────────────────────────────────────
const IMAGES = [
  { id: 1, src: img1, alt: "Phối cảnh 1" },
  { id: 2, src: img2, alt: "Phối cảnh 2" },
  { id: 3, src: img3, alt: "Phối cảnh 3" },
  { id: 4, src: img4, alt: "Phối cảnh 4" },
  { id: 5, src: img5, alt: "Phối cảnh 5" },
  { id: 6, src: img6, alt: "Phối cảnh 6" },
  { id: 7, src: img7, alt: "Phối cảnh 7" },
  { id: 8, src: img8, alt: "Phối cảnh 8" },
  { id: 9, src: img9, alt: "Phối cảnh 9" },
  { id: 10, src: img10, alt: "Phối cảnh 10" },
  { id: 11, src: img11, alt: "Phối cảnh 11" },
];

const INTERVAL_MS = 5000;
const VISIBLE_THUMBS = 7; // Số thumbnail hiển thị trong 1 hàng (tăng từ 5 để match width ảnh lớn)

export default function NhaMau() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [fullscreenIdx, setFullscreenIdx] = useState(null);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // ── Tính toán thumbnails nào sẽ hiển thị ──────────────────────────────────
  const getVisibleThumbsRange = () => {
    const halfVisible = Math.floor(VISIBLE_THUMBS / 2);
    const start = (activeIdx - halfVisible + IMAGES.length) % IMAGES.length;
    return start;
  };

  const shouldShowThumb = (idx) => {
    const start = getVisibleThumbsRange();
    for (let i = 0; i < VISIBLE_THUMBS; i++) {
      if ((start + i) % IMAGES.length === idx) return true;
    }
    return false;
  };

  // ── IntersectionObserver: bắt đầu / dừng auto-slide theo visibility ────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }, // 40% section phải nằm trong viewport
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Auto-slide: chỉ chạy khi section đang visible ─────────────────────────
  useEffect(() => {
    if (!isVisible) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, [isVisible]);

  // ── Click thumbnail: chọn ảnh + reset timer ───────────────────────────────
  const handleThumbClick = (idx) => {
    setActiveIdx(idx);
    // Reset timer để tránh nhảy ngay sau khi click
    clearInterval(timerRef.current);
    if (isVisible) {
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % IMAGES.length);
      }, INTERVAL_MS);
    }
  };

  // ── Handle fullscreen image click ──────────────────────────────────────────
  const handleImageClick = () => {
    setFullscreenIdx(activeIdx);
  };

  const closeFullscreen = () => {
    setFullscreenIdx(null);
  };

  return (
    <section className="nm" id="nha-mau" ref={sectionRef}>
      <div className="nm__container">
        {/* Title */}
        <div className="nm__text">
          <h2 className="nm__title">Hình Ảnh Phối Cảnh</h2>
          <p className="nm__subtitle">
            Nội thất hoàn thiện cao cấp · Bàn giao theo tiêu chuẩn
          </p>
        </div>

        {/* Gallery */}
        <div className="nm__gallery">
          {/* Ảnh chính */}
          <div className="nm__main">
            {IMAGES.map((img, idx) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                className={`nm__main-img${activeIdx === idx ? " nm__main-img--active" : ""}`}
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          {/* Thumbnails - Hiển thị 1 hàng, chỉ thumbnail hiện tại và xung quanh */}
          <div className="nm__thumbs">
            {IMAGES.map(
              (img, idx) =>
                shouldShowThumb(idx) && (
                  <button
                    key={img.id}
                    className={`nm__thumb${activeIdx === idx ? " nm__thumb--active" : ""}`}
                    onClick={() => handleThumbClick(idx)}
                    aria-label={img.alt}
                  >
                    <img src={img.src} alt={img.alt} />
                    {/* Overlay khi active */}
                    <span className="nm__thumb-border" />
                  </button>
                ),
            )}
          </div>

          {/* Fullscreen Image Viewer */}
          {fullscreenIdx !== null && (
            <>
              {/* Overlay */}
              <div
                className="nm__fullscreen-overlay"
                onClick={closeFullscreen}
              ></div>

              {/* Fullscreen Container */}
              <div className="nm__fullscreen">
                <button
                  className="nm__fullscreen-close"
                  onClick={closeFullscreen}
                >
                  ✕
                </button>
                <img
                  src={IMAGES[fullscreenIdx].src}
                  alt={IMAGES[fullscreenIdx].alt}
                  className="nm__fullscreen-img"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

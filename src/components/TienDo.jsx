// TienDo.jsx
import { useState } from "react";
import "../styles/TienDo.css";

import tiendo1 from "../assets/images/tiendo/1.webp";
import tiendo2 from "../assets/images/tiendo/2.webp";
import tiendo3 from "../assets/images/tiendo/3.webp";
import tiendo4 from "../assets/images/tiendo/4.webp";
import tiendo5 from "../assets/images/tiendo/5.webp";
import tiendo6 from "../assets/images/tiendo/6.webp";
import tiendo7 from "../assets/images/tiendo/7.webp";
import tiendo8 from "../assets/images/tiendo/8.webp";
import tiendo9 from "../assets/images/tiendo/9.webp";

const IMAGES = [
  { id: 1, src: tiendo1, alt: "Tiến độ thi công 1" },
  { id: 2, src: tiendo2, alt: "Tiến độ thi công 2" },
  { id: 3, src: tiendo3, alt: "Tiến độ thi công 3" },
  { id: 4, src: tiendo4, alt: "Tiến độ thi công 4" },
  { id: 5, src: tiendo5, alt: "Tiến độ thi công 5" },
  { id: 6, src: tiendo6, alt: "Tiến độ thi công 6" },
  { id: 7, src: tiendo7, alt: "Tiến độ thi công 7" },
  { id: 8, src: tiendo8, alt: "Tiến độ thi công 8" },
  { id: 9, src: tiendo9, alt: "Tiến độ thi công 9" },
];

export default function TienDo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenIdx, setFullscreenIdx] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle fullscreen image click
  const handleImageClick = () => {
    setFullscreenIdx(currentIndex);
  };

  const closeFullscreen = () => {
    setFullscreenIdx(null);
  };

  return (
    <section className="td" id="tien-do">
      <div className="td__container">
        {/* Title */}
        <div className="td__text">
          <h2 className="td__title">Hình Ảnh Tiến Độ</h2>
          <div className="td__underline" />
        </div>

        {/* Carousel */}
        <div className="td__carousel">
          <div className="td__carousel-main">
            <img
              src={IMAGES[currentIndex].src}
              alt={IMAGES[currentIndex].alt}
              className="td__carousel-img"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Navigation Buttons */}
          <button className="td__btn td__btn--prev" onClick={handlePrev}>
            <span>❮</span>
          </button>
          <button className="td__btn td__btn--next" onClick={handleNext}>
            <span>❯</span>
          </button>

          {/* Dots Indicators */}
          <div className="td__dots">
            {IMAGES.map((_, index) => (
              <button
                key={index}
                className={`td__dot ${index === currentIndex ? "td__dot--active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="td__counter">
          {currentIndex + 1} / {IMAGES.length}
          {/* Fullscreen Image Viewer */}
          {fullscreenIdx !== null && (
            <>
              {/* Overlay */}
              <div
                className="td__fullscreen-overlay"
                onClick={closeFullscreen}
              ></div>

              {/* Fullscreen Container */}
              <div className="td__fullscreen">
                <button
                  className="td__fullscreen-close"
                  onClick={closeFullscreen}
                >
                  ✕
                </button>
                <img
                  src={IMAGES[fullscreenIdx].src}
                  alt={IMAGES[fullscreenIdx].alt}
                  className="td__fullscreen-img"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// Hero.jsx
import { useState, useEffect, useRef } from "react";
import heroBg from "/images/content-main.webp";
import "../styles/Hero.css";

const BANNER_VIDEO = "/videos/banner-lusso.mp4";

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Bước 1: Chỉ bắt đầu load video khi hero vào viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true); // trigger render <source>
        }

        // Play / pause theo visibility
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 },
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Bước 2: Khi source được thêm vào, gọi load() rồi play()
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <div className="hero" ref={heroRef}>
      {/* ✅ Poster = ảnh hiển thị ngay, không chờ video */}
      <video
        ref={videoRef}
        className={`hero__video ${videoLoaded ? "hero__video--loaded" : ""}`}
        muted
        loop
        playsInline
        preload="none" // ✅ Không load gì cho đến khi cần
        poster={heroBg} // ✅ Dùng luôn ảnh webp làm poster
        onCanPlay={() => setVideoLoaded(true)}
      >
        {shouldLoad && <source src={BANNER_VIDEO} type="video/mp4" />}
      </video>

      {!videoLoaded && (
        <img
          src={heroBg}
          alt="Lusso Saigon"
          className="hero__fallback"
          loading="eager"
        />
      )}
    </div>
  );
}

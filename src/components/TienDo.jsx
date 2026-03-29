// TienDo.jsx
import { useState, useEffect, useRef } from "react";
import "../styles/TienDo.css";

export default function TienDo() {
  const YOUTUBE_VIDEO_ID = "MPwBMfA68xQ";
  const [isInViewport, setIsInViewport] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="td" id="tien-do" ref={sectionRef}>
      <div className="td__container">
        {/* Title */}
        <div className="td__text">
          <h2 className="td__title">Hình Ảnh Tiến Độ</h2>
          <div className="td__underline" />
        </div>

        {/* YouTube Embed */}
        <div className="td__carousel">
          <div className="td__carousel-main">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}${
                isInViewport ? "?autoplay=1&mute=1" : ""
              }`}
              title="Tiến Độ Thi Công"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="td__youtube-iframe"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

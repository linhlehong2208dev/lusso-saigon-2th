import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/ImgWorldhotel.module.css";

export default function ImgWorldhotel() {
  const [isInViewport, setIsInViewport] = useState(false);
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);

  const YOUTUBE_VIDEO_ID = "Frtdo71dfAk";

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
    <section className={styles.wrapper} ref={sectionRef}>
      <div className={styles.container}>
        {/* TOP CONTENT */}
        <div className={styles.top}>
          <div className={styles.logo}></div>

          <p className={styles.description}>
            Lusso Saigon chính thức ghi danh vào mạng lưới toàn cầu của
            WorldHotels™ Residences – đơn vị đứng sau các khách sạn & khu nghỉ
            dưỡng cao cấp trên toàn thế giới.
          </p>

          {/* STATS */}
          <div className={styles.stats}>
            <div className={styles.card}>
              <div className={styles.numberUnit}>
                <div className={styles.number}>55</div>
                <div className={styles.unit}>năm</div>
              </div>
              <div className={styles.label}>kinh nghiệm</div>
              <div className={styles.sub}>(Thành lập 1971)</div>
            </div>

            <div className={styles.card}>
              <div className={styles.numberUnit}>
                <div className={styles.number}>200</div>
                <div className={styles.unit}>+</div>
              </div>

              <div className={styles.label}>khách sạn</div>
              <div className={styles.sub}>khắp toàn cầu</div>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>Top</div>
              <div className={styles.label}>thương hiệu</div>
              <div className={styles.sub}>khách sạn tại Mỹ</div>
            </div>

            <div className={styles.card}>
              <div className={styles.numberUnit}>
                <div className={styles.number}>02</div>
                <div className={styles.unit}>năm</div>
              </div>
              <div className={styles.label}>liên tiếp là</div>
              <div className={styles.sub}>thương hiệu tốt nhất</div>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>38</div>
              <div className={styles.unit}>quốc gia</div>
              <div className={styles.label}>hiện diện</div>
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div className={styles.videoContainer}>
          <iframe
            ref={iframeRef}
            className={styles.videoWrapper}
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}${
              isInViewport ? "?autoplay=1&mute=1" : ""
            }&fs=1&modestbranding=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

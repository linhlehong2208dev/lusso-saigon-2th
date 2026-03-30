import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/TienIch.module.css";
import arrowIcon from "../assets/images/arrow-icon.png";

// Import nội khu videos
import tienichVid1 from "../assets/images/video/tienich.webm";
import tienichVid2 from "../assets/images/video/tienich2.webm";
import tienichVid4 from "../assets/images/video/tienich4.webm";
import tienichVid5 from "../assets/images/video/tienich5.webm";
import tienichVid6 from "../assets/images/video/tienich6.webm";
import tienichVid7 from "../assets/images/video/tienich7.webm";

// Import ngoại khu images
import tienichImg1 from "../assets/images/tienich/tienich1.webp";
import tienichImg2 from "../assets/images/tienich/tienich2.webp";
import tienichImg3 from "../assets/images/tienich/tienich3.webp";
import tienichImg4 from "../assets/images/tienich/tienich4.webp";
import tienichImg5 from "../assets/images/tienich/tienich5.webp";
import tienichImg6 from "../assets/images/tienich/tienich6.webp";

export default function TienIch({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState("noi-khu");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [amenitySlide, setAmenitySlide] = useState(0);
  const [modalShown, setModalShown] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Danh sách tiện ích nội khu
  const noikhuAmenities = [
    "Vườn dã ngoại",
    "Sân thể thao đa năng",
    "Sân Pickleball",
    "Đại sảnh Lira",
    "Sân chơi nước trẻ em",
    "Vườn treo thác nước",
    "Cầu hoa nắng",
    "Khu vui chơi trẻ em Todder",
    "Vườn hoa sự sống",
    "Đại sảnh Zenia",
    "Khu vui chơi thám hiểm rừng xanh",
    "Đại sảnh Risa",
  ];

  // Danh sách tiện ích ngoài khu
  const ngoaikhuAmenities = [
    "Trường học quốc tế",
    "Trung tâm thương mại",
    "Bệnh viện quốc tế",
    "Nhà hàng ẩm thực",
    "Công viên công cộng",
    "Trạm giao thông",
  ];

  const amenityList =
    activeTab === "noi-khu" ? noikhuAmenities : ngoaikhuAmenities;

  // Amenities carousel - mỗi slide có 6 items (3 hàng × 2 cột)
  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(amenityList.length / itemsPerSlide);
  const currentAmenities = amenityList.slice(
    amenitySlide * itemsPerSlide,
    (amenitySlide + 1) * itemsPerSlide,
  );

  const handleAmenityPrev = () => {
    setAmenitySlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleAmenityNext = () => {
    setAmenitySlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Auto-advance amenities slide every 10 seconds
  useEffect(() => {
    if (totalSlides <= 1) return; // Don't auto-advance if only 1 slide

    const timer = setInterval(() => {
      setAmenitySlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [totalSlides]);
  const noikhuVideos = [
    { src: tienichVid1, alt: "Tiện ích nội khu 1" },
    { src: tienichVid2, alt: "Tiện ích nội khu 2" },
    { src: tienichVid4, alt: "Tiện ích nội khu 3" },
    { src: tienichVid5, alt: "Tiện ích nội khu 4" },
    { src: tienichVid6, alt: "Tiện ích nội khu 5" },
    { src: tienichVid7, alt: "Tiện ích nội khu 6" },
  ];

  // Ngoài khu - images carousel
  const ngoaikhuVideos = [
    { src: tienichImg1, alt: "Tiện ích ngoại khu 1" },
    { src: tienichImg2, alt: "Tiện ích ngoại khu 2" },
    { src: tienichImg3, alt: "Tiện ích ngoại khu 3" },
    { src: tienichImg4, alt: "Tiện ích ngoại khu 4" },
    { src: tienichImg5, alt: "Tiện ích ngoại khu 5" },
    { src: tienichImg6, alt: "Tiện ích ngoại khu 6" },
  ];

  const videos = activeTab === "noi-khu" ? noikhuVideos : ngoaikhuVideos;
  const currentVideo = videos.length > 0 ? videos[currentIndex] : null;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        // Trigger modal chỉ 1 lần khi scroll vào section
        if (entry.isIntersecting && !modalShown && onOpenModal) {
          setModalShown(true);
          onOpenModal();
        }
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
  }, [modalShown, onOpenModal]);

  // Autoplay video khi section vào viewport và auto-advance images cho ngoại khu
  useEffect(() => {
    if (activeTab === "noi-khu") {
      // For videos
      if (videoRef.current && isInViewport && !isManualPaused) {
        videoRef.current.play().catch(() => {
          // Autoplay có thể bị chặn bởi browser
        });
      } else if (videoRef.current && !isInViewport) {
        videoRef.current.pause();
      }
    } else {
      // For images - auto-advance every 5 seconds
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isInViewport, isManualPaused, currentIndex, activeTab, videos.length]);

  // Handle video ended - chuyển sang video tiếp theo
  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setIsManualPaused(false);
  };

  // Handle play/pause từ user
  const handlePlay = () => {
    setIsManualPaused(false);
  };

  const handlePause = () => {
    setIsManualPaused(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setIsManualPaused(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setIsManualPaused(false);
  };

  return (
    <section className={styles.tienich} id="tien-ich" ref={sectionRef}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.left}>
            <h2 className={styles.title}>
              LUSSO SAIGON <br /> TIỆN ÍCH 5 SAO
            </h2>

            <p className={styles.subtitle}>CHUẨN SỐNG XANH GIỮA LÒNG ĐÔ THỊ</p>

            <div className={styles.line}></div>
          </div>

          <div className={styles.amenitiesWrapper}>
            <div className={styles.amenitiesList}>
              {currentAmenities.map((amenity, index) => {
                const actualIndex = amenitySlide * itemsPerSlide + index + 1;
                return (
                  <div key={index} className={styles.amenityItem}>
                    <div className={styles.amenityNumber}>{actualIndex}</div>
                    <div className={styles.amenityText}>{amenity}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* VIDEO/IMAGE CAROUSEL */}
        <div className={styles.carouselWrapper}>
          <div className={styles.videoContainer}>
            {currentVideo ? (
              activeTab === "noi-khu" ? (
                <video
                  ref={videoRef}
                  src={currentVideo.src}
                  alt={currentVideo.alt}
                  className={styles.video}
                  controls
                  autoPlay
                  muted
                  playsInline
                  webkitPlaysInline
                  onEnded={handleVideoEnded}
                  onPlay={handlePlay}
                  onPause={handlePause}
                />
              ) : (
                <img
                  src={currentVideo.src}
                  alt={currentVideo.alt}
                  className={styles.video}
                />
              )
            ) : (
              <div className={styles.noContent}>Chưa có video ngoài khu</div>
            )}
          </div>

          {/* TABS ON VIDEO */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "noi-khu" ? styles.tabActive : styles.tabInactive
              }`}
              onClick={() => {
                setActiveTab("noi-khu");
                setCurrentIndex(0);
                setIsManualPaused(false);
                setAmenitySlide(0);
              }}
            >
              TIỆN ÍCH NỘI KHU
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "ngoai-khu"
                  ? styles.tabActive
                  : styles.tabInactive
              }`}
              onClick={() => {
                setActiveTab("ngoai-khu");
                setCurrentIndex(0);
                setIsManualPaused(false);
                setAmenitySlide(0);
              }}
            >
              TIỆN ÍCH NGOẠI KHU
            </button>
          </div>

          {/* LEFT ARROW */}
          {videos.length > 0 && (
            <button
              className={`${styles.arrowBtn} ${styles.arrowLeft}`}
              onClick={handlePrev}
            >
              <img
                src={arrowIcon}
                alt="prev"
                className={styles.arrowImg}
                style={{ transform: "scaleX(1)" }}
              />
            </button>
          )}

          {/* RIGHT ARROW */}
          {videos.length > 0 && (
            <button
              className={`${styles.arrowBtn} ${styles.arrowRight}`}
              onClick={handleNext}
              style={{ transform: "scaleX(-1)" }}
            >
              <img src={arrowIcon} alt="next" className={styles.arrowImg} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

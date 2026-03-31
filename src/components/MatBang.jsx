import "./MatBang.css";
import { useState } from "react";

import matBangImg from "/images/matbang.webp";
import matBangMobileImg from "/images/lusso-saigon-mobile.webp";
// ── 22 tiện ích chia sẵn 3 trang ─────────────────────────────────────────────
const PAGES = [
  [
    { n: 1, label: "Water Fountain" },
    { n: 2, label: "Forest Town" },
    { n: 3, label: "Vườn Topical" },
    { n: 4, label: "Vườn dã ngoại" },
    { n: 5, label: "Sân thể thao đa năng" },
    { n: 6, label: "Sân Pickle Ball" },
    { n: 7, label: "J-Town" },
    { n: 8, label: "Đại sảnh Lira" },
  ],
  [
    { n: 9, label: "Aqua Kids Area" },
    { n: 10, label: "Vườn treo Waterfall" },
    { n: 11, label: "Cầu hoa Sunny" },
    { n: 12, label: "Khu vui chơi trẻ em Todder" },
    { n: 13, label: "Khu vui chơi trẻ em Todder" },
    { n: 14, label: "Đại sảnh Zenia" },
    { n: 15, label: "Sảnh Grand lobby Lusso" },
    { n: 16, label: "Jungle Area" },
  ],
  [
    { n: 17, label: "Vườn gieo Hạt Lành" },
    { n: 18, label: "Đại sảnh Risa" },
    { n: 19, label: "K-Town" },
    { n: 20, label: "Zoo zoo" },
    { n: 21, label: "Trường học" },
    { n: 22, label: "Green Wall" },
  ],
];

// ── Sub-components ────────────────────────────────────────────────────────────
function NumberBadge({ n }) {
  return (
    <span className="mb__badge">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13.5" stroke="#D3A769" strokeWidth="1" />
      </svg>
      <span className="mb__badge-num">{n}</span>
    </span>
  );
}

function AmenityItem({ n, label }) {
  return (
    <div className="mb__item">
      <NumberBadge n={n} />
      <span className="mb__item-label">{label}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MatBang() {
  const [page, setPage] = useState(0);

  // Touch swipe
  let _touchX = 0;
  const onTouchStart = (e) => {
    _touchX = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const diff = _touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setPage((p) =>
        diff > 0 ? Math.min(p + 1, PAGES.length - 1) : Math.max(p - 1, 0),
      );
    }
  };

  return (
    <section className="mb" id="mat-bang">
      <div className="mb__container">
        {/* ── Header ── */}
        <div className="mb__header">
          <h2 className="mb__title">MẶT BẰNG TỔNG THỂ LUSSO SAIGON</h2>
          <div className="mb__line" />
        </div>

        {/* ── Ảnh mặt bằng ── */}
        {/* Dùng <img> thay vì background-image để tránh lỗi path */}
        <div className="mb__img-wrap">
          {/* <img
            src={matBangImg}
            alt="Mặt bằng tổng thể Lusso Saigon"
            className="mb__img"
          /> */}
          <picture>
            <source media="(max-width: 1199px)" srcSet={matBangMobileImg} />
            <img src={matBangImg} className="mb__img" />
          </picture>
        </div>

        {/* ── Slider tiện ích – CHỈ HIỆN TRÊN MOBILE ── */}
        <div className="mb__mobile-list">
          <div
            className="mb__slider"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="mb__track"
              style={{ transform: `translateX(${-page * 100}%)` }}
            >
              {PAGES.map((items, pi) => (
                <div key={pi} className="mb__page">
                  <div className="mb__cols">
                    <div className="mb__col">
                      {items.slice(0, Math.ceil(items.length / 2)).map((it) => (
                        <AmenityItem key={it.n} {...it} />
                      ))}
                    </div>
                    <div className="mb__col">
                      {items.slice(Math.ceil(items.length / 2)).map((it) => (
                        <AmenityItem key={it.n} {...it} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mb__dots" role="tablist">
            {PAGES.map((_, i) => (
              <button
                key={i}
                className={`mb__dot${page === i ? " mb__dot--active" : ""}`}
                onClick={() => setPage(i)}
                aria-selected={page === i}
                aria-label={`Trang ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

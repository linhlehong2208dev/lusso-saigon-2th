// Footer.jsx
import { useState } from "react";
import "../styles/Footer.css";
import reverLogo from "../assets/images/logo-rever.png";
import bctLogo from "../assets/images/logo-bct.png";

// ── Icon SVG nhỏ ─────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"
      fill="#D3A769"
    />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
      fill="rgba(255,255,255,0.6)"
    />
  </svg>
);

const MapIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill="rgba(255,255,255,0.6)"
    />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
// const HOTLINES = [
//   { label: "Hotline miễn phí 24/7", number: "1 800 234 546" },
//   { label: "Khiếu nại, phản hồi (miễn phí)", number: "1 800 234 546" },
//   { label: "Bộ phận kinh doanh", number: "1 800 234 546" },
//   { label: "Phòng Dự Án", number: "1 800 234 546" },
//   { label: "Chăm sóc khách hàng", number: "1 800 234 546" },
// ];

const COMPANY_INFO = [
  {
    icon: <HomeIcon />,
    text: "MST: 0313817128 - Sở KHĐT TP Hồ Chí Minh cấp ngày 20/05/2016",
  },
  {
    icon: <MapIcon />,
    text: "Số 5-7, Đường B4, Phường An Lợi Đông, TP. Thủ Đức, TP. Hồ Chí Minh",
  },
  {
    icon: <PhoneIcon />,
    text: "08 6970 2321 - 1800 234 546",
    isLink: "tel:+18002345462",
  },
  {
    icon: <HomeIcon />,
    text: "support@rever.vn",
    isLink: "mailto:support@rever.vn",
  },
];

const NAV_COLUMNS = [
  {
    heading: "CÔNG TY",
    links: [
      "Về Rever",
      "Tuyển dụng",
      "Đội ngũ",
      "Liên hệ",
      "Chính sách bảo mật",
      "Điều khoản sử dụng",
    ],
  },
  {
    heading: "DỊCH VỤ",
    links: [
      "Ký gửi nhà đất",
      "Mua với Rever",
      "Thuê với Rever",
      "Rever Academy",
      "Rever Agents",
      "Quy trình dịch vụ",
    ],
  },
  {
    heading: "THÔNG TIN",
    links: [
      "Tin tức thị trường",
      "Cập nhật sản phẩm",
      "Kiến thức cho môi giới",
    ],
  },
  {
    heading: "ỨNG DỤNG",
    links: ["Rever trên iOS", "Rever trên Android"],
  },
];

// ── Arrow Icon ───────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 10l5 5 5-5z" fill="currentColor" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function Footer() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (heading) => {
    setExpandedSections((prev) => ({
      ...prev,
      [heading]: !prev[heading],
    }));
  };

  return (
    <footer className="ft" id="lien-he">
      {/* ── Hotline bar ── */}
      {/* <div className="ft__hotline-bar">
        <div className="ft__inner">
          <div className="ft__hotlines">
            {HOTLINES.map((h, i) => (
              <div key={i} className="ft__hotline-item">
                <span className="ft__hotline-icon">
                  <PhoneIcon />
                </span>
                <div className="ft__hotline-text">
                  <span className="ft__hotline-label">{h.label}</span>
                  <span className="ft__hotline-number">{h.number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* ── Main info ── */}
      <div className="ft__main">
        <div className="ft__inner">
          <div className="ft__main-row">
            <div className="ft__brand">
              <div className="ft__logo">
                <img src={reverLogo} alt="Rever" />
              </div>

              <span className="ft__company-name">
                CÔNG TY CỔ PHẦN CÔNG NGHỆ REVER
              </span>

              <ul className="ft__info-list">
                {COMPANY_INFO.map((row, i) => (
                  <li key={i} className="ft__info-row">
                    <span className="ft__info-icon">{row.icon}</span>
                    {row.isLink ? (
                      <a
                        href={row.isLink}
                        className="ft__info-text ft__info-text--link"
                      >
                        {row.text}
                      </a>
                    ) : (
                      <span className="ft__info-text">{row.text}</span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Logo Bộ Công Thương – swap khi có asset */}
              <div className="ft__bct-logo">
                <img src={bctLogo} alt="Đã thông báo Bộ Công Thương" />
              </div>
            </div>

            {/* Nav columns wrapper */}
            <div className="ft__nav-cols-wrapper">
              {NAV_COLUMNS.map((col) => (
                <div key={col.heading} className="ft__nav-col">
                  {/* Desktop: Span heading */}
                  <span className="ft__nav-heading">{col.heading}</span>

                  {/* Mobile/Tablet: Button with arrow */}
                  <button
                    className={`ft__nav-heading--btn ${
                      expandedSections[col.heading]
                        ? "ft__nav-heading--expanded"
                        : ""
                    }`}
                    onClick={() => toggleSection(col.heading)}
                  >
                    <span>{col.heading}</span>
                    <ArrowIcon />
                  </button>

                  {/* Nav list */}
                  <ul
                    className={`ft__nav-list ${
                      expandedSections[col.heading]
                        ? "ft__nav-list--expanded"
                        : ""
                    }`}
                  >
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="ft__nav-link">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="ft__copyright">
        <div className="ft__inner">
          <p>Copyright © 2026 - Rever. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

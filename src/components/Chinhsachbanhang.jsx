// ChinhSachBanHang.jsx
import { useState } from "react";
import "../styles/ChinhSachBanHang.css";
import logo1 from "../assets/images/logo-rever.png";
import logo2 from "../assets/images/logo-lusso-saigon.png";
import logo3 from "../assets/images/logo-world-hotels.png";

// ── Dot SVG ──────────────────────────────────────────────────────────────────
const Dot = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z"
      fill="#F1E8CE"
    />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "vay-von", label: "Vay vốn ngân hàng" },
  { id: "chuan-18", label: "Chuẩn 18 tháng" },
  { id: "som-50", label: "Thanh toán sớm 50%" },
  { id: "som-70", label: "Thanh toán sớm 70%" },
];

/**
 * Mỗi milestone:
 *   label        – nhãn thời gian hiển thị TRÊN line
 *   topNote      – dòng nhỏ phía trên label (ví dụ: "Thông báo bàn giao nhà")
 *   between      – text hiển thị TRÊN line ở khoảng GIỮA milestone này và milestone tiếp theo
 *                  (dùng cho "Trong vòng 07 ngày")
 *   betweenBelow – text hiển thị DƯỚI line ở khoảng giữa (dùng cho PA2)
 *   amount       – số tiền / % lớn hiển thị DƯỚI line
 *   amountLine2  – dòng % phụ ngay dưới amount (PA1: "9%")
 *   note         – ghi chú nhỏ dưới amount
 *   bankNote     – ghi chú màu vàng (Ngân hàng giải ngân…)
 */
const SOLUTIONS = [
  // ── PA1: Vay vốn ngân hàng ────────────────────────────────────────────────
  {
    id: "vay-von",
    title: "PHƯƠNG ÁN 1 : VAY VỐN NGÂN HÀNG - LUSSO F1",
    subtitle: "CHỈ THANH TOÁN 11% CHO ĐẾN KHI NHẬN NHÀ",
    badge: "(*) Hỗ trợ lãi suất 0% trong 20 tháng",
    milestones: [
      {
        label: "TTĐC",
        // "Trong vòng 07 ngày" nằm TRÊN line, khoảng giữa node này và node T
        between: "Trong vòng 07 ngày",
        amount: "50 triệu",
        note: "(Ký TTĐC)",
      },
      {
        label: "T",
        amount: "11%",
        note: "Ký HĐMB",
      },
      {
        label: "T+15",
        amount: "44%",
        bankNote: "Ngân hàng giải ngân",
      },
      {
        topNote: "Thông báo bàn giao nhà\nT+540 ngày",
        label: "T+540",
        amount: "9%",
        amountLine2: "31%",
        bankNote: "Ngân hàng giải ngân",
      },
      {
        topNote: "Thông báo\ncấp sổ hồng",
        label: "",
        amount: "5%",
      },
    ],
  },

  // ── PA2: Chuẩn 18 tháng ───────────────────────────────────────────────────
  // Chỉ 4 node. Khoảng giữa T → T+540 không có node,
  // text "TB 3,5%/tháng" nằm TRÊN line, "Trong vòng 16 tháng" nằm DƯỚI line.
  {
    id: "chuan-18",
    title: "PHƯƠNG ÁN 2 - LUSSO C18",
    subtitle: "THANH TOÁN CHUẨN 18 THÁNG",
    badge: "(*) Chiết khấu 7%",
    milestones: [
      {
        label: "TTĐC",
        between: "Trong vòng 07 ngày",
        amount: "50 triệu",
        note: "(Ký TTĐC)",
      },
      {
        label: "T",
        // khoảng rộng sau node T → hiển thị text trên/dưới line
        between: "Trung bình: 3,5% mỗi tháng",
        betweenBelow: "Trong vòng 16 tháng",
        amount: "10%",
        note: "Ký HĐMB",
      },
      {
        topNote: "Thông báo bàn giao nhà\nT+540 ngày",
        label: "T+540",
        amount: "25%",
      },
      {
        topNote: "Thông báo\ncấp sổ hồng",
        label: "",
        amount: "5%",
      },
    ],
  },

  // ── PA3.1: Thanh toán sớm 50% ────────────────────────────────────────────
  {
    id: "som-50",
    title: "PHƯƠNG ÁN 3.1 - LUSSO S50",
    subtitle: "THANH TOÁN SỚM 50%",
    badge: "(*) Chiết khấu 8%",
    milestones: [
      {
        label: "TTĐC",
        between: "Trong vòng 07 ngày",
        amount: "50 triệu",
        note: "(Ký TTĐC)",
      },
      {
        label: "T",
        amount: "10%",
        note: "Ký HĐMB",
      },
      {
        label: "T+30",
        amount: "40%",
      },
      {
        label: "T+300",
        amount: "2%",
        bankNote: "Trung bình 3%/tháng",
      },
      {
        topNote: "Thông báo bàn giao nhà\nT+540 ngày",
        label: "T+540",
        amount: "25%",
      },
      {
        topNote: "Thông báo\ncấp sổ hồng",
        label: "",
        amount: "5%",
      },
    ],
  },

  // ── PA3.2: Thanh toán sớm 70% ────────────────────────────────────────────
  {
    id: "som-70",
    title: "PHƯƠNG ÁN 3.2 - LUSSO S70",
    subtitle: "THANH TOÁN SỚM 70%",
    badge: "(*) Chiết khấu 10%",
    milestones: [
      {
        label: "TTĐC",
        between: "Trong vòng 07 ngày",
        amount: "50 triệu",
        note: "(Ký TTĐC)",
      },
      {
        label: "T",
        amount: "10%",
        note: "Ký HĐMB",
      },
      {
        label: "T+30",
        amount: "60%",
      },
      {
        topNote: "Thông báo bàn giao nhà\nT+540 ngày",
        label: "T+540",
        amount: "25%",
      },
      {
        topNote: "Thông báo\ncấp sổ hồng",
        label: "",
        amount: "5%",
      },
    ],
  },
];

// ── RoadmapTimeline ───────────────────────────────────────────────────────────
//
// Layout 5 hàng × N cột (N = số milestone):
//
//   Row 1 [top-note]  :  topNote nhỏ phía trên label
//   Row 2 [label]     :  nhãn thời gian (TTĐC, T, T+15…)
//   Row 3 [track]     :  ●───between-text───●───●
//   Row 4 [amount]    :  50tr  11%  44%  9%+31%  5%
//   Row 5 [note]      :  ghi chú + bankNote
//
// "between" text nằm GIỮA 2 dot trên đường line (trên line).
// "betweenBelow" text nằm GIỮA 2 dot phía DƯỚI đường line.
// Cả hai đều render bên trong .rm__track, dùng flex để căn giữa khoảng.

function RoadmapTimeline({ milestones }) {
  const hasTopNotes = milestones.some((m) => m.topNote);

  return (
    <div className="rm">
      {/* ── Hàng 1: top-note ── */}
      {hasTopNotes && (
        <div className="rm__row rm__row--top">
          {milestones.map((m, i) => (
            <div key={i} className="rm__col">
              {m.topNote
                ? m.topNote.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      <br />
                    </span>
                  ))
                : null}
            </div>
          ))}
        </div>
      )}

      {/* ── Hàng 2: label ── */}
      <div className="rm__row rm__row--label">
        {milestones.map((m, i) => (
          <div key={i} className="rm__col">
            {m.label && <span className="rm__label">{m.label}</span>}
          </div>
        ))}
      </div>

      {/* ── Hàng 3: track (line + dots + between-text) ── */}
      <div className="rm__track">
        <div className="rm__line" />

        {milestones.map((m, i) => (
          <div key={i} className="rm__col rm__col--dot">
            {/* Dot */}
            <span className="rm__dot">
              <Dot />
            </span>

            {/* "between" text: nằm trên line, căn giữa khoảng trống SAU dot này */}
            {m.between && (
              <span className="rm__between rm__between--above">
                {m.between}
              </span>
            )}

            {/* "betweenBelow" text: nằm dưới line, căn giữa khoảng trống SAU dot này */}
            {m.betweenBelow && (
              <span className="rm__between rm__between--below">
                {m.betweenBelow}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Hàng 4: amount ── */}
      <div className="rm__row rm__row--amount">
        {milestones.map((m, i) => (
          <div key={i} className="rm__col">
            <span className="rm__amount">{m.amount}</span>
            {m.amountLine2 && (
              <span className="rm__amount rm__amount--extra">
                {m.amountLine2}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Hàng 5: note + bankNote ── */}
      <div className="rm__row rm__row--note">
        {milestones.map((m, i) => (
          <div key={i} className="rm__col">
            {m.note && (
              <span className="rm__note">
                {m.note.split("\n").map((line, j, arr) => (
                  <span key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                  </span>
                ))}
              </span>
            )}
            {m.bankNote && <span className="rm__bank">{m.bankNote}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SolutionSlide ─────────────────────────────────────────────────────────────
function SolutionSlide({ solution }) {
  return (
    <div className="csb__solution">
      <div className="csb__solution-header">
        <h3 className="csb__solution-title">{solution.title}</h3>
        <p className="csb__solution-subtitle">{solution.subtitle}</p>
      </div>

      <RoadmapTimeline milestones={solution.milestones} />

      <div className="csb__badge">
        <span>{solution.badge}</span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ChinhSachBanHang() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeSolution = SOLUTIONS.find((s) => s.id === activeTab);

  return (
    <section className="csb" id="chinh-sach">
      <div className="csb__inner">
        {/* Logo row */}
        <div className="csb__logos">
          <div className="csb__logo-item">
            <img src={logo1} alt="Rever" />
          </div>
          <div className="csb__logo-item">
            <img src={logo2} alt="Lusso Saigon" />
          </div>
          <div className="csb__logo-item">
            <img src={logo3} alt="World Hotels" />
          </div>
        </div>

        {/* Content */}
        <div className="csb__content">
          {/* Title + price */}
          <div className="csb__title-block">
            <h2 className="csb__title">CHÍNH SÁCH BÁN HÀNG</h2>
            <div className="csb__price-row">
              <span className="csb__price-label">GIÁ CHỈ TỪ</span>
              <span className="csb__price-number">48</span>
              <span className="csb__price-unit">TRIỆU/M²</span>
            </div>
          </div>

          {/* Tabs + solution */}
          <div className="csb__solutions">
            <div className="csb__tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`csb__tab${activeTab === tab.id ? " csb__tab--active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="csb__slide-window">
              <SolutionSlide key={activeTab} solution={activeSolution} />
            </div>
          </div>

          {/* Footnote */}
          <div className="csb__footnote">
            <p>
              (*) Chính sách được áp dụng theo văn bản được ban hành chính thức
              từ phía Chủ đầu tư
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

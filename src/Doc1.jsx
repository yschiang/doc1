import { useState } from "react";

// ─── Design tokens ───
const T = {
  bg: "#FAFAF8",
  text: "#1a1a1a",
  textSec: "#666",
  border: "#E8E8E4",
  codeBg: "#F5F5F0",
  cardBg: "#FFF",
  red: "#DC2626",
  blue: "#3B82F6",
  green: "#16A34A",
  amber: "#D97706",
  purple: "#7C3AED",
};

const tagStyles = {
  red: { bg: "#FEE2E2", color: "#991B1B" },
  green: { bg: "#DCFCE7", color: "#166534" },
  blue: { bg: "#DBEAFE", color: "#1E40AF" },
  amber: { bg: "#FEF3C7", color: "#92400E" },
  gray: { bg: "#F3F4F6", color: "#374151" },
  purple: { bg: "#F3E8FF", color: "#6B21A8" },
};

// ─── Reusable components ───
const Tag = ({ variant = "gray", children }) => (
  <span style={{
    display: "inline-block", padding: "3px 12px", borderRadius: 20,
    fontSize: 13, fontWeight: 500, lineHeight: "20px",
    background: tagStyles[variant].bg, color: tagStyles[variant].color,
  }}>{children}</span>
);

const Code = ({ children }) => (
  <code style={{
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 14,
    background: T.codeBg, padding: "2px 8px", borderRadius: 4,
    border: `1px solid ${T.border}`,
  }}>{children}</code>
);

const CodeBlock = ({ children }) => (
  <pre style={{
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13,
    background: T.codeBg, padding: "16px 20px", borderRadius: 8,
    lineHeight: 1.7, overflowX: "auto", whiteSpace: "pre-wrap",
    margin: "16px 0", wordBreak: "break-word",
  }}>{children}</pre>
);

const Callout = ({ children }) => (
  <div style={{
    background: "#FFF5F5", borderLeft: `4px solid ${T.red}`,
    padding: "20px 24px", margin: "24px 0", borderRadius: "0 8px 8px 0",
    lineHeight: 1.9, fontSize: 15,
  }}>{children}</div>
);

const InfoCallout = ({ children }) => (
  <div style={{
    background: "#EFF6FF", borderLeft: `4px solid ${T.blue}`,
    padding: "20px 24px", margin: "24px 0", borderRadius: "0 8px 8px 0",
    lineHeight: 1.9, fontSize: 15,
  }}>{children}</div>
);

const SectionNum = ({ n }) => (
  <div style={{
    fontSize: 13, fontWeight: 600, color: T.blue,
    letterSpacing: 1, marginBottom: 4, marginTop: 64,
  }}>{typeof n === "number" ? `0${n}` : n}</div>
);

const H2 = ({ children }) => (
  <h2 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.4, marginBottom: 12 }}>{children}</h2>
);

const H3 = ({ children }) => (
  <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 36, marginBottom: 8, lineHeight: 1.4 }}>{children}</h3>
);

const H4 = ({ children }) => (
  <h4 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 6 }}>{children}</h4>
);

const P = ({ children, style }) => (
  <p style={{ marginBottom: 16, lineHeight: 1.8, fontSize: 15, ...style }}>{children}</p>
);

const NewBadge = () => (
  <span style={{
    display: "inline-block", fontSize: 10, fontWeight: 700, color: "#fff",
    background: T.blue, padding: "1px 8px", borderRadius: 3,
    marginLeft: 8, verticalAlign: "middle", letterSpacing: 0.5,
  }}>NEW</span>
);

const DefCard = ({ title, label, desc, tags, code }) => (
  <div style={{
    background: "#FDFCF7", border: `1px solid ${T.border}`,
    borderRadius: 12, padding: "24px 28px", margin: "16px 0",
  }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
      <span style={{ fontSize: 18, fontWeight: 700 }}>{title}</span>
      <span style={{ fontSize: 14, color: T.textSec }}>{label}</span>
    </div>
    <P>{desc}</P>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
      {tags.map((t, i) => <Tag key={i} variant={t.v}>{t.t}</Tag>)}
    </div>
    <CodeBlock>{code}</CodeBlock>
  </div>
);

const Table = ({ headers, rows, cellTag }) => (
  <div style={{ overflowX: "auto", margin: "20px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{
            textAlign: "left", padding: "10px 16px", fontWeight: 600,
            color: T.textSec, fontSize: 13, borderBottom: `2px solid ${T.border}`,
          }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>{row.map((cell, ci) => (
            <td key={ci} style={{
              padding: "10px 16px", borderBottom: `1px solid ${T.border}`,
              verticalAlign: "top", fontWeight: ci === 0 ? 600 : 400,
            }}>{cellTag && ci > 0 && cell.v ? (
              <span style={{
                display: "inline-block", padding: "2px 10px", borderRadius: 4,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500,
                background: tagStyles[cell.v].bg, color: tagStyles[cell.v].color,
              }}>{cell.t}</span>
            ) : (typeof cell === "object" && cell.t ? cell.t : cell)}</td>
          ))}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ComparePanel = ({ title, headerBg, headerColor, borderColor, code, note }) => (
  <div style={{ border: `1px solid ${borderColor}`, borderRadius: 10, overflow: "hidden", flex: 1, minWidth: 280 }}>
    <div style={{ padding: "10px 16px", fontSize: 14, fontWeight: 600, background: headerBg, color: headerColor }}>{title}</div>
    <div style={{ padding: 16 }}><CodeBlock>{code}</CodeBlock></div>
    <div style={{ padding: "10px 16px", fontSize: 13, color: T.textSec, background: T.codeBg, lineHeight: 1.6 }}>{note}</div>
  </div>
);

const MappingRow = ({ title, oldTitle, oldItems, oldNote, newTitle, newItems, newNote }) => (
  <div style={{ marginBottom: 28 }}>
    <H4>{title}</H4>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", gap: 0, alignItems: "stretch" }}>
      <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "14px 18px" }}>
        <div style={{ fontSize: 13, color: T.textSec, marginBottom: 8 }}>{oldTitle}</div>
        {oldItems.map((item, i) => <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, marginBottom: 3 }}>{item}</div>)}
        <div style={{ fontSize: 12, color: T.textSec, marginTop: 8 }}>{oldNote}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#999" }}>→</div>
      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "14px 18px" }}>
        <div style={{ fontSize: 13, color: T.textSec, marginBottom: 8 }}>{newTitle}</div>
        {newItems.map((item, i) => <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, marginBottom: 3 }}>{item}</div>)}
        <div style={{ fontSize: 12, color: T.textSec, marginTop: 8 }}>{newNote}</div>
      </div>
    </div>
  </div>
);

const GoalBox = ({ main, subs }) => (
  <div style={{
    background: "#F8F6F0", border: `1px solid ${T.border}`, borderRadius: 12,
    padding: "28px 36px", margin: "24px 0", textAlign: "center",
  }}>
    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, lineHeight: 1.6 }}>{main}</div>
    <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.9 }}>{subs}</div>
  </div>
);

const Checklist = ({ items }) => (
  <div style={{ background: T.codeBg, borderRadius: 8, padding: "18px 22px", margin: "16px 0", fontSize: 14, lineHeight: 2.2 }}>
    {items.map((item, i) => <div key={i}><span style={{ fontFamily: "monospace", marginRight: 10 }}>□</span>{item}</div>)}
  </div>
);

const Divider = () => <hr style={{ border: "none", borderTop: `1px solid ${T.border}`, margin: "56px 0" }} />;

const Tabs = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${T.border}`, marginBottom: 32, marginTop: 48 }}>
    {tabs.map((t, i) => (
      <button key={i} onClick={() => onChange(i)} style={{
        padding: "12px 24px", fontSize: 15, fontWeight: active === i ? 700 : 400,
        color: active === i ? T.blue : T.textSec, background: "none", border: "none",
        borderBottom: active === i ? `2px solid ${T.blue}` : "2px solid transparent",
        cursor: "pointer", marginBottom: -2, transition: "all 0.2s",
      }}>{t}</button>
    ))}
  </div>
);

// ─── Three-Layer Diagram (SVG) ───
const ThreeLayerDiagram = () => (
  <div style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}>
    <svg viewBox="0 0 700 520" style={{ width: "100%", maxWidth: 700 }} xmlns="http://www.w3.org/2000/svg">
      {/* Layer 3 */}
      <rect x="10" y="10" width="680" height="120" rx="12" fill="#F3E8FF" fillOpacity="0.3" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="30" y="35" fontSize="13" fontWeight="700" fill="#7C3AED">Layer 3 — Flow 觸發與編排</text>

      <rect x="40" y="50" width="280" height="65" rx="8" fill="#FFF" stroke="#C084FC" strokeWidth="1.5" />
      <text x="180" y="72" fontSize="14" fontWeight="700" textAnchor="middle" fill={T.text}>Check-in Flow</text>
      <text x="180" y="90" fontSize="12" textAnchor="middle" fill={T.textSec}>Host 自動觸發 · per lot · 固定流程</text>
      <text x="180" y="106" fontSize="11" textAnchor="middle" fill="#DC2626" fontWeight="500">production 關鍵路徑</text>

      <rect x="370" y="50" width="290" height="65" rx="8" fill="#FFF" stroke="#C084FC" strokeWidth="1.5" />
      <text x="515" y="72" fontSize="14" fontWeight="700" textAnchor="middle" fill={T.text}>Workflow</text>
      <text x="515" y="90" fontSize="12" textAnchor="middle" fill={T.textSec}>人開工單 · per tool · 預定義 template</text>
      <text x="515" y="106" fontSize="11" textAnchor="middle" fill={T.textSec}>可容忍延遲</text>

      {/* Arrows down */}
      <line x1="180" y1="115" x2="180" y2="155" stroke="#999" strokeWidth="1.5" />
      <polygon points="176,153 184,153 180,161" fill="#999" />
      <line x1="515" y1="115" x2="515" y2="155" stroke="#999" strokeWidth="1.5" />
      <polygon points="511,153 519,153 515,161" fill="#999" />

      {/* Bulkhead: Check-in (Layer 2 + Layer 1) */}
      <rect x="20" y="165" width="320" height="310" rx="12" fill="#FFF" stroke="#93C5FD" strokeWidth="2" />
      <text x="40" y="190" fontSize="13" fontWeight="700" fill="#2563EB">Check-in 隔離艙</text>

      {/* L2 inside check-in */}
      <rect x="40" y="200" width="280" height="45" rx="6" fill="#DBEAFE" fillOpacity="0.3" stroke="#93C5FD" strokeWidth="1" />
      <text x="50" y="220" fontSize="12" fontWeight="600" fill="#2563EB">Layer 2</text>
      <text x="115" y="220" fontSize="12" fill={T.textSec}>compare · view · get · update</text>
      <text x="50" y="237" fontSize="11" fill={T.textSec}>Spring Boot — 決策 · 編排</text>

      {/* L1 inside check-in */}
      <rect x="40" y="255" width="280" height="100" rx="6" fill="#DCFCE7" fillOpacity="0.2" stroke="#86EFAC" strokeWidth="1" />
      <text x="50" y="275" fontSize="12" fontWeight="600" fill="#16A34A">Layer 1</text>
      <text x="105" y="275" fontSize="12" fill={T.textSec}>系統差異隔離</text>

      <rect x="55" y="290" width="80" height="28" rx="4" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1" />
      <text x="95" y="309" fontSize="11" fontWeight="600" textAnchor="middle">Planner</text>
      <text x="148" y="309" fontSize="11" fill="#999">→</text>
      <rect x="158" y="290" width="55" height="28" rx="4" fill="#FFF" stroke="#E8E8E4" strokeWidth="1" />
      <text x="185" y="309" fontSize="11" fontWeight="600" textAnchor="middle">Plan</text>
      <text x="226" y="309" fontSize="11" fill="#999">→</text>
      <rect x="236" y="290" width="75" height="28" rx="4" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" />
      <text x="273" y="309" fontSize="11" fontWeight="600" textAnchor="middle">Executor</text>

      <text x="50" y="345" fontSize="11" fill={T.textSec}>C++ — 原子操作 · Adapter</text>

      {/* Resources label */}
      <text x="180" y="385" fontSize="11" fill="#2563EB" textAnchor="middle" fontWeight="500">獨立 scaling · 獨立 resource</text>

      {/* Bulkhead: Workflow (Layer 2 + Layer 1) */}
      <rect x="365" y="165" width="315" height="310" rx="12" fill="#FFF" stroke="#93C5FD" strokeWidth="2" />
      <text x="385" y="190" fontSize="13" fontWeight="700" fill="#2563EB">Workflow 隔離艙</text>

      {/* L2 inside workflow */}
      <rect x="385" y="200" width="275" height="45" rx="6" fill="#DBEAFE" fillOpacity="0.3" stroke="#93C5FD" strokeWidth="1" />
      <text x="395" y="220" fontSize="12" fontWeight="600" fill="#2563EB">Layer 2</text>
      <text x="460" y="220" fontSize="12" fill={T.textSec}>compare · view · get · update</text>
      <text x="395" y="237" fontSize="11" fill={T.textSec}>Spring Boot — 決策 · 編排</text>

      {/* L1 inside workflow */}
      <rect x="385" y="255" width="275" height="100" rx="6" fill="#DCFCE7" fillOpacity="0.2" stroke="#86EFAC" strokeWidth="1" />
      <text x="395" y="275" fontSize="12" fontWeight="600" fill="#16A34A">Layer 1</text>
      <text x="450" y="275" fontSize="12" fill={T.textSec}>系統差異隔離</text>

      <rect x="400" y="290" width="80" height="28" rx="4" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1" />
      <text x="440" y="309" fontSize="11" fontWeight="600" textAnchor="middle">Planner</text>
      <text x="493" y="309" fontSize="11" fill="#999">→</text>
      <rect x="503" y="290" width="55" height="28" rx="4" fill="#FFF" stroke="#E8E8E4" strokeWidth="1" />
      <text x="530" y="309" fontSize="11" fontWeight="600" textAnchor="middle">Plan</text>
      <text x="571" y="309" fontSize="11" fill="#999">→</text>
      <rect x="581" y="290" width="70" height="28" rx="4" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" />
      <text x="616" y="309" fontSize="11" fontWeight="600" textAnchor="middle">Executor</text>

      <text x="395" y="345" fontSize="11" fill={T.textSec}>C++ — 原子操作 · Adapter</text>

      <text x="522" y="385" fontSize="11" fill="#2563EB" textAnchor="middle" fontWeight="500">獨立 scaling · 獨立 resource</text>

      {/* Same code label */}
      <text x="350" y="505" fontSize="12" fill="#999" textAnchor="middle" fontWeight="500">同一份 code · 兩組部署 · Layer 1 + Layer 2 整組隔離</text>
    </svg>
  </div>
);

// ─── Tech Boundary Diagram (SVG) ───
const TechBoundaryDiagram = () => (
  <div style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}>
    <svg viewBox="0 0 700 440" style={{ width: "100%", maxWidth: 700 }} xmlns="http://www.w3.org/2000/svg">
      {/* Check-in trigger */}
      <text x="155" y="20" fontSize="13" fontWeight="600" fill="#7C3AED" textAnchor="middle">Check-in（自動）</text>
      <text x="155" y="36" fontSize="11" fill={T.textSec} textAnchor="middle">Host per lot · system auth</text>
      <line x1="155" y1="42" x2="155" y2="72" stroke="#999" strokeWidth="1.5" />
      <polygon points="151,70 159,70 155,78" fill="#999" />

      {/* Workflow trigger */}
      <text x="520" y="20" fontSize="13" fontWeight="600" fill="#7C3AED" textAnchor="middle">Workflow（人工）</text>
      <text x="520" y="36" fontSize="11" fill={T.textSec} textAnchor="middle">人開工單</text>
      <line x1="520" y1="42" x2="520" y2="52" stroke="#999" strokeWidth="1.5" />

      <rect x="450" y="52" width="140" height="28" rx="5" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
      <text x="520" y="71" fontSize="12" fontWeight="600" textAnchor="middle">APIGW 認證</text>

      <line x1="520" y1="80" x2="520" y2="72" stroke="#999" strokeWidth="1" />
      <line x1="520" y1="80" x2="520" y2="100" stroke="#999" strokeWidth="1.5" />
      <polygon points="516,98 524,98 520,106" fill="#999" />

      {/* Check-in bulkhead */}
      <rect x="20" y="82" width="300" height="340" rx="12" fill="#FFF" stroke="#93C5FD" strokeWidth="2" />
      <text x="40" y="105" fontSize="12" fontWeight="700" fill="#2563EB">Check-in 隔離艙</text>

      {/* Spring Boot inside check-in */}
      <rect x="40" y="115" width="260" height="100" rx="8" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.5" />
      <text x="55" y="138" fontSize="13" fontWeight="700" fill="#C2410C">Spring Boot（腦）</text>
      <text x="55" y="158" fontSize="12" fill={T.textSec}>Planner — 決策</text>
      <text x="55" y="175" fontSize="12" fill={T.textSec}>Flow 編排 · Plan 組裝</text>
      <text x="55" y="192" fontSize="12" fill={T.textSec}>應用授權</text>

      {/* process boundary */}
      <line x1="40" y1="225" x2="300" y2="225" stroke="#E8E8E4" strokeWidth="1" strokeDasharray="4 3" />
      <text x="170" y="240" fontSize="10" fill="#999" textAnchor="middle">process boundary</text>

      {/* C++ inside check-in */}
      <rect x="40" y="248" width="260" height="80" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="55" y="272" fontSize="13" fontWeight="700" fill="#166534">C++（手）</text>
      <text x="55" y="292" fontSize="12" fill={T.textSec}>Executor · Adapter</text>
      <text x="55" y="309" fontSize="12" fill={T.textSec}>原子操作：fetch · compare · write</text>

      <text x="170" y="355" fontSize="11" fill={T.textSec} textAnchor="middle">→ Host · Direct · DB · 檔案儲存 · 機台</text>
      <text x="170" y="405" fontSize="11" fill="#2563EB" textAnchor="middle" fontWeight="500">獨立 scaling</text>

      {/* Workflow bulkhead */}
      <rect x="365" y="110" width="310" height="312" rx="12" fill="#FFF" stroke="#93C5FD" strokeWidth="2" />
      <text x="385" y="133" fontSize="12" fontWeight="700" fill="#2563EB">Workflow 隔離艙</text>

      {/* Spring Boot inside workflow */}
      <rect x="385" y="143" width="270" height="100" rx="8" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.5" />
      <text x="400" y="166" fontSize="13" fontWeight="700" fill="#C2410C">Spring Boot（腦）</text>
      <text x="400" y="186" fontSize="12" fill={T.textSec}>Planner — 決策</text>
      <text x="400" y="203" fontSize="12" fill={T.textSec}>Flow 編排 · Plan 組裝</text>
      <text x="400" y="220" fontSize="12" fill={T.textSec}>應用授權（APIGW 認證後）</text>

      {/* process boundary */}
      <line x1="385" y1="253" x2="655" y2="253" stroke="#E8E8E4" strokeWidth="1" strokeDasharray="4 3" />
      <text x="520" y="268" fontSize="10" fill="#999" textAnchor="middle">process boundary</text>

      {/* C++ inside workflow */}
      <rect x="385" y="276" width="270" height="80" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="400" y="300" fontSize="13" fontWeight="700" fill="#166534">C++（手）</text>
      <text x="400" y="320" fontSize="12" fill={T.textSec}>Executor · Adapter</text>
      <text x="400" y="337" fontSize="12" fill={T.textSec}>原子操作：fetch · compare · write</text>

      <text x="520" y="383" fontSize="11" fill={T.textSec} textAnchor="middle">→ Host · Direct · DB · 檔案儲存 · 機台</text>
      <text x="520" y="405" fontSize="11" fill="#2563EB" textAnchor="middle" fontWeight="500">獨立 scaling</text>

      {/* Same code label */}
      <text x="350" y="435" fontSize="12" fill="#999" textAnchor="middle" fontWeight="500">同一份 code（Spring Boot + C++）· 兩組部署</text>
    </svg>
  </div>
);

// ─── Two-World Diagram (SVG) ───
const TwoWorldDiagram = () => (
  <div style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}>
    <svg viewBox="0 0 680 520" style={{ width: "100%", maxWidth: 680 }} xmlns="http://www.w3.org/2000/svg">
      {/* Spring Boot box */}
      <rect x="10" y="10" width="660" height="210" rx="12" fill="none" stroke="#FDBA74" strokeWidth="2" strokeDasharray="8 4" />
      <text x="30" y="38" fontSize="14" fill="#C2410C" fontWeight="600">算 — Spring Boot · 純邏輯，不碰外部</text>

      <rect x="40" y="65" width="170" height="60" rx="8" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
      <text x="125" y="92" fontSize="15" fontWeight="700" textAnchor="middle" fill="#1a1a1a">Planner</text>
      <text x="125" y="112" fontSize="12" textAnchor="middle" fill="#DC2626">根據 context 決策</text>

      <text x="245" y="92" fontSize="13" fill="#666">return</text>
      <line x1="210" y1="95" x2="300" y2="95" stroke="#999" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

      <rect x="300" y="55" width="340" height="130" rx="8" fill="#FFF" stroke="#E8E8E4" strokeWidth="1.5" />
      <text x="320" y="82" fontSize="15" fontWeight="700" fill="#1a1a1a">ComparePlan</text>
      <text x="320" y="108" fontSize="13" fontFamily="monospace" fill="#666">compareMode（Alpha 支持多種）</text>
      <text x="320" y="128" fontSize="13" fontFamily="monospace" fill="#666">compareExecution</text>
      <text x="320" y="148" fontSize="13" fontFamily="monospace" fill="#666">fetchMethod</text>
      <text x="320" y="168" fontSize="13" fontFamily="monospace" fill="#666">fieldsToCompare</text>

      <line x1="470" y1="185" x2="470" y2="260" stroke="#999" strokeWidth="1.5" strokeDasharray="6 3" />
      <polygon points="466,258 474,258 470,266" fill="#999" />

      {/* process boundary */}
      <line x1="0" y1="240" x2="680" y2="240" stroke="#E8E8E4" strokeWidth="1" strokeDasharray="4 3" />
      <text x="600" y="252" fontSize="10" fill="#999">process boundary</text>

      {/* C++ box */}
      <rect x="10" y="270" width="660" height="240" rx="12" fill="none" stroke="#86EFAC" strokeWidth="2" strokeDasharray="8 4" />
      <text x="30" y="298" fontSize="14" fill="#166534" fontWeight="600">做 — C++ · 原子操作，不做決策</text>

      <rect x="140" y="315" width="260" height="50" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="270" y="338" fontSize="14" fontWeight="700" textAnchor="middle" fill="#1a1a1a">Executor（共用）</text>
      <text x="270" y="355" fontSize="12" textAnchor="middle" fill="#666">讀 plan 欄位來分派</text>

      <line x1="200" y1="365" x2="200" y2="400" stroke="#999" strokeWidth="1.5" />
      <text x="140" y="395" fontSize="12" fill="#666">plan.fetchMethod</text>
      <polygon points="196,398 204,398 200,406" fill="#999" />

      <line x1="370" y1="365" x2="370" y2="400" stroke="#999" strokeWidth="1.5" />
      <text x="295" y="395" fontSize="12" fill="#666">plan.compareMode</text>
      <polygon points="366,398 374,398 370,406" fill="#999" />

      <rect x="80" y="410" width="200" height="80" rx="8" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
      <text x="180" y="435" fontSize="14" fontWeight="600" textAnchor="middle" fill="#1a1a1a">Doc fetcher</text>
      <text x="180" y="458" fontSize="12" textAnchor="middle" fontFamily="monospace" fill="#666">VIA_HOST → Host</text>
      <text x="180" y="476" fontSize="12" textAnchor="middle" fontFamily="monospace" fill="#666">VIA_DIRECT → Direct</text>

      <rect x="310" y="410" width="220" height="80" rx="8" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
      <text x="420" y="435" fontSize="14" fontWeight="600" textAnchor="middle" fill="#1a1a1a">Doc comparator</text>
      <text x="420" y="458" fontSize="12" textAnchor="middle" fontFamily="monospace" fill="#666">FULL_CONTENT → 逐欄比</text>
      <text x="420" y="476" fontSize="12" textAnchor="middle" fontFamily="monospace" fill="#666">PARTIAL / KEY_ITEMS / ...</text>

      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#999" />
        </marker>
      </defs>
    </svg>
  </div>
);

// ─── Resolver Diagram (SVG) ───
const ResolverDiagram = () => (
  <div style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}>
    <svg viewBox="0 0 560 320" style={{ width: "100%", maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
      <rect x="200" y="10" width="160" height="45" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="280" y="38" fontSize="15" fontWeight="600" textAnchor="middle" fill="#1a1a1a">Client</text>

      <line x1="280" y1="55" x2="280" y2="85" stroke="#999" strokeWidth="1.5" />
      <polygon points="276,83 284,83 280,91" fill="#999" />
      <text x="365" y="76" fontSize="13" fill="#666">toolId + 操作</text>

      <rect x="160" y="95" width="240" height="50" rx="8" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
      <text x="280" y="118" fontSize="14" fontWeight="700" textAnchor="middle" fill="#1a1a1a">Unified API</text>
      <text x="280" y="136" fontSize="12" textAnchor="middle" fill="#666" fontStyle="italic">compare / view / get / update</text>

      <line x1="280" y1="145" x2="280" y2="175" stroke="#999" strokeWidth="1.5" />
      <polygon points="276,173 284,173 280,181" fill="#999" />

      <rect x="160" y="185" width="240" height="50" rx="8" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1.5" />
      <text x="280" y="208" fontSize="14" fontWeight="700" textAnchor="middle" fill="#1a1a1a">Resolver</text>
      <text x="280" y="226" fontSize="12" textAnchor="middle" fill="#B91C1C">toolId → 查表 → Strategy</text>

      <line x1="175" y1="235" x2="80" y2="275" stroke="#999" strokeWidth="1" />
      <line x1="230" y1="235" x2="200" y2="275" stroke="#999" strokeWidth="1" />
      <line x1="330" y1="235" x2="340" y2="275" stroke="#999" strokeWidth="1" />
      <line x1="385" y1="235" x2="470" y2="275" stroke="#999" strokeWidth="1" />

      <rect x="20" y="275" width="120" height="36" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="80" y="298" fontSize="13" fontWeight="600" textAnchor="middle">Alpha</text>
      <rect x="155" y="275" width="110" height="36" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="210" y="298" fontSize="13" fontWeight="600" textAnchor="middle">Beta</text>
      <rect x="285" y="275" width="110" height="36" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="340" y="298" fontSize="13" fontWeight="600" textAnchor="middle">Gamma</text>
      <rect x="410" y="275" width="120" height="36" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="470" y="298" fontSize="13" fontWeight="600" textAnchor="middle">Delta</text>
    </svg>
  </div>
);

// ─── Adapter Diagram (SVG) ───
const AdapterDiagram = () => (
  <div style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}>
    <svg viewBox="0 0 500 260" style={{ width: "100%", maxWidth: 500 }} xmlns="http://www.w3.org/2000/svg">
      <rect x="120" y="10" width="260" height="50" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
      <text x="250" y="32" fontSize="14" fontWeight="700" textAnchor="middle" fill="#1a1a1a">Executor</text>
      <text x="250" y="50" fontSize="12" textAnchor="middle" fontFamily="monospace" fill="#666">fetcher.fetch(plan.fetchMethod)</text>

      <line x1="250" y1="60" x2="250" y2="90" stroke="#999" strokeWidth="1.5" />
      <polygon points="246,88 254,88 250,96" fill="#999" />

      <rect x="120" y="100" width="260" height="40" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="250" y="125" fontSize="14" fontWeight="600" textAnchor="middle" fill="#1a1a1a">DocFetcher（介面）</text>

      <line x1="165" y1="140" x2="130" y2="170" stroke="#999" strokeWidth="1.5" />
      <text x="80" y="166" fontSize="12" fill="#666">VIA_HOST</text>
      <line x1="335" y1="140" x2="370" y2="170" stroke="#999" strokeWidth="1.5" />
      <text x="383" y="166" fontSize="12" fill="#666">VIA_DIRECT</text>

      <rect x="40" y="180" width="190" height="55" rx="8" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
      <text x="135" y="205" fontSize="14" fontWeight="600" textAnchor="middle" fill="#1a1a1a">Host adapter</text>
      <text x="135" y="225" fontSize="12" textAnchor="middle" fill="#666">Beta, Alpha, Delta</text>

      <rect x="270" y="180" width="190" height="55" rx="8" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
      <text x="365" y="205" fontSize="14" fontWeight="600" textAnchor="middle" fill="#1a1a1a">Direct adapter</text>
      <text x="365" y="225" fontSize="12" textAnchor="middle" fill="#666">Gamma</text>
    </svg>
  </div>
);

// ─── Main Doc ───
export default function Doc1() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ fontFamily: "'Noto Sans TC', 'Helvetica Neue', sans-serif", background: T.bg, color: T.text, lineHeight: 1.8, fontSize: 15 }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 28px 120px" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.blue, letterSpacing: 2, marginBottom: 10 }}>DOC 1 — REVISED V3</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.3, marginBottom: 12 }}>高階設計</h1>
          <P style={{ fontSize: 17, color: T.textSec }}>回答「為什麼這樣設計？」和「用了哪些模式？」</P>
        </div>

        <Tabs tabs={["正文", "附錄"]} active={tab} onChange={setTab} />

        {tab === 0 ? (
          <>
            {/* ══════════════════════════════════ */}
            {/* 1. 全景 */}
            {/* ══════════════════════════════════ */}
            <SectionNum n={1} />
            <H2>全景：三層架構</H2>

            <P>ACME 要服務兩種場景：</P>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0" }}>
              <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Check-in Flow</div>
                <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.7 }}>
                  Host 自動觸發，per lot/run<br />
                  機台 check-in 時做比對、必要時doc modification<br />
                  <strong>Production 關鍵路徑</strong> — 延遲 = 機台等待 = 產線停
                </div>
              </div>
              <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Workflow</div>
                <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.7 }}>
                  人開工單觸發，per tool<br />
                  預定義 template（全機比對、doc modification...）<br />
                  可容忍延遲，但不能影響 check-in
                </div>
              </div>
            </div>

            <P>兩個場景底下，每台機台都要支援同一組操作：compare、view、get、update。這組操作要能跑在 4 套不同的系統上（Alpha、Beta、Gamma、Delta），而且兩個場景不能互相影響。</P>

            <P>這形成了三層架構：</P>

            <ThreeLayerDiagram />

            <Table
              headers={["層級", "職責", "關鍵字"]}
              rows={[
                ["Layer 3 · Flow", "觸發、編排、auth", "check-in flow / workflow template"],
                ["Layer 2 · Operation", "compare / view / get / update", "Spring Boot — 決策、編排"],
                ["Layer 1 · 差異隔離", "讓操作跑在不同系統上", "Planner → Plan → Executor → Adapter"],
              ]}
            />

            <P>Layer 2 + Layer 1 整組部署兩份（隔離艙）：check-in 和 workflow 各一組 instance，同一份 code、獨立 scaling、獨立 resource，避免 workflow 的 heavy 操作拖慢 check-in。</P>

            {/* ══════════════════════════════════ */}
            {/* 2. 現狀 */}
            {/* ══════════════════════════════════ */}
            <SectionNum n={2} />
            <H2>現狀痛點</H2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, margin: "20px 0" }}>
              {[
                { title: "ACME Alpha", items: ["compare-svc", "doc-svc", "host-gateway", "doc-db"] },
                { title: "ACME Beta", items: ["compare-svc", "doc-svc", "host-client", "doc-db"] },
                { title: "ACME Gamma", items: ["compare-svc", "doc-svc", "direct-connector", "doc-db"] },
                { title: "ACME Delta", items: ["compare-svc", "doc-svc", "host-client", "doc-db"] },
              ].map((sys, i) => (
                <div key={i} style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{sys.title}</div>
                  {sys.items.map((item, j) => (
                    <div key={j} style={{ background: T.codeBg, padding: "5px 10px", borderRadius: 4, fontFamily: "monospace", fontSize: 12, marginBottom: 3 }}>{item}</div>
                  ))}
                  <div style={{ color: "#999", fontFamily: "monospace", fontSize: 12, padding: "3px 10px" }}>...</div>
                </div>
              ))}
            </div>

            <Callout>
              4 套系統各自有一堆微服務，分散在不同 repo。做的事情大部分一樣，但因為分開開發，邏輯漸漸 drift。要改一個共通行為得改 4 個地方，而且沒人敢確定改法一致。
            </Callout>

            <P>Client 端更痛 — 它要知道「這台機台歸哪套系統管」，然後呼叫不同的 API endpoint。如果機台遷移到新系統，Client 也要跟著改。</P>

            <H3>現實 constraint</H3>
            <P>C++ 層是 production 在跑、老且耦合，不敢大動。但 C++ 已經有類似的原子操作拆分，只是被業務邏輯包著。</P>

            {/* ══════════════════════════════════ */}
            {/* 3. 設計目標 */}
            {/* ══════════════════════════════════ */}
            <SectionNum n={3} />
            <H2>設計目標</H2>

            <GoalBox
              main={<>對外一個 API，對內分開做，<br />讓「不同的地方」變成「資料的差異」而不是「程式碼的分支」</>}
              subs={<>Client 不知道有 4 套系統 → 統一入口<br />4 套系統大同小異 → 共用骨架，差異用資料描述<br />逐漸往 Alpha 靠攏 → 改資料就好，不改程式碼</>}
            />

            <H3>技術策略：腦手分離</H3>

            <TechBoundaryDiagram />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0" }}>
              <div style={{ background: "#FFF7ED", border: "1px solid #FDBA74", borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, color: "#C2410C", marginBottom: 6 }}>Spring Boot（腦）</div>
                <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.7 }}>
                  認證、授權<br />
                  Planner — 所有決策邏輯<br />
                  Flow 編排、Plan 組裝<br />
                  好改、好測、好部署
                </div>
              </div>
              <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, color: "#166534", marginBottom: 6 }}>C++（手）</div>
                <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.7 }}>
                  原子操作：fetch、compare、write<br />
                  不做決策、不知道誰呼叫<br />
                  被叫就做<br />
                  改動最小，逐步瘦身
                </div>
              </div>
            </div>

            <P>要達成這個目標，Layer 1 用了三個模式疊起來。讓我一個一個講。</P>

            {/* ══════════════════════════════════ */}
            {/* 4. 模式一 */}
            {/* ══════════════════════════════════ */}
            <SectionNum n={4} />
            <H2>模式一：統一入口 + 路由</H2>
            <P>解決的問題：Client 不應該知道有 4 套系統。</P>

            <ResolverDiagram />

            <P>兩個設計決定。第一，API 的參數是 <Code>toolId</Code> 不是 <Code>acmeType</Code> — Client 不需要知道機台歸哪套系統管，路由是系統內部的事。第二，4 個 Strategy 都實作同一個介面 <Code>DocOperations</Code>，Resolver 拿到的東西可以直接呼叫。</P>

            <H3>DocOperations 介面</H3>
            <CodeBlock>{`interface DocOperations {
  compare(toolId, docName, options) → CompareResult
  view(toolId, docName) → Doc
  get(toolId, docName) → Doc
  update(toolId, docName, content) → MutationResult
}`}</CodeBlock>

            <P>每套系統有對應的實作（行為收斂的系統可以共用），內部都用 Pattern 2 的結構：</P>
            <CodeBlock>{`class AlphaOperations implements DocOperations {
  compare(toolId, docName, options) {
    plan = this.planner.plan(toolId, options)  // 算（Spring Boot）
    return this.executor.execute(plan)          // 做（C++）
  }
}`}</CodeBlock>

            <P>Pattern 1（DocOperations + Resolver）是外層結構 — 決定「誰來處理」。<br />
            Pattern 2（Planner + Plan + Executor）是內層結構 — 決定「怎麼處理」。</P>

            <P>這是 <strong>Registry / Factory</strong> 模式。但光有路由還不夠 — 每個 Strategy 內部怎麼寫？如果每個 Strategy 各寫各的，等於只是把 4 套微服務搬進同一個 codebase，骨子裡還是 4 份重複的程式碼。</P>

            {/* ══════════════════════════════════ */}
            {/* 5. 模式二 */}
            {/* ══════════════════════════════════ */}
            <SectionNum n={5} />
            <H2>模式二：算和做分離（核心）</H2>
            <P>解決的問題：4 套系統做的事 60–80% 一樣，差異在 20–40%。怎麼共用大部分、隔離差異？</P>

            <P>先講一個觀察。把 check-in flow 裡的「比對」拆開來看，它其實在做這些事：</P>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "24px 0" }}>
              {[
                { title: "取 doc", q: "怎麼取？走 Host 還是 Direct？" },
                { title: "取 golden", q: "要不要取？Host 端比就不用" },
                { title: "比對", q: "誰比？比什麼？比多少？" },
              ].map((t, i) => (
                <div key={i} style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: 18, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: T.textSec }}>{t.q}</div>
                </div>
              ))}
            </div>

            <P>但「比對」這件事在不同系統裡語義不同：</P>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0" }}>
              <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Beta / Alpha — Host 端比</div>
                <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.7 }}>
                  Host check-in 時呼叫 ACME<br />
                  ACME 回傳 doc 給 Host<br />
                  <strong>Host 自己比</strong>，ACME 不做比對<br />
                  ACME 的角色是「提供資料」
                </div>
              </div>
              <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Gamma / Delta — ACME 端比</div>
                <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.7 }}>
                  ACME 主動取 doc<br />
                  ACME 取 golden<br />
                  <strong>ACME 自己比</strong>，回傳結果<br />
                  ACME 是比對的執行者
                </div>
              </div>
            </div>

            <P>骨架類似，但「怎麼取」「誰比」「比什麼」每套系統不同。最直覺的做法是在每個步驟裡加 <Code>if-else</Code>。但這樣一來，決策邏輯散落在多個地方，每個地方都要判斷系統類型。</P>

            <P>「算和做」的做法不一樣 — 先把所有問號的答案算好，打包成一張「點單」，再交給執行端照做。</P>

            <H3>全貌：兩個世界</H3>

            <TwoWorldDiagram />

            <P>上面虛線框是「算」— Spring Boot 裡的 Planner 根據系統類型和 request context，把所有決策打包成一個 <Code>ComparePlan</Code> 物件 return 出來，過程中完全不碰 DB、不碰 Host、不碰機台。下面是「做」— C++ 裡的 Executor 拿到 Plan，照著欄位值去呼叫對應的原子操作，它不需要知道「為什麼要走 Direct」，只管 Plan 說什麼就做什麼。</P>

            <H3>三個角色的嚴格定義</H3>

            <DefCard
              title="Planner" label="算 · Spring Boot"
              desc={<>根據 toolId 和 request context，決定「接下來要怎麼做」。<br />不是固定查表 — Alpha 支持多種 compare mode，Planner 根據 context 決策。</>}
              tags={[
                { t: "純函數", v: "gray" }, { t: "可單測", v: "gray" }, { t: "根據 context 決策", v: "blue" },
                { t: "不碰 DB", v: "red" }, { t: "不碰網路", v: "red" }, { t: "不碰機台", v: "red" },
              ]}
              code={`// Alpha — 根據 context 決策，不是固定值
plan = planner.plan("ALPHA-01", { scope: PARTIAL, fields: ["temp", "pressure"] })
// → ComparePlan { mode: PARTIAL_CONTENT, fields: [...], execution: HOST_SIDE, ... }

// Gamma — 行為相對固定
plan = planner.plan("GAMMA-01", {})
// → ComparePlan { mode: FULL_CONTENT, execution: LOCAL_SIDE, fetch: VIA_DIRECT, ... }`}
            />

            <DefCard
              title="Plan" label="點單"
              desc={<>一個純資料物件，是 Spring Boot 和 C++ 之間唯一的溝通介面。<br />它描述「要做什麼」但本身不做任何事。跨 process boundary 傳遞。</>}
              tags={[
                { t: "純資料", v: "gray" }, { t: "可序列化", v: "gray" }, { t: "可 log", v: "gray" },
                { t: "可 diff", v: "gray" }, { t: "可 dry-run", v: "gray" }, { t: "跨 process boundary", v: "blue" },
              ]}
              code={`{ compareMode: PARTIAL_CONTENT,
  compareExecution: HOST_SIDE,   // 誰負責比對
  fetchMethod: VIA_HOST,
  fieldsToCompare: ["temp", "pressure"] }`}
            />

            <DefCard
              title="Executor" label="做 · C++"
              desc={<>拿到 Plan，照著做。有條件分支，但分支依據是 Plan 欄位、不是系統類型。<br />4 套系統共用同一個 Executor。</>}
              tags={[
                { t: "有 I/O", v: "gray" }, { t: "原子操作", v: "gray" }, { t: "共用一份", v: "gray" },
                { t: "不做決策", v: "red" }, { t: "不看系統類型", v: "red" },
              ]}
              code={`doc = fetcher.fetch(toolId, plan.fetchMethod)

if (plan.compareExecution == HOST_SIDE)
  return doc                              // 只回傳，不比
else
  golden = goldenStore.get(docName)
  return comparator.run(golden, doc, plan.compareMode)

// 分支看的是 Plan 欄位，不是 systemType`}
            />

            <H3>差異全部收斂在 Planner 裡</H3>
            <P>4 套系統的差異不是散落在程式碼各處的 <Code>if-else</Code>，而是 Planner 根據系統和 context 產出不同的 Plan 值：</P>

            <Table
              headers={["Planner", "compareMode", "compareExecution", "fetchMethod"]}
              cellTag
              rows={[
                ["Alpha", { t: "多種（由 context 決定）", v: "red" }, { t: "HOST_SIDE", v: "amber" }, { t: "VIA_HOST", v: "blue" }],
                ["Beta", { t: "KEY_ITEMS（固定）", v: "red" }, { t: "HOST_SIDE", v: "amber" }, { t: "VIA_HOST", v: "blue" }],
                ["Gamma", { t: "FULL_CONTENT（固定）", v: "red" }, { t: "LOCAL_SIDE", v: "green" }, { t: "VIA_DIRECT", v: "blue" }],
                ["Delta", { t: "CHECKSUM（固定）", v: "red" }, { t: "LOCAL_SIDE", v: "green" }, { t: "VIA_HOST", v: "blue" }],
              ]}
            />

            <P>Executor 端的程式碼只有一份，不出現在這張表裡。</P>

            <InfoCallout>
              <strong>Gamma 的未來：</strong>除了取 doc 的方式（VIA_DIRECT）不同，Gamma 的比對邏輯應該完全被 Alpha 覆蓋。遷移時只需要把 Gamma Planner 的 return 值改成和 Alpha 一致（或直接共用 AlphaPlanner），Executor 不用動。
            </InfoCallout>

            <H4>compareExecution 是什麼？</H4>
            <P><Code>compareExecution</Code> 描述「誰負責比對」— 控制權歸屬。</P>

            <Table
              headers={["值", "意義", "Executor 行為"]}
              cellTag
              rows={[
                [{ t: "HOST_SIDE", v: "amber" }, "Host 負責比，ACME 只提供 doc", "fetch doc → return（不呼叫 comparator）"],
                [{ t: "LOCAL_SIDE", v: "green" }, "ACME 負責比，取 doc + golden + 比對", "fetch → get golden → compare → return result"],
              ]}
            />

            <InfoCallout>
              <strong>注意：</strong><Code>compareExecution</Code> 不一定只取決於系統類型。同一台 Alpha 機台，check-in 時可能是 HOST_SIDE（Host 發起，ACME 回傳 doc），但 Workflow 觸發的 compare 可能需要 LOCAL_SIDE（沒有 Host check-in 發生）。Planner 需要根據觸發來源決定這個值。具體邏輯由實作時確認。
            </InfoCallout>

            <H3>本質：Logic 和 Side Effect 分離</H3>

            <P>這就是把純邏輯和 side effect 分開，但不只是分開 — 中間多了一個關鍵的東西：<strong>Plan 物件</strong>。它讓決策可以被觀察、被比較、被重播，而不只是「被執行完就消失」。而且它恰好也是 Spring Boot 和 C++ 之間的通訊契約。</P>

            <div style={{ display: "flex", gap: 16, margin: "24px 0", flexWrap: "wrap" }}>
              <ComparePanel
                title="常見：散落的 boolean"
                headerBg="#FEF2F2" headerColor="#991B1B" borderColor="#FCA5A5"
                code={`// 每個步驟各自判斷
if (type == SCANNER)
  doc = edi.fetch(...)
else
  doc = host.fetch(...)

if (type == BETA || type == ALPHA)
  return doc           // Host 端比
else if (type == METROLOGY)
  ok = hash(doc) == hash(golden)
else
  ok = deepCompare(doc, golden)`}
                note={<>Logic 和 side effect 混在一起。<br />決策散落在多個 if 裡，彼此關係隱含。</>}
              />
              <ComparePanel
                title="算和做：完整的 Plan"
                headerBg="#F0FDF4" headerColor="#166534" borderColor="#86EFAC"
                code={`// Spring Boot：所有決策一次算完
plan = planner.plan(toolId, context)
// → { mode, execution, fetch, fields }

// C++：照 plan 做，零 if-else
doc = fetcher.fetch(plan.fetch)
if (plan.execution == HOST_SIDE)
  return doc
golden = store.get(docName)
result = comparator.run(
           golden, doc, plan.mode)`}
                note={<>決策打包成一個物件，跨 process boundary。<br />C++ 的分支看 Plan 欄位，不看系統類型。</>}
              />
            </div>

            {/* ══════════════════════════════════ */}
            {/* 6. 模式三 */}
            {/* ══════════════════════════════════ */}
            <SectionNum n={6} />
            <H2>模式三：Adapter 抽象化</H2>
            <P>解決的問題：不同系統連接機台的方式不同（Host vs Direct），但 Executor 不應該知道這些。</P>

            <AdapterDiagram />

            <P>Adapter 這層處理的是「怎麼跟外部溝通」的差異。Plan 裡的 <Code>fetchMethod</Code> enum 值就是 Executor 選 adapter 的依據。以後如果有新的連線方式（例如直連 REST API），加一個 adapter + 加一個 enum 值就好。</P>

            <H3>Planner 和 Adapter 的邊界</H3>
            <CodeBlock>{`Planner 管「做什麼」（what） → Plan 欄位 · Spring Boot
Adapter 管「怎麼連」（how） → 通訊實作 · C++

Planner 不知道 Host 的 API 長什麼樣。
Adapter 不知道現在是在處理哪套系統。`}</CodeBlock>

            <Callout>
              <strong>紅線：</strong>Adapter 內部允許 <Code>switch plan.hostApiVersion</Code>（基於 Plan 欄位 dispatch）。<br />
              禁止 <Code>if systemType == ALPHA</Code>（基於系統類型判斷）。一旦出現，代表有差異沒被 Plan 收斂。
            </Callout>

            {/* ══════════════════════════════════ */}
            {/* 7. 設計驗證 */}
            {/* ══════════════════════════════════ */}
            <SectionNum n={7} />
            <H2>設計驗證：可測試性與擴展性</H2>
            <P>三個模式講完了。怎麼知道這個設計真的 work？</P>

            <H3>可測試性 — 腦手分離的紅利</H3>
            <P>以前 4 套系統各自一個 compare-svc，要測比對邏輯就得把整條鏈路拉起來 — 連 Host、連 DB、連機台。測試慢、環境難搭、壞了不知道是邏輯錯還是環境掛。</P>
            <P>算和做分離之後，加上 Spring Boot / C++ 的 process boundary，測試可以按層切開：</P>

            <H4>Planner — 純函數（Spring Boot，最好測）</H4>
            <CodeBlock>{`// Alpha — 根據 context 產出不同 Plan
assert AlphaPlanner.plan("ALPHA-01", { scope: PARTIAL }) == {
  compareMode: PARTIAL_CONTENT,
  compareExecution: HOST_SIDE,
  fetchMethod: VIA_HOST, ...
}

// Alpha — 不支持的 mode
assert AlphaPlanner.plan("ALPHA-01", { scope: UNKNOWN }) throws UnsupportedModeError

// Gamma — 固定行為
assert GammaPlanner.plan("GAMMA-01", {}) == {
  compareMode: FULL_CONTENT,
  compareExecution: LOCAL_SIDE,
  fetchMethod: VIA_DIRECT, ...
}`}</CodeBlock>
            <P><strong>以前怎麼測？</strong> 沒辦法單獨測。決策散在 C++ 的各個 if-else 裡，要測「Gamma 走 Direct」就得真的連 Direct。現在只要看 Plan 的值。</P>

            <H4>Executor — mock 原子操作（C++）</H4>
            <CodeBlock>{`// HOST_SIDE → 只 fetch，不比
executor.execute(plan_host_side, mockOps)
assert mockFetcher.wasCalled == true
assert mockComparator.wasCalled == false  // 不比

// LOCAL_SIDE → fetch + compare
executor.execute(plan_local_side, mockOps)
assert mockFetcher.wasCalled == true
assert mockComparator.wasCalled == true   // 比`}</CodeBlock>

            <H4>測試策略總覽</H4>
            <Table
              headers={["層級", "技術棧", "測什麼", "怎麼測", "跑在哪"]}
              rows={[
                ["Planner", "Spring Boot", "context → Plan 值", "純函數單測", "每次 PR"],
                ["Plan", "共用", "validation / 序列化", "單測", "每次 PR"],
                ["Executor", "C++", "Plan → dispatch", "mock 原子操作", "每次 PR"],
                ["Adapter", "C++", "通訊格式", "契約 + 整合", "PR / staging"],
                ["端到端", "跨 process", "整條鏈路", "happy path", "staging"],
              ]}
            />

            <div style={{ background: T.codeBg, borderRadius: 8, padding: "16px 20px", margin: "16px 0", fontSize: 14, lineHeight: 1.8 }}>
              <strong>以前：</strong>測決策要拉整條 C++ 鏈路，慢、脆、壞了不知道是哪裡。<br />
              <strong>現在：</strong>決策在 Spring Boot 測、執行在 C++ 測、跨 process 只在 staging 測。
            </div>

            <H3>擴展性 — 新系統加入的改動範圍</H3>

            <Table
              headers={["改動項", "位置", "要不要改"]}
              rows={[
                ["新增 Planner", "Spring Boot", "✅ 新增一個檔案"],
                ["更新 Resolver mapping", "Spring Boot config", "✅ 加一行"],
                ["新增 Adapter", "C++", "⚠️ 新通訊方式才需要"],
                ["Executor", "C++", "❌ 不用"],
                ["其他 Planner", "Spring Boot", "❌ 不用"],
              ]}
            />

            <Callout>
              <strong>反面驗證：</strong>如果加入新系統需要改 C++ Executor 的邏輯、或需要在任何地方加 <Code>if (systemType == XXX)</Code>，就代表有差異沒有被 Plan 涵蓋，架構需要回頭檢視。
            </Callout>

            <Checklist items={[
              "新增 XxxPlanner（Spring Boot）— 定義這套系統的 Plan",
              "更新 tool-mapping config — 加 pattern → system mapping",
              "評估 fetchMethod — 現有 C++ Adapter 能用就用，不能用就加",
              "評估 compareMode — 現有 C++ Comparator 能用就用，不能用就加",
              "加測試 — Planner 單測 + Executor mock 測試加入新 case",
              "更新差異表格 — Planner 對照表加一行",
            ]} />

            {/* ══════════════════════════════════ */}
            {/* 8. 對照 */}
            {/* ══════════════════════════════════ */}
            <Divider />
            <SectionNum n={8} />
            <H2>從 multi-repo 到統一架構</H2>

            <MappingRow
              title="Compare 服務"
              oldTitle="現在（4 repos · C++ 混在一起）"
              oldItems={["acme-alpha/compare-svc", "acme-beta/compare-svc", "acme-gamma/compare-svc", "acme-delta/compare-svc"]}
              oldNote="決策邏輯和 I/O 混在 C++ 裡"
              newTitle="新架構（同 code × 2 隔離艙）"
              newItems={["Spring Boot:", "├ ComparePlanner (×N, 根據 context 決策)", "├ Plan 組裝 + 傳遞", "C++:", "├ CompareExecutor (×1, 共用)", "└ 原子操作 (fetch / compare / write)"]}
              newNote="決策在 Spring Boot，執行在 C++。部署兩組 instance。"
            />
            <MappingRow
              title="機台通訊"
              oldTitle="現在（散落）"
              oldItems={["acme-alpha/host-gateway", "acme-beta/host-client", "acme-gamma/direct-connector", "acme-delta/host-client"]}
              oldNote="3 個 Host client 各自實作"
              newTitle="新架構（C++ 共用 adapter）"
              newItems={["C++ adapters:", "├ HostAdapter (×1)", "└ DirectAdapter (×1)"]}
              newNote="由 Plan.fetchMethod 決定走哪條。隨隔離艙各部署一份。"
            />
            <MappingRow
              title="API 層"
              oldTitle="現在（4 endpoints）"
              oldItems={["/api/alpha/doc/compare", "/api/beta/doc/compare", "/api/gamma/doc/compare", "/api/delta/doc/compare"]}
              oldNote="Client 要知道打哪個 endpoint"
              newTitle="新架構（1 endpoint）"
              newItems={["/api/doc/compare?toolId=XXX"]}
              newNote="Client 只傳 toolId，路由在 Spring Boot 內部"
            />

            <Divider />
            <P style={{ color: T.textSec, fontSize: 14 }}>
              <strong>Part 2 預告：</strong>Check-in flow flow 編排、Workflow template 與 node 設計、doc modification流程、Resolver 查表實作、C++ 介面規格、遷移 phase 細節。
            </P>
          </>
        ) : (
          // ═══════════════════════════
          // 附錄
          // ═══════════════════════════
          <>
            <SectionNum n={"A"} />
            <H2>附錄 A：Scope 擴展 — compare 以外的操作</H2>
            <P>前面用 compare 走完三個模式，但每台機台要支援多種操作。每種都適用「算和做分離」：</P>

            <Table
              headers={["操作", "Plan 類型", "Plan 關鍵欄位", "Executor 動作（C++）"]}
              rows={[
                ["compare", "ComparePlan", "compareMode, compareExecution, fetchMethod, fieldsToCompare", "fetch → (比對 or 回傳)"],
                ["view / get", "ViewPlan", "fetchMethod, fieldMapping, displayFormat", "fetch → 映射 → 回傳"],
                ["update", "UpdatePlan", "validationRules, targetLocation, writeMethod, rollbackStrategy", "驗證 → 寫入 → 確認"],
                ["list", "ListPlan", "queryScope, filterCriteria, pagination", "查詢 → 篩選 → 回傳"],
              ]}
            />

            <Callout>
              所有 Plan 類型都必須滿足三個條件 —<br />
              ① <strong>純資料</strong>：可序列化、跨 process boundary<br />
              ② <strong>自描述</strong>：C++ Executor 不需要回頭問 Spring Boot<br />
              ③ <strong>完備</strong>：一個 Plan 包含 Executor 所需的全部資訊
            </Callout>

            <Divider />

            <SectionNum n={"B"} />
            <H2>附錄 B：Plan Schema 演進策略</H2>
            <H3>原則：加欄位，不加 if-else</H3>
            <CodeBlock>{`// Gamma Planner — 加新欄位
{ fetchMethod: VIA_DIRECT, retryPolicy: EXPONENTIAL_BACKOFF, ... }

// Alpha Planner — 回傳預設值
{ fetchMethod: VIA_HOST, retryPolicy: NO_RETRY, ... }

// C++ Executor — 讀欄位值，不看系統類型
fetcher.fetch(toolId, plan.fetchMethod, plan.retryPolicy)`}</CodeBlock>

            <Table
              headers={["情況", "做法", "改哪裡"]}
              rows={[
                ["差異是「選哪條路」", "Plan 加欄位", "Spring Boot Planner"],
                ["差異是「怎麼走這條路」", "加 Adapter", "C++ 新增 adapter"],
                ["差異是「要不要多走一步」", "Plan 加 boolean flag", "Spring Boot Planner"],
              ]}
            />

            <P>Plan 物件帶版本號（<Code>schemaVersion: 2</Code>），C++ Executor 檢查版本號。不相容時 fail fast。</P>

            <Divider />

            <SectionNum n={"C"} />
            <H2>附錄 C：錯誤處理邊界</H2>

            <Table
              headers={["錯誤類型", "發生在", "技術棧", "處理方式"]}
              rows={[
                ["toolId 無法 resolve", "Resolver", "Spring Boot", "400 UNKNOWN_TOOL_ID"],
                ["Plan 欄位不合法", "Planner 出口", "Spring Boot", "build 時檢查，fail fast"],
                ["Adapter 連線失敗", "Executor → Adapter", "C++", "依 retryPolicy 重試或 fail"],
                ["doc 格式異常", "Executor → Fetcher", "C++", "回傳 INVALID_DOC_FORMAT"],
                ["compare 不 match", "Comparator", "C++", "正常結果 { match: false }"],
                ["Plan schema 不相容", "Executor 入口", "C++", "reject，回報 Spring Boot"],
              ]}
            />

            <H3>錯誤不穿透原則</H3>
            <CodeBlock>{`// Client 看到的（Spring Boot 轉譯）
{ "error": "ADAPTER_UNAVAILABLE",
  "message": "Failed to fetch doc from tool GAMMA-01",
  "retryable": true }

// Client 不會看到（C++ 內部錯誤）
// "Direct connection timeout at 10.2.3.4:8080"`}</CodeBlock>

            <P>C++ 的錯誤回傳給 Spring Boot，Spring Boot 統一包裝成 domain error 給 Client。Plan 可 log — 出問題時光看 Plan 就能重現決策過程。</P>

            <Divider />

            <SectionNum n={"D"} />
            <H2>附錄 D：遷移路徑</H2>
            <P>「逐漸往 Alpha 靠攏，改資料就好」— 只改 Spring Boot Planner 的 return 值。</P>

            <H3>範例：Gamma 收斂到 Alpha</H3>
            <CodeBlock>{`// Before — Gamma Planner (Spring Boot)
{ compareMode: FULL_CONTENT, fetchMethod: VIA_DIRECT,
  compareExecution: LOCAL_SIDE, ... }

// After — 改 Planner 的 return 值
{ compareMode: FULL_CONTENT, fetchMethod: VIA_HOST,
  compareExecution: HOST_SIDE, ... }

// C++ Executor 不用改。C++ Adapter 不用改。`}</CodeBlock>

            <Callout>
              <strong>注意：</strong>這個範例裡 compareExecution 從 LOCAL_SIDE 變成 HOST_SIDE，不只是改一個欄位 — 是「ACME 自己比」變成「Host 比」的行為轉換。前提是 Host 端能接受 Gamma 的 doc 格式、Host 比對邏輯能覆蓋 Gamma 的 case。Planner 的改動很小，但上線前要驗證 Host 端的相容性。
            </Callout>

            <P>Feature flag 只出現在 Spring Boot Planner 裡，C++ 完全不知道有遷移在進行。</P>

            <H3>四階段策略</H3>
            <div style={{ display: "flex", gap: 8, margin: "20px 0", flexWrap: "wrap" }}>
              {[
                { n: "Stage 1", title: "Shadow", desc: "同時產出新舊 Plan\n只執行舊的\n新的只 log + diff", bg: "#FEF3C7" },
                { n: "Stage 2", title: "Canary", desc: "5% request\n走新 Plan\n監控錯誤率", bg: "#FED7AA" },
                { n: "Stage 3", title: "全量", desc: "100% 走新 Plan\n保留 rollback\n觀察一週", bg: "#BBF7D0" },
                { n: "Stage 4", title: "清理", desc: "移除舊邏輯\n移除 flag\n更新文件", bg: "#E0F2FE" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, minWidth: 140, borderRadius: 8, padding: 16, textAlign: "center", background: s.bg }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{s.n}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: T.textSec, lineHeight: 1.5, whiteSpace: "pre-line" }}>{s.desc}</div>
                </div>
              ))}
            </div>

            <P>所有遷移都只動 Spring Boot — 改 Planner return 值、加 feature flag、shadow mode。C++ 不動。</P>
          </>
        )}

        {/* ── Footer ── */}
        <div style={{ marginTop: 80, padding: "20px 0", borderTop: `1px solid ${T.border}`, fontSize: 13, color: T.textSec }}>
          給誰看：tech lead、架構師、需要理解 why 的人
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
 * Token 展示頁
 * ---------------------------------------------------------------------
 * 直接讀 tokens.css 的 CSS Variables 顯示，方便使用者視覺確認。
 * 這是預覽用的展示頁，不是正式元件。
 * ===================================================================== */

const COLOR_GROUPS: { title: string; vars: string[] }[] = [
  {
    title: "Qlo（品牌橘）",
    vars: [
      "--primitive-qlo-100",
      "--primitive-qlo-200",
      "--primitive-qlo-300",
      "--primitive-qlo-400",
      "--primitive-qlo-500",
      "--primitive-qlo-600-primary",
      "--primitive-qlo-700",
      "--primitive-qlo-800",
      "--primitive-qlo-900",
      "--primitive-qlo-1000",
    ],
  },
  {
    title: "Dark Blue",
    vars: [
      "--primitive-dark-blue-50",
      "--primitive-dark-blue-100",
      "--primitive-dark-blue-200",
      "--primitive-dark-blue-300",
      "--primitive-dark-blue-400",
      "--primitive-dark-blue-500",
      "--primitive-dark-blue-600-primary",
      "--primitive-dark-blue-700",
    ],
  },
  {
    title: "Grey",
    vars: [
      "--primitive-grey-0",
      "--primitive-grey-100",
      "--primitive-grey-200",
      "--primitive-grey-300",
      "--primitive-grey-400",
      "--primitive-grey-500",
      "--primitive-grey-600-primary",
      "--primitive-grey-700",
      "--primitive-grey-800",
      "--primitive-grey-900",
      "--primitive-grey-1000",
    ],
  },
];

const SEMANTIC: { name: string; var: string; chain: string }[] = [
  { name: "brand/dark", var: "--semantic-brand-dark", chain: "→ dark-blue-600-primary" },
  { name: "text/dark", var: "--semantic-text-dark", chain: "→ brand/dark" },
  { name: "brand/primary-grey", var: "--semantic-brand-primary-grey", chain: "→ grey-600-primary" },
  { name: "text/grey01", var: "--semantic-text-grey01", chain: "→ brand/primary-grey" },
  { name: "brand/primary", var: "--semantic-brand-primary", chain: "→ qlo-600-primary" },
  { name: "text/qlo-primary", var: "--semantic-text-qlo-primary", chain: "→ brand/primary" },
  { name: "brand/white", var: "--semantic-brand-white", chain: "→ grey-0" },
  { name: "text/white", var: "--semantic-text-white", chain: "→ brand/white" },
];

const RADII = ["--radius-small", "--radius-medium", "--radius-big"];
const PADDINGS = [
  "--padding-extra-small",
  "--padding-medium",
  "--padding-regular",
];

const TYPO: { cls: string; label: string }[] = [
  { cls: "text-title-semibold-28", label: "Title / SemiBold 28" },
  { cls: "text-title-semibold-24", label: "Title / SemiBold 24" },
  { cls: "text-title-semibold-20", label: "Title / SemiBold 20" },
  { cls: "text-subtitle-regular-17", label: "Subtitle / Regular 17" },
  { cls: "text-body-regular-16", label: "Body / Regular 16" },
  { cls: "text-body-regular-14", label: "Body / Regular 14" },
  { cls: "text-body-bold-16", label: "Body / Bold 16" },
  { cls: "text-button-text-semibold-18", label: "Button / SemiBold 18" },
  { cls: "text-button-text-semibold-16", label: "Button / SemiBold 16" },
  { cls: "text-button-text-semibold-12", label: "Button / SemiBold 12" },
  { cls: "text-deco-eyebrow-upercase", label: "Deco / Eyebrow Uppercase" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={sx.h2}>{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ token }: { token: string }) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
  return (
    <div style={sx.swatch}>
      <div style={{ ...sx.swatchColor, background: `var(${token})` }} />
      <div style={sx.swatchMeta}>
        <code style={sx.swatchName}>{token.replace("--primitive-", "")}</code>
        <span style={sx.swatchValue}>{value}</span>
      </div>
    </div>
  );
}

export default function TokenShowcase() {
  return (
    <div style={sx.page}>
      <h1 style={sx.h1}>🎨 Design Tokens</h1>
      <p style={sx.intro}>
        來源：Figma export 2026-07-20。以下直接讀 <code>tokens.css</code> 的 CSS Variables。
      </p>

      <Section title="顏色 · Primitives">
        {COLOR_GROUPS.map((g) => (
          <div key={g.title} style={{ marginBottom: 20 }}>
            <h3 style={sx.h3}>{g.title}</h3>
            <div style={sx.swatchGrid}>
              {g.vars.map((v) => (
                <Swatch key={v} token={v} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="顏色 · Semantic">
        <div style={sx.swatchGrid}>
          {SEMANTIC.map((s) => (
            <div key={s.var} style={sx.swatch}>
              <div style={{ ...sx.swatchColor, background: `var(${s.var})` }} />
              <div style={sx.swatchMeta}>
                <code style={sx.swatchName}>{s.name}</code>
                <span style={sx.swatchValue}>{s.chain}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="圓角 · Radius">
        <div style={sx.row}>
          {RADII.map((r) => (
            <div key={r} style={sx.specItem}>
              <div style={{ ...sx.radiusBox, borderRadius: `var(${r})` }} />
              <code style={sx.swatchName}>{r.replace("--radius-", "")}</code>
              <span style={sx.swatchValue}>
                {getComputedStyle(document.documentElement).getPropertyValue(r).trim()}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="間距 · Padding">
        <div style={sx.row}>
          {PADDINGS.map((p) => (
            <div key={p} style={sx.specItem}>
              <div style={sx.padTrack}>
                <div style={{ ...sx.padFill, width: `var(${p})`, height: `var(${p})` }} />
              </div>
              <code style={sx.swatchName}>{p.replace("--padding-", "")}</code>
              <span style={sx.swatchValue}>
                {getComputedStyle(document.documentElement).getPropertyValue(p).trim()}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="字體 · Typography">
        <p style={sx.note}>
          字型：Poppins（400/600）+ Space Mono（700），暫用 Google Fonts CDN 載入；
          之後可換為自托管字型檔。
        </p>
        <div style={sx.typoList}>
          {TYPO.map((t) => (
            <div key={t.cls} style={sx.typoRow}>
              <span style={sx.typoLabel}>{t.label}</span>
              <span className={t.cls}>Qlo 前端開發 Aa Bb 123</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

const sx: Record<string, React.CSSProperties> = {
  page: { padding: 32, maxWidth: 900, color: "#0b1220" },
  h1: { fontSize: 26, margin: "0 0 6px" },
  intro: { color: "#6d7b91", fontSize: 13, marginBottom: 28 },
  h2: { fontSize: 15, textTransform: "uppercase", letterSpacing: 0.5, color: "#4b566b", borderBottom: "1px solid #e5e5e5", paddingBottom: 6, marginBottom: 16 },
  h3: { fontSize: 13, color: "#6d7b91", margin: "0 0 8px" },
  swatchGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 },
  swatch: { display: "flex", flexDirection: "column", border: "1px solid #eee", borderRadius: 8, overflow: "hidden" },
  swatchColor: { height: 52, borderBottom: "1px solid #eee" },
  swatchMeta: { padding: "6px 8px", display: "flex", flexDirection: "column", gap: 2 },
  swatchName: { fontSize: 11, fontFamily: "monospace", color: "#2d3445" },
  swatchValue: { fontSize: 11, color: "#94a3b8" },
  row: { display: "flex", gap: 24, flexWrap: "wrap" },
  specItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  radiusBox: { width: 64, height: 64, background: "var(--primitive-qlo-600-primary)" },
  padTrack: { width: 64, height: 64, display: "flex", alignItems: "flex-start", background: "#f0f0f0", borderRadius: 4 },
  padFill: { background: "var(--primitive-qlo-600-primary)" },
  note: { fontSize: 12, color: "#b02300", background: "#fff1e6", padding: "8px 12px", borderRadius: 8, marginBottom: 16 },
  typoList: { display: "flex", flexDirection: "column", gap: 14 },
  typoRow: { display: "flex", alignItems: "baseline", gap: 16 },
  typoLabel: { width: 200, flexShrink: 0, fontSize: 11, color: "#94a3b8", fontFamily: "monospace" },
};

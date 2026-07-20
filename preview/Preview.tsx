import { createElement, useEffect, useMemo, useState } from "react";
import type { Control, PreviewModule, Story } from "./story";
import { registry } from "./registry";
import TokenShowcase from "./TokenShowcase";

/** 一個可調整的控制項 UI */
function ControlField({
  name,
  control,
  value,
  onChange,
}: {
  name: string;
  control: Control;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = control.label ?? name;
  return (
    <label style={S.field}>
      <span style={S.fieldLabel}>{label}</span>
      {control.type === "boolean" && (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      )}
      {control.type === "text" && (
        <input
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          style={S.input}
        />
      )}
      {control.type === "number" && (
        <input
          type="number"
          value={Number(value ?? 0)}
          min={control.min}
          max={control.max}
          step={control.step}
          onChange={(e) => onChange(Number(e.target.value))}
          style={S.input}
        />
      )}
      {control.type === "select" && (
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          style={S.input}
        >
          {control.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}

function Canvas({ mod }: { mod: PreviewModule }) {
  const [storyIndex, setStoryIndex] = useState(0);
  const story: Story = mod.stories[storyIndex] ?? { name: "Default" };

  const initialArgs = useMemo(
    () => ({ ...mod.meta.args, ...story.args }),
    [mod, story],
  );
  const [args, setArgs] = useState<Record<string, unknown>>(initialArgs);

  // 切換 story 時重置 args
  useEffect(() => setArgs(initialArgs), [initialArgs]);

  const controls = mod.meta.controls ?? {};

  // 受控元件在預覽裡要能互動：為每個 control 自動接一個 `on<Prop>Change`
  // callback，點擊/變更時把值寫回 args。少了這個，受控元件（如 FileRow 傳了
  // checked 給 Checkbox）會因為沒人更新狀態而「點了沒反應」。
  const handlers = useMemo(() => {
    const h: Record<string, (v: unknown) => void> = {};
    for (const key of Object.keys(controls)) {
      const handlerName = `on${key[0].toUpperCase()}${key.slice(1)}Change`;
      h[handlerName] = (v: unknown) => setArgs((a) => ({ ...a, [key]: v }));
    }
    return h;
  }, [controls]);

  return (
    <div style={S.canvasWrap}>
      <div style={S.storyTabs}>
        {mod.stories.map((st, i) => (
          <button
            key={st.name}
            onClick={() => setStoryIndex(i)}
            style={{
              ...S.storyTab,
              ...(i === storyIndex ? S.storyTabActive : {}),
            }}
          >
            {st.name}
          </button>
        ))}
      </div>

      <div style={S.stage}>
        {/* handlers 先鋪底，args/story 明確給的同名 callback 可覆蓋 */}
        {createElement(mod.meta.component, { ...handlers, ...args })}
      </div>

      {Object.keys(controls).length > 0 && (
        <div style={S.controls}>
          <div style={S.controlsTitle}>Controls</div>
          {Object.entries(controls).map(([name, control]) => (
            <ControlField
              key={name}
              name={name}
              control={control as Control}
              value={args[name]}
              onChange={(v) => setArgs((a) => ({ ...a, [name]: v }))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type Selection = "tokens" | number;

export default function Preview() {
  const [selected, setSelected] = useState<Selection>("tokens");
  const mod = typeof selected === "number" ? registry[selected] : undefined;

  // 依 registry 出現順序收集分組名稱（省略 group 者歸 "Components"）
  const groupOrder = useMemo(() => {
    const seen: string[] = [];
    for (const m of registry) {
      const g = m.meta.group ?? "Components";
      if (!seen.includes(g)) seen.push(g);
    }
    return seen;
  }, []);

  return (
    <div style={S.app}>
      <aside style={S.sidebar}>
        <div style={S.brand}>Qlo Preview</div>

        <div style={S.navGroupLabel}>Foundations</div>
        <button
          onClick={() => setSelected("tokens")}
          style={{
            ...S.navItem,
            ...(selected === "tokens" ? S.navItemActive : {}),
          }}
        >
          🎨 Design Tokens
        </button>

        {registry.length === 0 ? (
          <>
            <div style={S.navGroupLabel}>Components</div>
            <div style={S.empty}>尚無元件</div>
          </>
        ) : (
          groupOrder.map((group) => (
            <div key={group}>
              <div style={S.navGroupLabel}>{group}</div>
              {registry.map((m, i) =>
                (m.meta.group ?? "Components") === group ? (
                  <button
                    key={m.meta.title}
                    onClick={() => setSelected(i)}
                    style={{
                      ...S.navItem,
                      ...(selected === i ? S.navItemActive : {}),
                    }}
                  >
                    {m.meta.title}
                  </button>
                ) : null,
              )}
            </div>
          ))
        )}
      </aside>

      <main style={S.main}>
        {selected === "tokens" ? (
          <TokenShowcase />
        ) : mod ? (
          <Canvas mod={mod} />
        ) : (
          <div style={S.placeholder}>
            <h1 style={S.placeholderTitle}>👀 Qlo Design System Preview</h1>
            <p style={S.placeholderText}>選左側項目開始預覽。</p>
          </div>
        )}
      </main>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, 'Noto Sans TC', sans-serif",
    color: "#1a1a1a",
  },
  sidebar: {
    width: 220,
    borderRight: "1px solid #e5e5e5",
    padding: "16px 12px",
    background: "#fafafa",
  },
  brand: { fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: 0.5 },
  navItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 10px",
    border: "none",
    background: "transparent",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    marginBottom: 2,
  },
  navItemActive: { background: "#fff1e6", color: "#b02300", fontWeight: 600 },
  navGroupLabel: { fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6, color: "#94a3b8", margin: "14px 10px 4px" },
  empty: { color: "#999", fontSize: 13, padding: "8px 10px" },
  main: { flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflow: "auto" },
  placeholder: { margin: "auto", textAlign: "center", maxWidth: 420, padding: 24 },
  placeholderTitle: { fontSize: 20, marginBottom: 12 },
  placeholderText: { color: "#666", lineHeight: 1.7, fontSize: 14 },
  canvasWrap: { display: "flex", flexDirection: "column", flex: 1 },
  storyTabs: {
    display: "flex",
    gap: 4,
    padding: "10px 16px",
    borderBottom: "1px solid #e5e5e5",
  },
  storyTab: {
    padding: "4px 12px",
    border: "1px solid #e5e5e5",
    background: "#fff",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 12,
  },
  storyTabActive: { background: "#1a1a1a", color: "#fff", borderColor: "#1a1a1a" },
  stage: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    background:
      "repeating-conic-gradient(#f6f6f6 0% 25%, #fff 0% 50%) 50% / 20px 20px",
  },
  controls: { borderTop: "1px solid #e5e5e5", padding: 16, background: "#fafafa" },
  controlsTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#888",
    marginBottom: 10,
  },
  field: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
    fontSize: 13,
  },
  fieldLabel: { width: 120, color: "#555" },
  input: { padding: "4px 8px", border: "1px solid #ddd", borderRadius: 4, fontSize: 13 },
};

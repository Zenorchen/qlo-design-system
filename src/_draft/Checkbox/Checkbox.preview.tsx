import { Fragment, useState } from "react";
import type { PreviewModule } from "../../../preview/story";
import { Checkbox } from "./Checkbox";
import type { CheckboxColor, CheckboxStyleType } from "./Checkbox";

/* ============ 模組一：互動（點擊可勾/取消） ============ */
interface DemoProps {
  color?: CheckboxColor;
  styleType?: CheckboxStyleType;
}
function InteractiveCheckbox({ color = "black", styleType = "stroke" }: DemoProps) {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      color={color}
      styleType={styleType}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

export const CheckboxPreview: PreviewModule<DemoProps> = {
  meta: {
    title: "Checkbox",
    component: InteractiveCheckbox,
    controls: {
      color: { type: "select", label: "color", options: ["black", "grey", "red"] },
      styleType: { type: "select", label: "styleType", options: ["stroke", "filled"] },
    },
    args: { color: "black", styleType: "stroke" },
  },
  stories: [
    { name: "Black / Stroke", args: { color: "black", styleType: "stroke" } },
    { name: "Grey / Filled", args: { color: "grey", styleType: "filled" } },
    { name: "Red / Filled", args: { color: "red", styleType: "filled" } },
  ],
};

/* ============ 模組二：完整矩陣（color × style × 未勾/已勾；hover 移上去看光暈） ============ */
const COLORS: CheckboxColor[] = ["black", "grey", "red"];
const STYLES: CheckboxStyleType[] = ["stroke", "filled"];

function CheckboxMatrix() {
  return (
    <div style={{ padding: 8 }}>
      <p style={{ fontSize: 12, color: "#6d7b91", margin: "0 0 20px" }}>
        提示：滑鼠移到方框上看 hover 光暈。每組左為未勾、右為已勾。
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "90px repeat(2, 1fr)", gap: 20, alignItems: "center" }}>
        <div />
        {STYLES.map((s) => (
          <div key={s} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6, color: "#94a3b8" }}>{s}</div>
        ))}
        {COLORS.map((color) => (
          <Fragment key={color}>
            <div style={{ fontSize: 12, color: "#4b566b", fontFamily: "monospace" }}>{color}</div>
            {STYLES.map((styleType) => (
              <div key={`${color}-${styleType}`} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Checkbox color={color} styleType={styleType} checked={false} readOnly />
                <Checkbox color={color} styleType={styleType} checked readOnly />
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      <div style={{ marginTop: 28, borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6, color: "#94a3b8", marginBottom: 10 }}>
          disabled（Figma 未定義，token 推導）
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Checkbox color="black" styleType="stroke" checked={false} disabled readOnly />
          <Checkbox color="black" styleType="stroke" checked disabled readOnly />
          <Checkbox color="black" styleType="filled" checked={false} disabled readOnly />
          <Checkbox color="black" styleType="filled" checked disabled readOnly />
        </div>
      </div>
    </div>
  );
}

export const CheckboxGalleryPreview: PreviewModule = {
  meta: { title: "Checkbox / 完整矩陣", component: CheckboxMatrix },
  stories: [{ name: "Matrix" }],
};

import type { PreviewModule } from "../../../preview/story";
import { Button } from "./Button";
import type { ButtonColor, ButtonProps, ButtonSize, ButtonStyleType } from "./Button";

/* ============ 模組一：互動切換（單顆） ============ */
export const ButtonPreview: PreviewModule<ButtonProps> = {
  meta: {
    title: "Button",
    component: Button,
    controls: {
      color: { type: "select", label: "color", options: ["red", "black", "grey"] },
      styleType: { type: "select", label: "styleType", options: ["filled", "stroke", "clean", "link"] },
      size: { type: "select", label: "size", options: ["big", "medium", "small"] },
      children: { type: "text", label: "文字" },
      disabled: { type: "boolean", label: "disabled" },
    },
    args: { color: "red", styleType: "filled", size: "big", children: "Button", disabled: false },
  },
  stories: [
    { name: "Red / Filled", args: { color: "red", styleType: "filled", children: "Next" } },
    { name: "Grey / Stroke", args: { color: "grey", styleType: "stroke", children: "Back" } },
    { name: "Black / Filled", args: { color: "black", styleType: "filled", children: "Edit" } },
    { name: "Red / Clean", args: { color: "red", styleType: "clean", children: "Information" } },
    { name: "Disabled", args: { color: "red", styleType: "filled", children: "Next", disabled: true } },
  ],
};

/* ============ 模組二：完整矩陣（color × style × state；hover 直接移上去看） ============ */
const COLORS: ButtonColor[] = ["red", "black", "grey"];
const STYLES: ButtonStyleType[] = ["filled", "stroke", "clean", "link"];
const SIZE_LABEL: Record<ButtonSize, string> = { big: "big", medium: "medium", small: "small" };

function Cell({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>{children}</div>;
}

function ButtonMatrix() {
  return (
    <div style={{ padding: 4 }}>
      <p style={{ fontSize: 12, color: "#6d7b91", margin: "0 0 20px" }}>
        提示：滑鼠移到按鈕上看 hover、按住看 pressed。每組顯示 big / medium / small，最右為 disabled。
      </p>
      {COLORS.map((color) => (
        <div key={color} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6, color: "#94a3b8", marginBottom: 6 }}>
            color = {color}
          </div>
          {STYLES.map((styleType) => (
            <div
              key={styleType}
              style={{
                display: "grid",
                gridTemplateColumns: "90px repeat(3, auto) auto",
                alignItems: "center",
                gap: 4,
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <div style={{ fontSize: 12, color: "#4b566b", fontFamily: "monospace" }}>{styleType}</div>
              {(["big", "medium", "small"] as ButtonSize[]).map((size) => (
                <Cell key={size}>
                  <Button color={color} styleType={styleType} size={size} title={SIZE_LABEL[size]}>
                    Button
                  </Button>
                </Cell>
              ))}
              <Cell>
                <Button color={color} styleType={styleType} size="medium" disabled>
                  Disabled
                </Button>
              </Cell>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const ButtonGalleryPreview: PreviewModule = {
  meta: { title: "Button / 完整矩陣", component: ButtonMatrix },
  stories: [{ name: "Matrix" }],
};

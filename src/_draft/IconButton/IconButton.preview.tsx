import type { PreviewModule } from "../../../preview/story";
import { IconButton } from "./IconButton";
import type { IconButtonProps } from "./IconButton";
import { ICON_NAMES } from "../Icon/Icon";

/* ============ 模組一：互動切換（單顆） ============ */
export const IconButtonPreview: PreviewModule<IconButtonProps> = {
  meta: {
    title: "IconButton",
    component: IconButton,
    controls: {
      name: { type: "select", label: "name", options: ICON_NAMES as unknown as string[] },
      variant: { type: "select", label: "variant", options: ["regular", "solid"] },
      color: { type: "select", label: "color", options: ["dark", "grey"] },
      label: { type: "text", label: "label(a11y)" },
      disabled: { type: "boolean", label: "disabled" },
    },
    args: { name: "trash-can", variant: "regular", color: "dark", label: "刪除", disabled: false },
  },
  stories: [
    { name: "垃圾桶（hover 亮成橘）", args: { name: "trash-can", label: "刪除" } },
    { name: "編輯 / grey", args: { name: "pen", color: "grey", label: "編輯" } },
    { name: "更多 / solid", args: { name: "ellipsis", variant: "solid", label: "更多" } },
    { name: "Disabled", args: { name: "trash-can", label: "刪除", disabled: true } },
  ],
};

/* ============ 模組二：矩陣（color × variant × state；hover 直接移上去看） ============ */
const COLORS = ["dark", "grey"] as const;

function IconButtonMatrix() {
  return (
    <div style={{ padding: 4 }}>
      <p style={{ fontSize: 12, color: "#6d7b91", margin: "0 0 20px" }}>
        提示：滑鼠移上去看 hover（icon 亮成橘）、按住看 pressed、Tab 進來看 focus 橘框。最右為 disabled。
      </p>
      {COLORS.map((color) => (
        <div key={color} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6, color: "#94a3b8", marginBottom: 6 }}>
            color = {color}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
            <IconButton name="trash-can" variant="regular" color={color} label="刪除(regular)" />
            <IconButton name="trash-can" variant="solid" color={color} label="刪除(solid)" />
            <IconButton name="pen" variant="regular" color={color} label="編輯" />
            <IconButton name="box-archive" variant="regular" color={color} label="封存" />
            <IconButton name="ellipsis" variant="regular" color={color} label="更多" />
            <span style={{ width: 1, height: 28, background: "#eee" }} />
            <IconButton name="trash-can" color={color} label="刪除(disabled)" disabled />
          </div>
        </div>
      ))}
    </div>
  );
}

export const IconButtonGalleryPreview: PreviewModule = {
  meta: { title: "IconButton / 矩陣", component: IconButtonMatrix },
  stories: [{ name: "Matrix" }],
};

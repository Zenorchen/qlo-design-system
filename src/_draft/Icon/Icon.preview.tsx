import { Fragment } from "react";
import type { PreviewModule } from "../../../preview/story";
import { Icon, ICON_NAMES } from "./Icon";
import type { IconProps } from "./Icon";

/* ============ 模組一：互動切換（單顆） ============ */
export const IconPreview: PreviewModule<IconProps> = {
  meta: {
    title: "Icon",
    component: Icon,
    controls: {
      name: { type: "select", label: "name", options: ICON_NAMES as unknown as string[] },
      variant: { type: "select", label: "variant", options: ["regular", "solid"] },
      color: { type: "select", label: "color", options: ["dark", "grey", "inherit"] },
      size: { type: "number", label: "size(px)", min: 12, max: 96, step: 4 },
      title: { type: "text", label: "title(a11y)" },
    },
    args: { name: "trash-can", variant: "regular", color: "dark", size: 24 },
  },
  stories: [
    { name: "trash-can / regular", args: { name: "trash-can", variant: "regular" } },
    { name: "trash-can / solid", args: { name: "trash-can", variant: "solid" } },
    { name: "grey", args: { name: "pen", color: "grey" } },
    { name: "48px", args: { name: "check", size: 48 } },
  ],
};

/* ============ 模組二：完整 gallery（所有 icon × regular/solid × dark/grey） ============ */
function IconGallery() {
  return (
    <div style={{ padding: 4 }}>
      <p style={{ fontSize: 12, color: "#6d7b91", margin: "0 0 20px" }}>
        目前已納入 {ICON_NAMES.length} 個 icon（會慢慢補）。每列：regular / solid，左深(dark) 右灰(grey)。
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px repeat(4, auto) 1fr",
          alignItems: "center",
          gap: "10px 20px",
        }}
      >
        <div />
        <Head>regular · dark</Head>
        <Head>solid · dark</Head>
        <Head>regular · grey</Head>
        <Head>solid · grey</Head>
        <div />
        {ICON_NAMES.map((name) => (
          <Fragment key={name}>
            <code style={{ fontSize: 12, color: "#4b566b" }}>{name}</code>
            <Cell><Icon name={name} variant="regular" color="dark" /></Cell>
            <Cell><Icon name={name} variant="solid" color="dark" /></Cell>
            <Cell><Icon name={name} variant="regular" color="grey" /></Cell>
            <Cell><Icon name={name} variant="solid" color="grey" /></Cell>
            <div />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Head({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6, color: "#94a3b8" }}>
      {children}
    </div>
  );
}
function Cell({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>;
}

export const IconGalleryPreview: PreviewModule = {
  meta: { title: "Icon / 全部 icon", component: IconGallery },
  stories: [{ name: "Gallery" }],
};

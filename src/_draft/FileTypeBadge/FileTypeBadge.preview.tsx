import type { PreviewModule } from "../../../preview/story";
import { FileTypeBadge } from "./FileTypeBadge";
import type { FileTypeBadgeProps } from "./FileTypeBadge";

export const FileTypeBadgePreview: PreviewModule<FileTypeBadgeProps> = {
  meta: {
    title: "FileTypeBadge",
    component: FileTypeBadge,
    controls: {
      type: { type: "select", label: "type", options: ["PDF", "EML"] },
    },
    args: { type: "PDF" },
  },
  stories: [
    { name: "PDF", args: { type: "PDF" } },
    { name: "EML", args: { type: "EML" } },
  ],
};

/* 一覽：兩個固定值並排（文字固定，無極端值溢出問題） */
function BadgeGallery() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 8 }}>
      <FileTypeBadge type="PDF" />
      <FileTypeBadge type="EML" />
    </div>
  );
}

export const FileTypeBadgeGalleryPreview: PreviewModule = {
  meta: { title: "FileTypeBadge / 一覽", component: BadgeGallery },
  stories: [{ name: "All" }],
};

import type { PreviewModule } from "../../../preview/story";
import { UploadDropzone } from "./UploadDropzone";
import type { UploadDropzoneProps } from "./UploadDropzone";

export const UploadDropzonePreview: PreviewModule<UploadDropzoneProps> = {
  meta: {
    title: "UploadDropzone",
    component: UploadDropzone,
    controls: {
      title: { type: "text", label: "主標" },
      subtitle: { type: "text", label: "副標" },
      disabled: { type: "boolean", label: "disabled" },
    },
    args: {
      title: "Drag or Click to upload",
      subtitle: "Accept EML or PDF, Each file must not exceed 10mb",
      disabled: false,
    },
  },
  stories: [
    { name: "Default（虛線）" },
    { name: "Disabled", args: { disabled: true } },
    {
      name: "極端值：超長副標",
      args: {
        subtitle:
          "Accept EML or PDF only. Each single file must not exceed 10mb, and the total upload size across all attachments should remain reasonable.",
      },
    },
  ],
};

/* 提示：滑鼠移上去看 hover 填底；點擊會開啟檔案選擇器；可拖放檔案。 */
function UploadDropzoneGallery() {
  return (
    <div style={{ width: 640, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ fontSize: 12, color: "#6d7b91", margin: 0 }}>
        hover / 拖放中會填淺灰藍底；點擊開檔案選擇器；可直接拖檔案進來。
      </p>
      <UploadDropzone />
      <UploadDropzone disabled subtitle="disabled 狀態" />
    </div>
  );
}

export const UploadDropzoneGalleryPreview: PreviewModule = {
  meta: { title: "UploadDropzone / 一覽", component: UploadDropzoneGallery },
  stories: [{ name: "Gallery" }],
};

import type { PreviewModule } from "../../../preview/story";
import { FileRow } from "./FileRow";
import type { FileRowProps } from "./FileRow";

/* ============ 模組一：互動切換（單列） ============ */
export const FileRowPreview: PreviewModule<FileRowProps> = {
  meta: {
    title: "FileRow",
    component: FileRow,
    controls: {
      fileType: { type: "select", label: "fileType", options: ["PDF", "EML"] },
      name: { type: "text", label: "檔名" },
      detail: { type: "text", label: "說明（大小）" },
      selectable: { type: "boolean", label: "selectable（勾選框）" },
      checked: { type: "boolean", label: "checked" },
      deletable: { type: "boolean", label: "deletable（垃圾桶）" },
    },
    args: {
      fileType: "PDF",
      name: "2026-Q2-financial-report.pdf",
      detail: "2.4 MB",
      selectable: false,
      checked: false,
      deletable: false,
    },
  },
  stories: [
    { name: "一般（僅動作鈕）", args: { selectable: false, deletable: false } },
    { name: "編輯模式（勾選＋垃圾桶）", args: { selectable: true, deletable: true } },
    { name: "已勾選", args: { selectable: true, deletable: true, checked: true } },
    { name: "EML", args: { fileType: "EML", name: "invoice-thread.eml", detail: "88 KB" } },
    { name: "無說明", args: { detail: "" } },
  ],
};

/* ============ 模組二：狀態 / 極端值一覽 ============ */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          color: "#94a3b8",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function FileRowGallery() {
  return (
    <div style={{ padding: 4, maxWidth: 900 }}>
      <p style={{ fontSize: 12, color: "#6d7b91", margin: "0 0 20px" }}>
        提示：滑鼠移到整列上看 hover（外框轉深灰）。編輯模式才顯示勾選框與垃圾桶。
      </p>

      <Row label="一般（PDF）">
        <FileRow fileType="PDF" name="2026-Q2-financial-report.pdf" detail="2.4 MB" />
      </Row>

      <Row label="一般（EML）">
        <FileRow fileType="EML" name="invoice-thread.eml" detail="88 KB" />
      </Row>

      <Row label="編輯模式：可勾選＋可刪除">
        <FileRow fileType="PDF" name="contract-draft.pdf" detail="1.1 MB" selectable deletable />
      </Row>

      <Row label="編輯模式：已勾選">
        <FileRow fileType="PDF" name="contract-draft.pdf" detail="1.1 MB" selectable checked deletable />
      </Row>

      <Row label="極端值：超長無空白檔名 → 單行截斷 …">
        <FileRow
          fileType="PDF"
          name="this_is_an_extremely_long_filename_without_any_spaces_that_must_truncate_2026_final_v3.pdf"
          detail="12.8 MB"
          selectable
          deletable
        />
      </Row>

      <Row label="極端值：無說明（省略 detail）">
        <FileRow fileType="EML" name="note.eml" />
      </Row>

      <Row label="極端值：空檔名（不破版）">
        <FileRow fileType="PDF" name="" detail="0 KB" />
      </Row>
    </div>
  );
}

export const FileRowGalleryPreview: PreviewModule = {
  meta: { title: "FileRow / 狀態一覽", component: FileRowGallery },
  stories: [{ name: "Gallery" }],
};

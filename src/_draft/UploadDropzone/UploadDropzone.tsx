import { useRef, useState, type DragEvent } from "react";
import { Icon } from "../Icon/Icon";
import "./UploadDropzone.css";

/* UploadDropzone — 草稿區。1:1 對應 Figma node 99:2141（.upload）。
 * Figma 變體：Default（虛線框、透明底）/ hover（虛線框 + grey-100 底）。
 * 工程補齊互動：可點擊開檔案選擇器、可拖放；dragover 用 hover 底；focus 橘框；disabled。 */

export interface UploadDropzoneProps {
  /** 主標（Figma "Drag or Click to upload"） */
  title?: string;
  /** 副標（Figma 提示接受格式／大小） */
  subtitle?: string;
  /** 接受的檔案類型（傳給 <input accept>） */
  accept?: string;
  /** 是否可多選 */
  multiple?: boolean;
  disabled?: boolean;
  /** 選檔或拖放後回傳檔案清單 */
  onFiles?: (files: FileList) => void;
  className?: string;
}

export function UploadDropzone({
  title = "Drag or Click to upload",
  subtitle = "Accept EML or PDF, Each file must not exceed 10mb",
  accept = ".eml,.pdf",
  multiple = true,
  disabled = false,
  onFiles,
  className,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragover, setDragover] = useState(false);

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragover(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) onFiles?.(e.dataTransfer.files);
  }

  const cls = ["qlo-dropzone", dragover && "qlo-dropzone--dragover", className]
    .filter(Boolean)
    .join(" ");

  return (
    // display:contents wrapper → button 直接參與父層排版（拿到 width:100%），
    // 又能把互動用的 <input> 放在 button 之外（button 內不可包互動元素）。
    <div style={{ display: "contents" }}>
      <button
        type="button"
        className={cls}
        disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragover(true);
        }}
        onDragLeave={() => setDragover(false)}
      >
        <Icon
          name="arrow-up-from-bracket"
          size={16}
          color="inherit"
          className="qlo-dropzone__icon"
          aria-hidden
        />
        <span className="qlo-dropzone__title text-body-bold-16">{title}</span>
        <span className="qlo-dropzone__subtitle text-subtitle-regular-16">{subtitle}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => {
          if (e.target.files?.length) onFiles?.(e.target.files);
          e.target.value = ""; // 允許重選同一檔
        }}
      />
    </div>
  );
}

export default UploadDropzone;

import "./FileTypeBadge.css";

/** 固定列舉的檔案類型（依 Figma node 27:638，文字值固定不開放自由輸入） */
export type FileType = "PDF" | "EML";

export interface FileTypeBadgeProps {
  /** 檔案類型；顯示文字由它決定 */
  type: FileType;
  className?: string;
}

export function FileTypeBadge({ type, className }: FileTypeBadgeProps) {
  const cls = ["qlo-file-badge", "text-deco-eyebrow-upercase", className]
    .filter(Boolean)
    .join(" ");
  return <span className={cls}>{type}</span>;
}

export default FileTypeBadge;

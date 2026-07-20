import { useRef, useState } from "react";
import { Title } from "../../_draft/Title/Title";
import { Card } from "../../_draft/Card/Card";
import { UploadDropzone } from "../../_draft/UploadDropzone/UploadDropzone";
import { FileRow } from "../../_draft/FileRow/FileRow";
import type { FileType } from "../../_draft/FileTypeBadge/FileTypeBadge";
import { PageFooter } from "../../_draft/PageFooter/PageFooter";
import { Button } from "../../_draft/Button/Button";
import { Icon } from "../../_draft/Icon/Icon";
// 沿用 0720 Demo 的版面 class（.attachment-page / __list / __dropzone-fill）
import "../AttachmentPage/AttachmentPage.css";

/* AttachmentFlow（0720 Demo · 互動版）— 真的能操作的完整體驗：
 *  - 預設 list：可上傳（帶入檔案的值）、看清單
 *  - 點 Edit → edit 模式：每列有勾選框 + 垃圾桶，點垃圾桶刪除該項
 *  - 點 Done → 回 list，清單反映實際刪除後的值
 * 組裝既有草稿元件；狀態全在本元件內。 */

interface FileItem {
  id: number;
  type: FileType;
  name: string;
  size: string;
}

/** 位元組 → 人類可讀（對齊 Figma 用小寫 kb/mb） */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} b`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} kb`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} mb`;
}

/** 副檔名 → 徽章類型（FileTypeBadge 只有 PDF / EML，非 eml 一律當 PDF） */
function typeFromName(name: string): FileType {
  return name.toLowerCase().endsWith(".eml") ? "EML" : "PDF";
}

// 互動版預設空清單：Default 只顯示 drag 上傳框，值全部來自實際上傳。
const SEED: Omit<FileItem, "id">[] = [];

export function AttachmentFlow() {
  const [mode, setMode] = useState<"list" | "edit">("list");
  const idRef = useRef(SEED.length);
  // 編輯模式「+ File」按鈕用：點了開檔案選擇器，行為對齊 dropzone 的 click to upload
  const addInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileItem[]>(() =>
    SEED.map((f, i) => ({ ...f, id: i })),
  );
  // 勾選中的項目 id（受控），供「一次刪除已勾選」用
  const [checked, setChecked] = useState<Set<number>>(() => new Set());

  function handleFiles(list: FileList) {
    const added: FileItem[] = Array.from(list).map((f) => ({
      id: idRef.current++,
      type: typeFromName(f.name),
      name: f.name,
      size: formatSize(f.size),
    }));
    setFiles((prev) => [...prev, ...added]);
  }

  function toggleChecked(id: number, on: boolean) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function deleteFile(id: number) {
    const next = files.filter((f) => f.id !== id);
    setFiles(next);
    setChecked((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
    if (next.length === 0) setMode("list"); // 刪光 → 回到最初的空畫面
  }

  // 一次刪除所有已勾選的項目
  function deleteChecked() {
    const next = files.filter((f) => !checked.has(f.id));
    setFiles(next);
    setChecked(new Set());
    if (next.length === 0) setMode("list"); // 刪光 → 回到最初的空畫面
  }

  // 切換模式時清掉勾選，避免殘留
  function switchMode(next: "list" | "edit") {
    setChecked(new Set());
    setMode(next);
  }

  const isEdit = mode === "edit";
  const isEmpty = files.length === 0;

  const sectionAction = isEdit ? (
    <div className="attachment-page__header-actions">
      {/* Delete / File 一組：等寬（對齊較寬的 Delete）、彼此間距 2px */}
      <div className="attachment-page__edit-actions">
        <Button
          color="black"
          styleType="link"
          size="small"
          leadingIcon={<Icon name="trash-can" size={14} color="inherit" aria-hidden />}
          onClick={deleteChecked}
          disabled={checked.size === 0}
        >
          Delete
        </Button>
        <Button
          color="black"
          styleType="link"
          size="small"
          leadingIcon={<Icon name="plus" size={14} color="inherit" aria-hidden />}
          onClick={() => addInputRef.current?.click()}
        >
          File
        </Button>
      </div>
      <Button
        color="black"
        styleType="filled"
        size="small"
        leadingIcon={<Icon name="check" size={14} color="inherit" aria-hidden />}
        onClick={() => switchMode("list")}
      >
        Done
      </Button>
    </div>
  ) : isEmpty ? undefined : (
    // 一開始沒東西時整顆隱藏 Edit（不是 disable）
    <Button
      color="black"
      styleType="filled"
      size="small"
      leadingIcon={<Icon name="pen" size={14} color="inherit" aria-hidden />}
      onClick={() => switchMode("edit")}
    >
      Edit
    </Button>
  );

  return (
    <div className="attachment-page">
      <Title
        size="large"
        title="Background Information Upload"
        detail="step  6 / 7 , almost there"
        action={
          <Button
            color="black"
            styleType="clean"
            size="medium"
            leadingIcon={<Icon name="circle-info" size={16} color="inherit" aria-hidden />}
          >
            Information
          </Button>
        }
      />

      <Card className="attachment-page__card">
        <Title size="small" title="Attachment" detail="EML, PDF only" showIcon={false} action={sectionAction} />

        {/* list 模式才可上傳；清單空的時候把 dropzone 撐大（empty 體驗） */}
        {!isEdit && (
          <UploadDropzone
            onFiles={handleFiles}
            className={isEmpty ? "attachment-page__dropzone-fill" : "attachment-page__dropzone"}
          />
        )}

        {!isEmpty && (
          <div className="attachment-page__list attachment-page__list--scroll">
            {files.map((f) =>
              isEdit ? (
                <FileRow
                  key={f.id}
                  fileType={f.type}
                  name={f.name}
                  detail={f.size}
                  selectable
                  checked={checked.has(f.id)}
                  onCheckedChange={(v) => toggleChecked(f.id, v)}
                  deletable
                  onDelete={() => deleteFile(f.id)}
                />
              ) : (
                <FileRow key={f.id} fileType={f.type} name={f.name} detail={f.size} />
              ),
            )}
          </div>
        )}
      </Card>

      {/* 「+ File」按鈕觸發的隱藏 input，accept/multiple 對齊 UploadDropzone */}
      <input
        ref={addInputRef}
        type="file"
        accept=".eml,.pdf"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
          e.target.value = ""; // 允許重選同一檔
        }}
      />

      <PageFooter label="2026 Q2" />
    </div>
  );
}

export default AttachmentFlow;

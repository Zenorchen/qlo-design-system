import type { ChangeEvent, MouseEvent } from "react";
import { FileTypeBadge, type FileType } from "../FileTypeBadge/FileTypeBadge";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import "./FileRow.css";

/* FileRow — 草稿區。1:1 對應 Figma node 27:1405（item/cell）。
 * 組裝既有元件：FileTypeBadge + Checkbox + Button(View/Detail) + IconButton(trash)。
 * Figma 變體：Default / hover（差在外框色 grey-200 → grey-500）；
 * 三個顯示開關：showCheckbox / showMoreDetail / showIconTrashCan → 這裡命名為 selectable / detail / deletable。 */

export interface FileRowProps {
  /** 檔案類型徽章（PDF / EML） */
  fileType: FileType;
  /** 檔名（mainText）。過長時單行截斷 …（見憲法 6.4）。 */
  name: string;
  /** 次要說明，通常是檔案大小（moreDetail）。省略則不顯示。 */
  detail?: string;

  /** 編輯模式：左側顯示勾選框（Figma showCheckbox）。 */
  selectable?: boolean;
  /** 勾選狀態（受控）。 */
  checked?: boolean;
  /** 勾選變更。 */
  onCheckedChange?: (checked: boolean) => void;

  /** 編輯模式：右側顯示垃圾桶刪除鈕（Figma showIconTrashCan）。 */
  deletable?: boolean;
  /** 點刪除。 */
  onDelete?: () => void;

  /** 點 View 動作鈕。 */
  onView?: () => void;
  /** 點 Detail 動作鈕。 */
  onDetail?: () => void;

  className?: string;
}

export function FileRow({
  fileType,
  name,
  detail,
  selectable = false,
  checked,
  onCheckedChange,
  deletable = false,
  onDelete,
  onView,
  onDetail,
  className,
}: FileRowProps) {
  const cls = ["qlo-file-row", selectable && "qlo-file-row--selectable", className]
    .filter(Boolean)
    .join(" ");

  // 編輯模式：整條 row 可點切換勾選，但點在勾選框／View／Detail／垃圾桶上時
  // 交給各自的 handler，不重複觸發。
  function handleRowClick(e: MouseEvent<HTMLDivElement>) {
    if (!selectable) return;
    if (
      (e.target as HTMLElement).closest(
        ".qlo-file-row__checkbox, .qlo-file-row__actions, .qlo-file-row__trash",
      )
    )
      return;
    onCheckedChange?.(!checked);
  }

  return (
    <div className={cls} onClick={handleRowClick}>
      {selectable && (
        <Checkbox
          className="qlo-file-row__checkbox"
          color="grey"
          styleType="stroke"
          checked={checked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onCheckedChange?.(e.target.checked)}
          aria-label={`選取 ${name}`}
        />
      )}

      <FileTypeBadge type={fileType} className="qlo-file-row__badge" />

      <div className="qlo-file-row__info">
        {/* 檔名：過長單行截斷 …（filename 常是無空白長字串） */}
        <span className="qlo-file-row__name text-body-bold-16" title={name}>
          {name}
        </span>
        {detail && (
          <span className="qlo-file-row__detail text-body-regular-14" title={detail}>
            {detail}
          </span>
        )}
      </div>

      <div className="qlo-file-row__actions">
        <Button color="grey" styleType="stroke" size="small" onClick={onView}>
          View
        </Button>
        <Button color="grey" styleType="stroke" size="small" onClick={onDetail}>
          Detail
        </Button>
      </div>

      {deletable && (
        <IconButton
          className="qlo-file-row__trash"
          name="trash-can"
          color="grey"
          label={`刪除 ${name}`}
          onClick={onDelete}
        />
      )}
    </div>
  );
}

export default FileRow;

import { useState } from "react";
import { Title } from "../../_draft/Title/Title";
import { Card } from "../../_draft/Card/Card";
import { UploadDropzone } from "../../_draft/UploadDropzone/UploadDropzone";
import { FileRow } from "../../_draft/FileRow/FileRow";
import type { FileType } from "../../_draft/FileTypeBadge/FileTypeBadge";
import { PageFooter } from "../../_draft/PageFooter/PageFooter";
import { Button } from "../../_draft/Button/Button";
import { Icon } from "../../_draft/Icon/Icon";
import "./AttachmentPage.css";

/* AttachmentPage（0720 Demo）— 用既有元件組裝的示範畫面。
 * 對應 Figma node 27:3398「Attachment」，三態：Default / empty / edit。
 * ⚠️ 目前組裝的元件多在草稿區（_draft），尚未轉正式；macOS 視窗框（WindowFrame）
 *    依 COMPONENT-BACKLOG 延後，本 demo 先不畫。 */

export type AttachmentPageState = "default" | "empty" | "edit";

interface FileItem {
  type: FileType;
  name: string;
  size: string;
}

const FILES: FileItem[] = [
  { type: "EML", name: "Company BBB", size: "105 kb" },
  { type: "PDF", name: "Company CCC", size: "320 kb" },
  { type: "PDF", name: "Company DDD", size: "452 kb" },
  { type: "PDF", name: "Company EEE", size: "155 kb" },
  { type: "PDF", name: "Company FFF", size: "205 kb" },
  { type: "PDF", name: "Company FFF", size: "205 kb" },
];

const EDIT_FILES: FileItem[] = [
  { type: "PDF", name: "Company AAA", size: "413 kb" },
  { type: "EML", name: "Company BBB", size: "105 kb" },
  { type: "PDF", name: "Company CCC", size: "269 kb" },
  { type: "PDF", name: "Company DDD", size: "452 kb" },
  { type: "PDF", name: "Company EEE", size: "200 kb" },
  { type: "PDF", name: "Company FFF", size: "200 kb" },
  { type: "PDF", name: "Company FFF", size: "200 kb" },
];

export interface AttachmentPageProps {
  state?: AttachmentPageState;
}

export function AttachmentPage({ state = "default" }: AttachmentPageProps) {
  const isEdit = state === "edit";
  // edit demo：預設勾選 BBB、CCC（index 1、2）
  const [checked, setChecked] = useState<Set<number>>(() => new Set([1, 2]));

  const sectionAction = isEdit ? (
    <Button
      color="black"
      styleType="filled"
      size="small"
      leadingIcon={<Icon name="check" size={14} color="inherit" aria-hidden />}
    >
      Done
    </Button>
  ) : state === "empty" ? undefined : (
    // 空的時候不顯示 Edit（不是 disable，是整顆隱藏）
    <Button
      color="black"
      styleType="filled"
      size="small"
      leadingIcon={<Icon name="pen" size={14} color="inherit" aria-hidden />}
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

        {state === "empty" && (
          <UploadDropzone className="attachment-page__dropzone-fill" />
        )}

        {state === "default" && (
          <>
            <UploadDropzone />
            <div className="attachment-page__list">
              {FILES.map((f, i) => (
                <FileRow key={i} fileType={f.type} name={f.name} detail={f.size} />
              ))}
            </div>
          </>
        )}

        {state === "edit" && (
          <div className="attachment-page__list attachment-page__list--scroll">
            {EDIT_FILES.map((f, i) => (
              <FileRow
                key={i}
                fileType={f.type}
                name={f.name}
                detail={f.size}
                selectable
                deletable
                checked={checked.has(i)}
                onCheckedChange={(v) =>
                  setChecked((prev) => {
                    const next = new Set(prev);
                    if (v) next.add(i);
                    else next.delete(i);
                    return next;
                  })
                }
              />
            ))}
          </div>
        )}
      </Card>

      <PageFooter label="2026 Q2" />
    </div>
  );
}

export default AttachmentPage;

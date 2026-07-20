/* =====================================================================
 * 預覽註冊表
 * ---------------------------------------------------------------------
 * 這裡登記所有要在預覽中顯示的元件 preview 模組。
 * 每做好一個元件（草稿或正式），就在這裡加一行。
 * ===================================================================== */

import type { PreviewModule } from "./story";
import { ButtonPreview, ButtonGalleryPreview } from "../src/_draft/Button/Button.preview";
import { FileTypeBadgePreview, FileTypeBadgeGalleryPreview } from "../src/_draft/FileTypeBadge/FileTypeBadge.preview";
import { CheckboxPreview, CheckboxGalleryPreview } from "../src/_draft/Checkbox/Checkbox.preview";
import { IconPreview, IconGalleryPreview } from "../src/_draft/Icon/Icon.preview";
import { IconButtonPreview, IconButtonGalleryPreview } from "../src/_draft/IconButton/IconButton.preview";
import { FileRowPreview, FileRowGalleryPreview } from "../src/_draft/FileRow/FileRow.preview";
import { UploadDropzonePreview, UploadDropzoneGalleryPreview } from "../src/_draft/UploadDropzone/UploadDropzone.preview";
import { TitlePreview, TitleGalleryPreview } from "../src/_draft/Title/Title.preview";
import { CardPreview } from "../src/_draft/Card/Card.preview";
import { PageFooterPreview } from "../src/_draft/PageFooter/PageFooter.preview";
import { AttachmentPagePreview } from "../src/screens/AttachmentPage/AttachmentPage.preview";
import { AttachmentFlowPreview } from "../src/screens/AttachmentFlow/AttachmentFlow.preview";

export const registry: PreviewModule[] = [
  ButtonPreview as unknown as PreviewModule,
  ButtonGalleryPreview,
  FileTypeBadgePreview as unknown as PreviewModule,
  FileTypeBadgeGalleryPreview,
  CheckboxPreview as unknown as PreviewModule,
  CheckboxGalleryPreview,
  IconPreview as unknown as PreviewModule,
  IconGalleryPreview,
  IconButtonPreview as unknown as PreviewModule,
  IconButtonGalleryPreview,
  FileRowPreview as unknown as PreviewModule,
  FileRowGalleryPreview,
  UploadDropzonePreview as unknown as PreviewModule,
  UploadDropzoneGalleryPreview,
  TitlePreview as unknown as PreviewModule,
  TitleGalleryPreview,
  CardPreview,
  PageFooterPreview as unknown as PreviewModule,
  // ---- Page Demo（0720 Demo）----
  AttachmentPagePreview as unknown as PreviewModule,
  AttachmentFlowPreview,
];

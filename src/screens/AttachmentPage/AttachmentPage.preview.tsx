import type { PreviewModule } from "../../../preview/story";
import { AttachmentPage } from "./AttachmentPage";
import type { AttachmentPageProps } from "./AttachmentPage";

/* 0720 Demo — Background Information Upload 流程（Figma node 27:3398）。
 * 放在側欄「Page Demo」分組（與 Foundations / Components 同層）。 */
export const AttachmentPagePreview: PreviewModule<AttachmentPageProps> = {
  meta: {
    title: "0720 Demo",
    group: "Page Demo",
    component: AttachmentPage,
    controls: {
      state: { type: "select", label: "state", options: ["default", "empty", "edit"] },
    },
    args: { state: "default" },
  },
  stories: [
    { name: "Default（有檔案）", args: { state: "default" } },
    { name: "Empty（空）", args: { state: "empty" } },
    { name: "Edit（編輯）", args: { state: "edit" } },
  ],
};

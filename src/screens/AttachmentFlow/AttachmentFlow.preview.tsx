import type { PreviewModule } from "../../../preview/story";
import { AttachmentFlow } from "./AttachmentFlow";

/* 0720 Demo（互動）— 可真的上傳（帶入檔案的值）、Edit 進刪除模式、垃圾桶刪項、Done 回清單。
 * 放在側欄「Page Demo」分組。無 controls：狀態全在畫面內。 */
export const AttachmentFlowPreview: PreviewModule = {
  meta: {
    title: "0720 Demo（互動）",
    group: "Page Demo",
    component: AttachmentFlow,
  },
  stories: [{ name: "互動：上傳 / 編輯 / 刪除" }],
};

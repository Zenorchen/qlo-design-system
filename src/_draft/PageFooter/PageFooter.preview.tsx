import type { PreviewModule } from "../../../preview/story";
import { PageFooter } from "./PageFooter";
import type { PageFooterProps } from "./PageFooter";

export const PageFooterPreview: PreviewModule<PageFooterProps> = {
  meta: {
    title: "PageFooter",
    component: PageFooter,
    controls: {
      label: { type: "text", label: "label" },
      backLabel: { type: "text", label: "backLabel" },
      nextLabel: { type: "text", label: "nextLabel" },
      nextDisabled: { type: "boolean", label: "nextDisabled" },
    },
    args: { label: "2026 Q2", backLabel: "Back", nextLabel: "Next", nextDisabled: false },
  },
  stories: [
    { name: "Default" },
    { name: "Next disabled", args: { nextDisabled: true } },
  ],
};

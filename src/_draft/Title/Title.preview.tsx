import type { PreviewModule } from "../../../preview/story";
import { Title } from "./Title";
import type { TitleProps } from "./Title";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

const EditBtn = (
  <Button color="black" styleType="filled" size="small" leadingIcon={<Icon name="pen" size={14} color="inherit" aria-hidden />}>
    Edit
  </Button>
);
const InfoBtn = (
  <Button color="black" styleType="clean" size="medium" leadingIcon={<Icon name="circle-info" size={16} color="inherit" aria-hidden />}>
    Information
  </Button>
);

export const TitlePreview: PreviewModule<TitleProps> = {
  meta: {
    title: "Title",
    component: Title,
    controls: {
      title: { type: "text", label: "title" },
      detail: { type: "text", label: "detail" },
      size: { type: "select", label: "size", options: ["large", "small"] },
      showIcon: { type: "boolean", label: "showIcon" },
      showDetail: { type: "boolean", label: "showDetail" },
    },
    args: { title: "Title", detail: "more detail", size: "small", showIcon: true, showDetail: true },
  },
  stories: [
    { name: "Large（頁首）", args: { size: "large", title: "Background Information Upload", detail: "step  6 / 7 , almost there", action: InfoBtn } },
    { name: "Small（區塊）", args: { size: "small", title: "Attachment", detail: "EML, PDF only", action: EditBtn } },
    { name: "極端值：超長標題", args: { size: "small", title: "A very very long section title that should wrap onto multiple lines without breaking the layout", action: EditBtn } },
    { name: "無 icon / 無 detail", args: { size: "small", title: "Attachment", showIcon: false, showDetail: false } },
  ],
};

function TitleGallery() {
  return (
    <div style={{ width: 760, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 28 }}>
      <Title size="large" title="Background Information Upload" detail="step  6 / 7 , almost there" action={InfoBtn} />
      <Title size="small" title="Attachment" detail="EML, PDF only" action={EditBtn} />
    </div>
  );
}

export const TitleGalleryPreview: PreviewModule = {
  meta: { title: "Title / 一覽", component: TitleGallery },
  stories: [{ name: "Gallery" }],
};

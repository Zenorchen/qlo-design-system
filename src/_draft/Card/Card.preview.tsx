import type { PreviewModule } from "../../../preview/story";
import { Card } from "./Card";
import { Title } from "../Title/Title";
import { FileRow } from "../FileRow/FileRow";

function CardDemo() {
  return (
    <div style={{ width: 720, maxWidth: "100%" }}>
      <Card>
        <Title size="small" title="Attachment" detail="EML, PDF only" />
        <FileRow fileType="PDF" name="Company CCC" detail="320 kb" />
        <FileRow fileType="EML" name="Company BBB" detail="105 kb" />
      </Card>
    </div>
  );
}

export const CardPreview: PreviewModule = {
  meta: { title: "Card", component: CardDemo },
  stories: [{ name: "白底卡片" }],
};

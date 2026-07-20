import { Button } from "../Button/Button";
import "./PageFooter.css";

/* PageFooter — 草稿區。1:1 對應 Figma node 85:1860（頁尾）。
 * 左：期別文字（如 2026 Q2）；右：Back（grey/stroke/big）+ Next（red/filled/big）。 */

export interface PageFooterProps {
  /** 左側說明文字（如 "2026 Q2"） */
  label?: string;
  backLabel?: string;
  nextLabel?: string;
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  className?: string;
}

export function PageFooter({
  label = "2026 Q2",
  backLabel = "Back",
  nextLabel = "Next",
  onBack,
  onNext,
  nextDisabled = false,
  className,
}: PageFooterProps) {
  const cls = ["qlo-page-footer", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {label && (
        <span className="qlo-page-footer__label text-subtitle-regular-17">{label}</span>
      )}
      <div className="qlo-page-footer__actions">
        <Button color="grey" styleType="stroke" size="big" onClick={onBack}>
          {backLabel}
        </Button>
        <Button
          color="red"
          styleType="filled"
          size="big"
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}

export default PageFooter;

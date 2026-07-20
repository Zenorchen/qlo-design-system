import type { ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import type { IconName } from "../Icon/icons";
import "./Title.css";

/* Title — 草稿區。1:1 對應 Figma node 27:2427。
 * 一個元件、兩個尺寸：
 *   - large（Figma size2）：icon 32 + 標題 28 → 當「頁首大標」（PageHeader）
 *   - small：icon 24 + 標題 20 → 當「卡片區塊標題」（SectionHeader）
 * 左：icon + 標題/副標；右：action 插槽（傳入 Button，如 Edit / Done / Information）。 */

export type TitleSize = "large" | "small";

export interface TitleProps {
  /** 主標題 */
  title: string;
  /** 副標（more detail）；省略或 showDetail=false 則不顯示 */
  detail?: string;
  showDetail?: boolean;
  /** 是否顯示左側 icon（預設 box-archive） */
  showIcon?: boolean;
  /** 左側 icon 名稱（預設 box-archive） */
  icon?: IconName;
  /** 尺寸：large（頁首）/ small（區塊標題） */
  size?: TitleSize;
  /** 右側動作插槽（通常放一顆 Button） */
  action?: ReactNode;
  className?: string;
}

export function Title({
  title,
  detail = "more detail",
  showDetail = true,
  showIcon = true,
  icon = "box-archive",
  size = "small",
  action,
  className,
}: TitleProps) {
  const cls = ["qlo-title", `qlo-title--${size}`, !showIcon && "qlo-title--no-icon", className]
    .filter(Boolean)
    .join(" ");

  // large：標題 20；small：標題 16。副標兩尺寸皆 16。皆引用現有字級 token。
  const titleClass =
    size === "large" ? "text-title-semibold-20" : "text-title-semibold-16";
  const detailClass = "text-subtitle-regular-16";

  return (
    <div className={cls}>
      {showIcon && (
        <Icon
          name={icon}
          size={size === "large" ? 28 : 20}
          color="dark"
          className="qlo-title__icon"
          aria-hidden
        />
      )}
      <div className="qlo-title__text">
        <span className={`qlo-title__heading ${titleClass}`} title={title}>
          {title}
        </span>
        {showDetail && detail && (
          <span className={`qlo-title__detail ${detailClass}`}>{detail}</span>
        )}
      </div>
      {action && <div className="qlo-title__action">{action}</div>}
    </div>
  );
}

export default Title;

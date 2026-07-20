import type { ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import type { IconName, IconVariant } from "../Icon/icons";
import "./IconButton.css";

export type { IconName, IconVariant } from "../Icon/icons";

/** 預設態的 icon 顏色（hover 一律轉 primary 橘）。 */
export type IconButtonColor = "dark" | "grey";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** icon 名稱 */
  name: IconName;
  /** icon 樣式：regular / solid（預設 regular） */
  variant?: IconVariant;
  /** 預設態顏色（預設 dark；hover 轉橘） */
  color?: IconButtonColor;
  /**
   * 無障礙必填：icon-only 按鈕的可讀名稱（沒有可見文字時，螢幕報讀器靠這個）。
   * 例：label="刪除"。
   */
  label: string;
}

export function IconButton({
  name,
  variant = "regular",
  color = "dark",
  label,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  const cls = ["qlo-icon-btn", `qlo-icon-btn--${color}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={cls} aria-label={label} title={label} {...rest}>
      {/* Icon 用 inherit，讓顏色與 hover 由按鈕統一控制 */}
      <Icon name={name} variant={variant} color="inherit" aria-hidden />
    </button>
  );
}

export default IconButton;

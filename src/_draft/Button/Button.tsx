import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

/** 對應 Figma 的三個軸（node 36:5816） */
export type ButtonColor = "red" | "black" | "grey";
export type ButtonStyleType = "filled" | "stroke" | "clean" | "link";
export type ButtonSize = "big" | "medium" | "small";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** 顏色軸（Figma: color） */
  color?: ButtonColor;
  /** 樣式軸（Figma: style；因 `style` 為 HTML 保留屬性，改名 styleType） */
  styleType?: ButtonStyleType;
  /** 尺寸軸（Figma: size） */
  size?: ButtonSize;
  /** 前置圖示（Figma 內建 icon 已略過，這裡保留可選插槽供實際畫面使用） */
  leadingIcon?: ReactNode;
  /** 後置圖示 */
  trailingIcon?: ReactNode;
}

/** size → 字級 token（tokens.css 的 utility class） */
const TYPO_BY_SIZE: Record<ButtonSize, string> = {
  big: "text-button-text-medium-16",
  medium: "text-button-text-medium-14",
  small: "text-button-text-medium-12",
};

export function Button({
  color = "red",
  styleType = "filled",
  size = "big",
  leadingIcon,
  trailingIcon,
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const cls = [
    "qlo-btn",
    `qlo-btn--${color}`,
    `qlo-btn--${styleType}`,
    `qlo-btn--${size}`,
    TYPO_BY_SIZE[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={cls} {...rest}>
      {leadingIcon && <span className="qlo-btn__icon">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="qlo-btn__icon">{trailingIcon}</span>}
    </button>
  );
}

export default Button;

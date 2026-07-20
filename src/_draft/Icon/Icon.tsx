import type { SVGProps } from "react";
import { ICON_PATHS, ICON_VIEWBOXES, type IconName, type IconVariant } from "./icons";
import "./Icon.css";

export type { IconName, IconVariant } from "./icons";
export { ICON_NAMES } from "./icons";

/** 預設顏色軸。
 *  - dark：深色（Figma #0B1220，接 --semantic-text-dark）
 *  - grey：灰色（接 --semantic-text-grey01）
 *  - inherit：不自帶顏色，跟著父層 color（IconButton 用這個，好讓 hover 由按鈕統一控制）
 *  ⚠️ dark / grey 的 token 名待使用者的新 token 確認（見 icon.figma-spec.md）。 */
export type IconColor = "dark" | "grey" | "inherit";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  /** icon 名稱（見 icons.ts 的 IconName） */
  name: IconName;
  /** 樣式軸：regular（外框）/ solid（實心） */
  variant?: IconVariant;
  /** 顏色（預設 dark） */
  color?: IconColor;
  /** 尺寸：CSS 長度字串或數字(px)。省略時用 CSS 預設 24px（建置轉 rem）。 */
  size?: number | string;
  /** 有語意時傳 label → svg 具可讀名稱；省略時視為裝飾性（aria-hidden） */
  title?: string;
}

export function Icon({
  name,
  variant = "regular",
  color = "dark",
  size,
  title,
  className,
  style,
  ...rest
}: IconProps) {
  const path = ICON_PATHS[name]?.[variant];
  const viewBox = ICON_VIEWBOXES[name] ?? "0 0 24 24";
  const cls = ["qlo-icon", `qlo-icon--${color}`, className].filter(Boolean).join(" ");
  const sizeVar =
    size != null
      ? ({ "--qlo-icon-size": typeof size === "number" ? `${size}px` : size } as React.CSSProperties)
      : undefined;

  return (
    <svg
      className={cls}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={sizeVar ? { ...sizeVar, ...style } : style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {path ? <path d={path} fill="currentColor" /> : null}
    </svg>
  );
}

export default Icon;

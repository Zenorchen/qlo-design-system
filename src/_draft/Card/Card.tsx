import type { HTMLAttributes } from "react";
import "./Card.css";

/* Card — 草稿區。1:1 對應 Figma node 36:9660（card）。
 * 白底、圓角、細灰邊 + 柔和陰影的容器。內容由 children 傳入。 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...rest }: CardProps) {
  const cls = ["qlo-card", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

export default Card;

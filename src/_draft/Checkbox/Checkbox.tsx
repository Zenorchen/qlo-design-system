import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import "./Checkbox.css";

/** 對應 Figma 的兩個外觀軸（node 27:1545） */
export type CheckboxColor = "black" | "grey" | "red";
export type CheckboxStyleType = "stroke" | "filled";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "color" | "size"> {
  /** 顏色軸（Figma: color） */
  color?: CheckboxColor;
  /** 樣式軸（Figma: style；`style` 為 HTML 保留字，改名 styleType） */
  styleType?: CheckboxStyleType;
  /**
   * 是否勾選（受控）。傳了它 → 受控，狀態交給父層管（如 FileRow）。
   * 沒傳 → 非受控，元件自己記狀態、點擊即切換打勾／空白。
   */
  checked?: boolean;
  /** 非受控模式的初始勾選狀態（僅在未傳 `checked` 時有效） */
  defaultChecked?: boolean;
}

/** 勾勾圖示（Figma icon_check，16px，用 currentColor 上色） */
function CheckIcon() {
  return (
    <svg
      className="qlo-checkbox__check"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

export function Checkbox({
  color = "black",
  styleType = "stroke",
  checked,
  defaultChecked = false,
  disabled,
  className,
  onChange,
  ...rest
}: CheckboxProps) {
  // 有傳 checked → 受控；否則元件自己記狀態（非受控）
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e);
  }

  const cls = [
    "qlo-checkbox",
    `qlo-checkbox--${color}`,
    `qlo-checkbox--${styleType}`,
    disabled && "qlo-checkbox--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={cls}>
      <input
        type="checkbox"
        className="qlo-checkbox__input"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span className="qlo-checkbox__box">{isChecked && <CheckIcon />}</span>
    </label>
  );
}

export default Checkbox;

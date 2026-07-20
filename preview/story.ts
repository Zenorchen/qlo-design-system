/* =====================================================================
 * 輕量預覽的型別定義（對齊 Storybook CSF 精神）
 * ---------------------------------------------------------------------
 * 每個元件寫一個 `*.preview.tsx`，export 一個 default 的 meta，
 * 以及若干 named 的 story。未來要轉正式 Storybook 時，
 * 只要把這些 meta/story 對應到 `*.stories.tsx` 即可，不用重寫邏輯。
 * ===================================================================== */

import type { ComponentType } from "react";

/** 一個可調整的控制項（對齊 Storybook 的 argTypes） */
export type Control =
  | { type: "boolean"; label?: string }
  | { type: "text"; label?: string }
  | { type: "number"; label?: string; min?: number; max?: number; step?: number }
  | { type: "select"; label?: string; options: string[] };

/** 元件層級的 meta（對齊 Storybook 的 default export） */
export interface Meta<P = Record<string, unknown>> {
  /** 顯示在側邊欄的名稱，可用 "分組/元件" 形式 */
  title: string;
  /** 側邊欄分組（與 Foundations / Components 同層）；省略則歸在 "Components" */
  group?: string;
  component: ComponentType<P>;
  /** 每個 prop 對應的控制項 */
  controls?: Partial<Record<keyof P, Control>>;
  /** 預設 args */
  args?: Partial<P>;
}

/** 單一 story（對齊 Storybook 的 named export） */
export interface Story<P = Record<string, unknown>> {
  name: string;
  args?: Partial<P>;
}

/** 一個 preview 模組的形狀 */
export interface PreviewModule<P = Record<string, unknown>> {
  meta: Meta<P>;
  stories: Story<P>[];
}

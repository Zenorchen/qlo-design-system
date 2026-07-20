# Qlo Design System

> 這是一份會逐步累積、可交付給其他專案重用的設計系統文件。
> 每當有元件或 Token「轉正式」，這裡就會同步更新。

**目前版本狀態**：🎨 已確定 Design Tokens（顏色 / 字級 / 間距 / 圓角）；尚無正式元件

---

## 目錄

1. [設計原則](#設計原則)
2. [Design Tokens](#design-tokens)
3. [元件庫（Components）](#元件庫components)
4. [使用方式](#使用方式)

---

## 設計原則

_（待補：等第一批 Token 與畫面進來後，一起歸納出原則）_

---

## Design Tokens

- 來源：Figma export 2026-07-20，變數命名與 Figma 1:1。
- 落地檔案：[`src/tokens/tokens.css`](./src/tokens/tokens.css)（原生 CSS Variables）。
- 規則：**值由 Figma 匯出，不手改**；要改請從 Figma 重新匯出後重生。

### 顏色 · Primitives（Color）

**Qlo（品牌橘）**

| Token | 值 |
|-------|-----|
| `--primitive-qlo-100` | `#fff1e6` |
| `--primitive-qlo-200` | `#ffd4b8` |
| `--primitive-qlo-300` | `#ffb88f` |
| `--primitive-qlo-400` | `#ff9966` |
| `--primitive-qlo-500` | `#ff773d` |
| `--primitive-qlo-600-primary` | `#fd5215` |
| `--primitive-qlo-700` | `#d63706` |
| `--primitive-qlo-800` | `#b02300` |
| `--primitive-qlo-900` | `#8a1700` |
| `--primitive-qlo-1000` | `#630d00` |

**Dark Blue**

| Token | 值 |
|-------|-----|
| `--primitive-dark-blue-50` | `#94a3b8` |
| `--primitive-dark-blue-100` | `#5b5e61` |
| `--primitive-dark-blue-200` | `#4f5154` |
| `--primitive-dark-blue-300` | `#3b4047` |
| `--primitive-dark-blue-400` | `#272f3b` |
| `--primitive-dark-blue-500` | `#171f2e` |
| `--primitive-dark-blue-600-primary` | `#0b1220` |
| `--primitive-dark-blue-700` | `#000000` |

**Grey**

| Token | 值 |
|-------|-----|
| `--primitive-grey-0` | `#ffffff` |
| `--primitive-grey-100` | `#e9f1f7` |
| `--primitive-grey-200` | `#dde4eb` |
| `--primitive-grey-300` | `#d1d7de` |
| `--primitive-grey-400` | `#c5cbd1` |
| `--primitive-grey-500` | `#b9bec4` |
| `--primitive-grey-600-primary` | `#94a3b8` |
| `--primitive-grey-700` | `#6d7b91` |
| `--primitive-grey-800` | `#4b566b` |
| `--primitive-grey-900` | `#2d3445` |
| `--primitive-grey-1000` | `#14171f` |

### 顏色 · Semantic

> 語意色是「用途 → 別名鏈 → primitive」。2026-07-20 新 Color export 新增 `brand/dark`、`brand/primary-grey` 兩個中介色，並把 `text/base01` 改名為 `text/dark`。

| 語意 Token | 指向 | 解析值 |
|-----------|------|--------|
| `--semantic-brand-dark` | `--primitive-dark-blue-600-primary` | `#0b1220` |
| `--semantic-text-dark` | `--semantic-brand-dark` | `#0b1220` |
| `--semantic-brand-primary-grey` | `--primitive-grey-600-primary` | `#94a3b8` |
| `--semantic-text-grey01` | `--semantic-brand-primary-grey` | `#94a3b8` |
| `--semantic-brand-primary` | `--primitive-qlo-600-primary` | `#fd5215` |
| `--semantic-text-qlo-primary` | `--semantic-brand-primary` | `#fd5215` |
| `--semantic-brand-white` | `--primitive-grey-0` | `#ffffff` |
| `--semantic-text-white` | `--semantic-brand-white` | `#ffffff` |

### 字級 / 字重（Typography）

字型：**Poppins**（400 / 600）+ **Space Mono**（700）。
目前用 Google Fonts CDN 載入（`index.html`），未來可換自托管字型檔。
以 utility class 提供，定義於 `tokens.css`：

| Class | 字型 / 字重 / 字級 |
|-------|-----|
| `.text-title-semibold-28` | Poppins 600 / 28px |
| `.text-title-semibold-24` | Poppins 600 / 24px |
| `.text-title-semibold-20` | Poppins 600 / 20px |
| `.text-subtitle-regular-17` | Poppins 400 / 17px |
| `.text-body-regular-16` | Poppins 400 / 16px |
| `.text-body-regular-14` | Poppins 400 / 14px |
| `.text-body-bold-16` | Poppins 600 / 16px |
| `.text-button-text-semibold-18` | Poppins 600 / 18px |
| `.text-button-text-semibold-16` | Poppins 600 / 16px |
| `.text-button-text-semibold-12` | Poppins 600 / 12px |
| `.text-deco-eyebrow-upercase` | Space Mono 700 / 12.5px / UPPERCASE |

### 間距 · Padding

| Token | 值 |
|-------|-----|
| `--padding-extra-small` | `4px` |
| `--padding-medium` | `8px` |
| `--padding-regular` | `16px` |

### 圓角 · Radius

| Token | 值 |
|-------|-----|
| `--radius-small` | `8px` |
| `--radius-medium` | `12px` |
| `--radius-big` | `16px` |

### 陰影（Shadow）
_（Figma 匯出中尚無，待日後提供）_

> 📌 已知小事（不影響使用，供追蹤）：`--primitive-dark-blue-50` 與 `--primitive-grey-600-primary` 皆為 `#94a3b8`（重複值）；`--primitive-dark-blue-700` 為純黑 `#000000`。

---

## 元件庫（Components）

> 只列「正式區（`src/components/`）」中已確定的元件。

_（尚無正式元件）_

<!--
每個元件轉正式時，用以下格式補一段：

### ComponentName
- **用途**：一句話說明
- **檔案**：`src/components/ComponentName/`
- **Props / Variants**：
  | 屬性 | 型別 | 預設 | 說明 |
  |------|------|------|------|
- **狀態（States）**：default / hover / ...
- **使用範例**：
  ```tsx
  <ComponentName ... />
  ```
-->

---

## 使用方式

_（待補：安裝、引入 tokens、引入元件的步驟，等有第一個元件後補上）_

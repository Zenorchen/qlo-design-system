# Icon / IconButton — figma-spec（草稿）

> 依憲法 §七.2：把「來源、對應、推斷、待確認」列清楚，在預覽讓使用者目視確認。

## 來源
- **Icon**：使用者上傳的 SVG（Figma「Font Awesome 風格：Sharp」icon set，node 24:1364，24×24）。
- **IconButton**：Figma **無**對應設計，依使用者口述「參考垃圾桶、hover 亮成橘色」＋工程補齊狀態。

## Icon

### 檔名 → variant 對應（已確認）
| 檔案 | variant |
|------|---------|
| `icon_X.svg` | `regular`（外框） |
| `icon_X-1.svg` | `solid`（實心） |

### 目前已納入（5 個，會慢慢補）
`box-archive`、`check`、`ellipsis`、`pen`、`trash-can`（各 regular + solid）。
新增方式：把該 icon 的兩個 `d` 加進 `icons.ts` 的 `ICON_PATHS`。

### 顏色（✅ token 名已確定，2026-07-20 新 Color export）
- 原檔 fill = `#0B1220`。元件不寫死，改用 `currentColor`。
- 兩個預設色軸：
  - `dark` → `--semantic-text-dark`（Semantic/Text/Dark → Brand/Dark → dark-blue-600-primary #0b1220）
  - `grey` → `--semantic-text-grey01`（Semantic/Text/Grey01 → Brand/Primary Grey → grey-600-primary #94a3b8）
  - `inherit` → 跟父層（IconButton 用）

### 尺寸
- 預設 `24px`（CSS，建置由 PostCSS 轉 rem）。可用 `size` prop 以 `--qlo-icon-size` 覆寫。

### a11y
- 有 `title` → `role="img"` + `aria-label` + `<title>`；無 → `aria-hidden`（裝飾性）。

## IconButton（外觀多為推斷／待設計確認）

| 項目 | 值 | 狀態 |
|------|-----|------|
| 底色 | 透明（使用者選「純變色」） | 已確認 |
| 預設 icon 色 | `dark`（base01）/ `grey`（grey01） | 已確認方向、token 名待確認 |
| **hover** | icon → `--semantic-brand-primary`（橘） | ✅ 使用者指定 |
| focus（鍵盤） | 2px 橘框 offset 2px（沿用 Button/Checkbox） | 推斷 |
| pressed / active | icon → `--primitive-qlo-700`（較深橘） | 推斷 |
| disabled | icon → `--primitive-grey-300`、not-allowed | 推斷 |
| 圓角 | `--radius-medium`（12px，沿用 Button） | 推斷 |
| padding | `--padding-medium`（8px） | 推斷 |
| tap target | `min 44px`（憲法 6.5，結構性） | 工程規範 |
| label | icon-only → `label` 必填（aria-label） | 工程規範 |

> 尚未做「尺寸軸」（size s/m/l）—— 架構先建立，之後再補（使用者指示）。

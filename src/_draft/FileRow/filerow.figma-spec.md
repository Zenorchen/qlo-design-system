# FileRow — Figma 對照規格

- **Figma**：node `27:1405`（`item/cell`），檔案 `Design System - Qlo`。
- **變體**：`Property 1 = Default`（27:1235）/ `hover`（27:1624），皆 1752×80。
- **顯示開關**（Figma 布林 prop）：`showCheckbox` / `showMoreDetail` / `showIconTrashCan`。
- **做法**：組裝既有草稿元件，本元件只負責排版；值全部用現有 token，**無新增 token**。

## 結構（由左到右）

| Figma 節點 | 用途 | 對應元件 | 設定 |
|---|---|---|---|
| Checkbox 27:1568 | 編輯模式勾選 | `Checkbox` | `color="grey" styleType="stroke"` |
| usage/attachment 27:639 | 檔案類型徽章 | `FileTypeBadge` | `type`（PDF/EML） |
| mainText 27:646 | 檔名 | 純文字 | `.text-body-bold-16` / `text-dark` |
| moreDetail 27:649 | 次要說明（大小） | 純文字 | `.text-body-regular-14` / `grey01` |
| button 36:7180 | View | `Button` | `color="grey" styleType="stroke" size="small"` |
| button 36:7678 | Detail | `Button` | 同上 |
| icon_trash_can 27:1252 | 刪除 | `IconButton` | `name="trash-can"` |

## 容器樣式

| 屬性 | Figma | 落地 |
|---|---|---|
| display | auto-layout 橫向 | `flex; align-items:center` |
| gap | 16 | `--padding-regular` |
| 圓角 | Radius/Medium 12 | `--radius-medium` |
| 外框（Default） | 1px `Primitive/Grey/200` | `--primitive-grey-200` |
| 外框（hover） | 1px `Primitive/Grey/500` | `:hover` → `--primitive-grey-500` |
| 高度 | 固定 80 | `min-height:80px`（見下推斷） |
| padding | px-16 py-24 | `8px 16px`（見下推斷） |
| 背景 | 白 | `--primitive-grey-0` |

## 推斷 / 待確認

1. **高度 vs 垂直內距衝突**：Figma 同時標 `height:80`（固定）與 `py-24`；固定高會覆蓋內距（子項 View/Detail 鈕本身 42 高）。
   為符合憲法 6.3（不用固定死高裁切）與 6.5（放大字體要撐得開），落地用 `min-height:80` + `padding:8px 16px`，內容置中，視覺與 80px 列一致。**待設計確認**取捨。
2. **trash 顏色**：Figma trash 為圖片向量、無法讀色碼；依整列灰調（badge/detail/按鈕皆 grey 系）推斷用 `IconButton color="grey"`（hover 轉橘，沿用 IconButton 既定行為）。**待設計確認**。
3. **trash 尺寸/點擊區**：Figma 為裸 24px icon；改用 `IconButton`（含 8px 內距、tap≥44px）以符合 a11y。視覺 icon 仍 24px。
4. **View / Detail 是否可關**：Figma 兩鈕恆顯示（無顯示開關），故本元件恆顯示 View + Detail，只提供 `onView` / `onDetail`。若日後需可關再加。
5. **檔名截斷**：Figma `mainText` 為 `shrink-0 + nowrap + max-w-1300`；為處理超長 / 無空白檔名（憲法 6.4），改為可縮 + 單行截斷 `…`。`detail` 過長由容器裁切。

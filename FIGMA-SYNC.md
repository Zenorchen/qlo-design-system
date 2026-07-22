# Figma 回饋清單（Figma Sync Backlog）

> 開發過程中，程式碼這邊對 Token / 樣式做的調整、或發現 Figma 該補的東西，
> 都累積在這裡。最後一次整理交給設計端更新 Figma，讓兩邊一致。

## 目前狀態

**程式碼是 source of truth。** 2026-07-22 已把 tokens 與 Button 由程式碼導回 Figma，
並完成一次尺度收斂（4pt 基準格線）。兩端命名一致，Dev Mode 可對應。

| | 位置 |
|---|---|
| 程式碼 | `src/tokens/tokens.css` |
| Figma | https://www.figma.com/design/8Et5mg5NDTlDPxFH6GHtbA |
| 線上 demo | https://zenorchen.github.io/qlo-design-system/ |

Figma 檔內容：Primitives 29 + Semantic 8 + Scale 16 = **53 個變數**、**12 個 Text Style**、
Button **36 個 variant**（Color × Style × Size）。

---

## 尺度現況（收斂後）

```
spacing        2 · 4 · 8 · 12 · 16 · 24 · 32 · 48      （2 為格線例外，見下）
size/control   sm 28 · md 32 · lg 40                   （Button / IconButton 共用）
radius         small 8 · medium 12 · big 16
border-width   hairline 0.5 · default 1
typography     Title 24/20/18/16 · Subtitle 16 · Body 16/14 · Button 16/14/12 · Deco
```

---

## 待設計端確認

| # | 類型 | 項目 | 說明 | 狀態 |
|---|------|------|------|------|
| A1 | 尺度決策 | **spacing 命名採純數值** | 原 `padding/extra-small(4)·medium(8)·regular(16)` 已移除：命名大小順序矛盾（regular > medium），且三階不夠用，逼得元件硬寫 12/24/48。改為 `--spacing-{2,4,8,12,16,24,32,48}`。請 Figma 沿用同一套，勿再回頭用 t-shirt 命名。 | 已套用 |
| A2 | 格線例外 | `spacing-2` | 2px 不在 4pt 格線上，**僅供「緊鄰成組」的元素**（目前只有編輯列的 Delete / File 群組）。Figma 文件已標註。請勿擴大使用。 | 已套用 |
| A3 | 移除破格值 | `spacing 6` / `spacing 10` | 這兩個值不是設計決策，是被元件反推出來的（6 來自 Title small row-gap、10 來自 Button big padding-y）。已移除，用處分別改為 4 與 8。 | 已套用 |
| A4 | 新尺度 | **`size/control`（28/32/40）** | 原本 Button 38/32/28、IconButton 44、各自為政，並排時對不齊。抽出共用高度尺度，未來 Input / Select / Badge 一律沿用。 | 已套用 |
| A5 | ⚠️ 觸控尺寸 | **desktop-first 宣告** | `size/control` 全部低於 Apple HIG 44 / Material 48 的觸控建議。**這是刻意的**：Qlo 是固定 1040px 寬、滑鼠操作的桌面 web app（Figma 自家產品 UI 按鈕也才 32）。若日後要上平板／觸控裝置，需另開一組 density 把尺寸放大，不要直接沿用這套。 | 待設計確認 |
| A6 | 尺寸縮小 | **IconButton 44 → 32** | 為了與同列 Button 等高（FileRow 的垃圾桶原本比旁邊 View/Detail 大一圈）。實作上除了改 min-height，還把 padding 由 8 收到 4（icon 24 + 4×2 = 32），否則內容會把高度撐到 40。**代價是可點擊面積縮小**，與 A5 同一個取捨。 | 待設計確認 |
| A7 | 邊框寬度 | Button stroke `1.2px` → `1px` | 1.2px 在 1x 螢幕會被反鋸齒成模糊灰邊，且它存在的唯一理由是「stroke 按鈕不位移」（現已改為所有按鈕都掛 1px 透明邊框）。 | 已套用 |
| A8 | 邊框限用 | `border-width/hairline`（0.5） | Retina 上合理（Apple 分隔線做法），**但 1x 螢幕會消失**。限用於分隔線／卡片外框，勿用於互動元件。目前僅 Card 使用。 | 已套用 |
| A9 | 圓角收斂 | **Card 圓角 10 → 12** | 10 只因 Figma 該張卡片標了 10，不在 8/12/16 尺度內（Material 3 shape scale 也沒有 10）。視覺上與 12 幾乎無差。`radius/card` 已刪除。 | 待設計確認 |
| 3 | 命名 Token | button hover tint | stroke/clean hover 底 `rgba(255,212,184,.5)`（= Qlo/200 @ 50%）是裸 rgba，無命名變數。建議 Figma 建語意 token（如 `semantic/state/hover-tint`）。程式用 `color-mix(qlo-200 50%)`。 | 待確認 |
| 5 | 新增狀態 | Button `pressed / active` | Figma 只有 Default/hover/disable。程式用 token 推導：filled→red `qlo-700`／black `dark-blue-700`／grey `grey-900`；stroke·clean→紅 `qlo-200@80%`、黑灰 `grey-300`(stroke)/`grey-600`(clean)。請正式定義。 | 待設計確認 |
| 6 | 新增狀態 | Button `focus`（鍵盤） | Figma 未定義。程式用橘色 2px 外框（`brand-primary`, offset 2px）供無障礙。 | 待設計確認 |
| A10 | 新樣式 | **Button `link`** | Figma 無此樣式。需求為「icon 與字緊靠、hover 整體轉品牌橘、無底色方塊」。實作：無底無框、左右 padding 歸零貼合內容、hover `color: brand-primary`（icon 用 currentColor 一起變色）。目前用於 Delete / File / Information。 | 待設計確認 |
| A11 | 狀態未建模 | Button hover / pressed / disabled 未做成 Figma variant | 36 個 variant 已是 Color×Style×Size；再乘狀態會爆到 108+。狀態只寫在 Figma 的元件說明面板裡。若設計端要完整狀態矩陣，需討論拆法。 | 待設計確認 |
| 9 | 命名 Token | Checkbox grey filled 底 `#f2f7fe` | **唯一剩下的裸 hex**。black 用 grey-100、red 用 qlo-100，唯 grey 無對應色階。建議 Figma 補一個灰藍淺底 primitive。 | 待確認 |
| 10 | 新增狀態 | Checkbox `disabled` / `focus` | Figma 只有 default/selected/hover。已補 disabled（邊框/勾勾 grey-300、底 grey-100、not-allowed）與 focus 橘框，皆 token 推導。 | 待設計確認 |
| 12 | 新元件 | **IconButton**（Figma 無此設計） | icon-only 按鈕，依口述「參考垃圾桶、hover 亮成橘」。工程補齊 focus/pressed/disabled。尺寸見 A6。 | 待設計確認 |
| 14 | 尺寸衝突 | **FileRow** 高度 vs 內距 | node 27:1405 同時標 `height:80` 與 `py-24`，固定高會覆蓋內距。程式用 `min-height:80` + `padding:8px 16px`。請確認取捨。 | 待設計確認 |
| 15 | 顏色推斷 | **FileRow** trash 顏色 | Figma trash 為圖片向量、讀不到色碼，依整列灰調推斷用 grey（hover 轉橘）。 | 待設計確認 |
| 17 | 缺 token | **Card 陰影** | `2px 3px 12px 2px rgba(197,203,209,.12), 0 0 20px rgba(148,163,184,.06)` 仍是**裸 rgba，無 shadow token**（圓角與邊框已收斂，見 A9/A8）。建議 Figma 補第一個 effect/shadow token。 | 待設計確認 |
| 18 | 新 icon | `arrow-up-from-bracket`、`circle-info`、`plus` | 由 Figma 匯出 SVG 加進 registry。前兩者原檔非 24×24（22.4×26.1 / 12.8×12.8），已用 `ICON_VIEWBOXES` 覆寫，且皆單一造型（regular=solid）。請確認 icon 尺寸是否統一到 24。 | 待處理 |
| A12 | 未 token 化 | **Button `min-width: 68px`** | 收斂後**唯一**還硬寫的尺寸值，兩端（程式碼與 Figma）都是裸 68。不在 4pt 格線上。建議收斂到 64 或 72，或建一個 `size/button-min-width`。 | 待設計確認 |
| A13 | 未 token 化 | Page Demo 版面值 | `1040px` 頁寬、`90vh` 頁高、`32px` 左右內距、Footer 按鈕 `88px`。屬 demo 專屬結構值，**刻意不 token 化**。 | 已套用 |

## 字級調整（與 Figma 原稿有出入）

| # | 項目 | 說明 | 狀態 |
|---|------|------|------|
| T1 | **移除 Title 28** | 頁面大標 28 太大。Title 尺度現為 24 / 20 / 18 / 16（18 為本次新增）。Figma 的 `Title/Semibold_28` 應一併移除。 | 待設計確認 |
| T2 | **移除 Subtitle 17** | 17 不成體系，全部併入 16。Title 副標、UploadDropzone 副標、PageFooter label 皆改用 `subtitle-regular-16`。 | 待設計確認 |
| T3 | **Button 字級 18/16/12 → 16/14/12** | 原 big 18 過大。 | 待設計確認 |
| T4 | **Button 字重 SemiBold(600) → Medium(500)** | 視覺過重。token 已正名為 `text-button-text-medium-*`，並在 `index.html` 補載 Poppins 500（原只載 400/600，設 500 會 fallback 回 400）。 | 待設計確認 |
| T5 | Title 尺寸 | large 標題 20（icon 24）／small 標題 16（icon 20），副標兩者皆 16。Title 版面由 flex 改 grid，**icon 與標題那一行垂直置中**。 | 待設計確認 |

## 已完成／已解決

| # | 項目 | 結果 |
|---|------|------|
| 1 | `--primitive-grey-0: #ffffff` | ✅ 已建立，Figma 端同步 |
| 2 | `--semantic-text-qlo-primary` | ✅ 已補上 |
| 4 | Button stroke 1.2px | ✅ 見 A7，已改 1px |
| 7 | Button 內距／高度缺 token | ✅ 見 A1/A4，已全部 token 化（除 A12） |
| 8 | `--semantic-base02` 裸值 | ✅ 已移除，改用 `--semantic-text-dark` |
| 11 | Icon 顏色 token 名 | ✅ `--semantic-text-dark` / `--semantic-text-grey01` |
| 13 | `text/base01` → `text/dark` | ✅ 已遷移，相容別名已移除 |
| 16 | 0720 Demo 一批非 token 間距 | ✅ 見 A1，全部納入 spacing 尺度 |
| 19 · 20 · 21 | 舊的尺寸微調記錄 | ✅ 已被本次收斂取代，見 A1–A9 與 T1–T5 |

## 開發中觀察（待確認是否要動 Figma）

| # | 觀察 | 說明 |
|---|------|------|
| A | 重複色值 | `dark-blue-50` 與 `grey-600-primary` 皆為 `#94a3b8`。 |
| B | 純黑 | `dark-blue-700` = `#000000`。 |
| C | Button clean hover 不一致 | red 的 clean hover 底用淺色 `qlo-200@50%`，black/grey 卻用較深的 `grey-500`；而 stroke hover 三色都用淺色。疑似筆誤，請確認。 |
| D | Checkbox 黑色勾勾色 | checkmark 是圖片資產，無法讀出色碼，目前用 `--semantic-text-dark`。 |
| E | Primitives 的 scopes 設空 | Figma 端刻意讓 Primitives 不出現在選色器，設計師只看得到 Semantic 層。這是防呆，請勿改回 ALL_SCOPES。 |

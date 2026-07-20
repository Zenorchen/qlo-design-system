# Figma 回饋清單（Figma Sync Backlog）

> 開發過程中，程式碼這邊對 Token / 樣式做的調整、或發現 Figma 該補的東西，
> 都累積在這裡。最後一次整理交給設計端更新 Figma，讓兩邊一致。

## 待同步到 Figma

| # | 類型 | 項目 | 說明 | 狀態 |
|---|------|------|------|------|
| 1 | 新增 Token | `--primitive-grey-0: #ffffff` | 在 Grey 群組新增白色（白最淺 = 0）；語意色 `brand-white` 改引用它。Figma 端也應新增這個變數。 | 待處理 |
| 2 | 補 Token | `--semantic-text-qlo-primary: #fd5215` | Figma 有 `Semantic/Text/Qlo Primary`，但先前 `tokens.css` export 遺漏。已手動補上，請確認之後 export 會含它。 | 待處理 |
| 3 | 命名 Token | button hover tint | Figma 的 stroke/clean hover 底 `rgba(255,212,184,.5)`（= Qlo/200 @ 50%）是裸 rgba，沒有命名變數。建議在 Figma 建一個語意 token（如 `semantic/state/hover-tint`）。程式暫用 `color-mix(qlo-200 50%)`。 | 待確認 |
| 4 | 邊框寬度 | Button stroke `1.2px` | 非 token 的邊框寬度。要不要納入 token 尺度？ | 待確認 |
| 5 | 新增狀態 | Button `pressed / active` | Figma 只有 Default/hover/disable，缺按下態。程式暫用 token 推導較深值：filled→red `qlo-700`/black `dark-blue-700`/grey `grey-900`；stroke·clean→紅 `qlo-200@80%`、黑灰 `grey-300`(stroke)/`grey-600`(clean)。請設計端在 Figma 正式定義。 | 待設計確認 |
| 6 | 新增狀態 | Button `focus`（鍵盤） | Figma 未定義。程式加了橘色 2px 外框（`brand-primary`, offset 2px）供無障礙。請設計端確認樣式。 | 待設計確認 |
| 7 | 缺尺寸 token | Button 內距／高度 | Button 用到的內距（24/16/14/12）、高度（52/44/42）、min-width 68、邊框 1.2 都**不在現有 token 尺度**（間距只有 4/8/16）。建議在 Figma 補一套間距／元件尺寸 token，程式才能完全不寫死。目前照 Figma 值撰寫、建置轉 rem。 | 待設計確認 |
| 8 | ~~補 Token~~ | `--semantic-base02: #03071a` | ✅ 已移除：使用者不採用這種無規劃的裸值。Checkbox 黑勾改用 `--semantic-text-dark` #0b1220。 | 已移除 |
| 9 | 命名 Token | Checkbox grey filled 底 `#f2f7fe` | grey 的 filled 底色是**裸 hex `#f2f7fe`**，沒有對應 primitive/token（black 用 grey-100、red 用 qlo-100，唯 grey 例外）。建議 Figma 補一個灰藍淺底 token。程式暫用元件層級變數。 | 待確認 |
| 10 | 新增狀態 | Checkbox `disabled` / `focus` | Figma 只有 default/selected/hover。已補：**disabled**（中性樣式：邊框 grey-300、勾勾 grey-300、filled 底 grey-100、無 hover 光暈、not-allowed）、**focus** 橘框。皆 token 推導，請設計端在 Figma 正式定義。 | 待設計確認 |
| 11 | ~~確認 Token 名~~ | Icon 顏色 `dark` / `grey01` | ✅ 已解決：新 Color export（2026-07-20）確定為 `--semantic-text-dark`(#0b1220)、`--semantic-text-grey01`(#94a3b8)，Icon/IconButton 已接。 | 已完成 |
| 13 | ~~遷移 Token 名~~ | `text/base01` → `text/dark` | ✅ 已完成：Button/Checkbox 全改用 `--semantic-text-dark`，相容別名 `--semantic-text-base01` 已移除。 | 已完成 |
| 12 | 新元件 | **IconButton**（Figma 無此設計） | icon-only 按鈕，依口述「參考垃圾桶、hover 亮成橘 primary」。工程補齊：focus 橘框、pressed=qlo-700、disabled=grey-300、圓角 radius-medium、padding-medium、tap≥44px。請設計端在 Figma 正式定義樣式與 states。 | 待設計確認 |
| 14 | 尺寸衝突 | **FileRow** 高度 vs 內距 | node 27:1405 同時標 `height:80`（固定）與 `py-24`；固定高會覆蓋內距（子鈕本身 42 高）。程式改用 `min-height:80` + `padding:8px 16px`（含放大字體的呼吸空間，憲法 6.3/6.5），視覺仍為 80px 列。請設計端確認取捨（是否改成 min-height、或縮小 py）。 | 待設計確認 |
| 15 | 顏色推斷 | **FileRow** trash 顏色 | Figma trash 為圖片向量、讀不到色碼。依整列灰調推斷用 `IconButton color="grey"`（hover 轉橘）。請設計端確認 icon 預設色。 | 待設計確認 |
| 16 | 缺間距 token | 0720 Demo 一批非 token 間距 | 這批畫面用到多個不在現有間距尺度（4/8/16）的值，暫用元件層級變數並註解：UploadDropzone `gap 12`；Title 標題/副標間距 `6`(small)/`10`(large)；Card `padding-block 24`；PageFooter `gap 48`；AttachmentPage `gap 48`、`padding 32`。建議在 Figma 補一套間距 token。 | 待設計確認 |
| 17 | 缺 token | **Card** 圓角 / 邊框 / 陰影 | Card（node 36:9660）用 `radius 10`（不在 8/12/16 尺度）、`border 0.5px`、陰影 `2px 3px 12px 2px rgba(197,203,209,.12), 0 0 20px rgba(148,163,184,.06)`（裸 rgba，無 shadow token）。暫用元件變數。建議 Figma 補圓角 10 與第一個 shadow token。 | 待設計確認 |
| 18 | 新 icon | `arrow-up-from-bracket`、`circle-info` | 由 Figma 匯出 SVG 加進 Icon registry。兩者原檔非 24×24（上傳 22.4×26.1、info 12.8×12.8），已加 `ICON_VIEWBOXES` 覆寫；且皆單一造型（regular=solid 共用 path）。上傳 icon 在 dropzone 用品牌橘 `--semantic-brand-primary`。請設計端確認 icon 尺寸規格是否統一到 24。 | 待處理 |
| 19 | 固定尺寸 | Page Demo 頁面/卡片固定大小 | 依需求把 demo 頁面固定為 `1040×1096`、卡片固定高 `788`（Figma card 最大值）；卡片內清單超出即自身捲動。皆結構性、非 token。兩個 Page Demo（靜態＋互動）共用。 | 已套用 |
| 20 | 尺寸調整 | **Title** large 由 28 → 24 | 使用者覺得頁面大標 28 太大，改用現有 token `text-title-semibold-24`（小標維持 20）。與目前 Figma 的 Title/Semibold_28 不一致，請設計端確認是否同步 Figma。 | 待設計確認 |
| 21 | 一批微調 | Title / UploadDropzone / Page 尺寸 | 使用者調整：① UploadDropzone 副標 `body-14`→`subtitle-17`；② Title icon large 32→28、small 24→20（各 −4px）；③ Title icon↔字間距 16→4（`padding-extra-small`）；④ Page Demo 頁高由固定 1096 改為 `80vh`、卡片改填滿剩餘高。皆走 token／結構值，與 Figma 原稿有出入，請設計端確認是否同步。 | 待設計確認 |

## 開發中觀察（待確認是否要動 Figma）

| # | 觀察 | 說明 |
|---|------|------|
| A | 重複色值 | `dark-blue-50` 與 `grey-600-primary` 皆為 `#94a3b8`。 |
| B | 純黑 | `dark-blue-700` = `#000000`。 |
| C | Button clean hover 不一致 | red 的 clean hover 底用淺色 `qlo-200@50%`，但 black/grey 用較深的 `grey-500`；而 stroke hover 三色都用淺色（grey-200 / qlo-200@50%）。疑似刻意或筆誤，請設計端確認。 |
| D | Checkbox 黑色勾勾色 | checkmark 是圖片資產，無法從 API 讀出色碼；推斷黑色勾勾用 `semantic/base02`（本 frame 唯一未對應其他用途的 token）。請設計端確認。 |

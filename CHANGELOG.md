# 更新日誌（Changelog）

> 用白話記錄每一次「確定的更新」。最新的在最上面。

---

## 2026-07-20 — 憲章新增「改在源頭層」（單一真相來源）

- 憲章新增 **6.6 改在源頭層，保持引用鏈**：測試時在畫面上發現要調的東西，一律沉到源頭層改，不在 page 打補丁——
  - **草稿區元件** → 直接改元件本身（值改 token／`--qlo-*`）。
  - **正式區元件** → 代表元件不夠用；**不直接改正式元件**，Claude 停下來問使用者要不要**新增變體**，確認後走草稿→給看→確定→轉正式流程。
- 第四章補一句：允許用**草稿區元件**組「測試畫面」一起評估，調整依 6.6 分流。

---

## 2026-07-20 — 憲章新增「驗證分工」+ 修好預覽互動

- 修預覽框架 `preview/Preview.tsx`：為每個 control 自動接 `on<Prop>Change` callback 寫回 args。
  先前受控元件（如 FileRow 把 checked 傳給 Checkbox）因為沒人更新狀態，會「點了沒反應」；
  現在受控元件在預覽**預設就是活的**，這類 bug 結構性解決。
- 憲章第七章新增第 7、8 條，定下驗證分工與省 token 邊界：
  - **7 誰驗什麼**：外觀／互動由使用者肉眼看；間距／圓角／顏色的精確度由 Claude 用「讀 token／`getComputedStyle` computed 值」比對 Figma，不靠截圖。
  - **8 何時開瀏覽器**：預設不開，只在使用者要截圖存證或無法自查時才開；驗過一次就信任；瀏覽器不可用時退回 `tsc`＋讀原始碼 token＋邏輯推演，不反覆重試燒 token。

---

## 2026-07-20 — Semantic 色更新 + Icon / IconButton 草稿

- 落地新的 Figma **Color export**（primitive 值不變）：semantic 層新增兩個中介色
  `--semantic-brand-dark`（→ dark-blue-600-primary）、`--semantic-brand-primary-grey`（→ grey-600-primary），
  並把舊 `text/base01` 改名為 `--semantic-text-dark`；`text/grey01`、`text/qlo-primary`、`text/white` 改走中介別名。
  - 遷移並清理：Button/Checkbox 全面改用 `--semantic-text-dark`，移除相容別名 `--semantic-text-base01`；
    移除無規劃的裸值 `--semantic-base02: #03071a`（Checkbox 黑勾改用 `--semantic-text-dark`）。DESIGN-SYSTEM 語意色表已同步。
- 新增 **Icon** 與 **IconButton** 草稿（`src/_draft/`，尚未轉正式）：
  - Icon：使用者上傳的 SVG（regular/solid 各 5 個），`currentColor` 上色，色軸 dark/grey/inherit，預設 24px。
  - IconButton：icon-only 按鈕，hover 亮成 primary 橘（使用者指定）；focus 橘框、pressed、disabled、tap≥44px 為工程補齊（Figma 無此設計，記 FIGMA-SYNC #12）。
  - 已於瀏覽器驗證：hover 色 = `#fd5215`、regular/solid 正確、tap 44px、disabled=grey-300。

---

## 2026-07-20 — 憲法新增「工程實作規範」

- 依使用者（設計師）方向，新增憲法第六章，含：不寫死值、單位一律 rem（1rem=16px）、
  彈性寬高、文字極端值處理（過長截斷/換行、長字串、空值、多語系、數字）、
  以及工程補的盲區（a11y、狀態齊全、內容用 props、彈性版面）。
- px→rem 落地方式定案並完成：加入 `postcss-pxtorem`（`postcss.config.js`），
  建置時自動把 px 轉 rem（含細邊框）。原始碼照 Figma 寫 px、瀏覽器收到 rem。
  已於瀏覽器驗證 token 值、字級、邊框、元件尺寸皆輸出 rem。

---

## 2026-07-20 — 新增白色 token 並串回語意色

- 在 Grey 群組新增 `--primitive-grey-0: #ffffff`（白色，命名沿用數字階層，白最淺 = 0）。
- 把語意色 `--semantic-brand-white` 從寫死的 `#ffffff` 改為引用 `var(--primitive-grey-0)`；
  連帶 `--semantic-text-white`（原本就指向 brand-white）也一路解析到新的白色 token。
- 預覽展示頁與 `DESIGN-SYSTEM.md` 同步更新，已於瀏覽器驗證鏈路解析正確。
- ⚠️ 注意：這是對 Figma 匯出檔的**手動新增**。若日後從 Figma 重新匯出覆蓋 `tokens.css`，
  記得把 `grey-0` 補回去（或在 Figma 端也加上這個變數）。

---

## 2026-07-20 — 確定第一批 Design Tokens 🎨

- 落地使用者從 Figma 匯出的 `tokens.css`（**值完全照給，不手改**）：
  - 顏色 Primitives：Qlo 品牌橘 10 階、Dark Blue 8 階、Grey 10 階
  - 語意色 5 個（text/base01、text/grey01、brand/primary、brand/white、text/white）
  - 字級 11 個 utility class、圓角 3 個、間距 3 個
- 字型決定：**Poppins + Space Mono**，先用 Google Fonts CDN（快速 demo），之後可換自托管。
- 在預覽新增「🎨 Design Tokens」展示頁，並經瀏覽器驗證所有值與字型正確渲染。
- 已把完整 Token 表整理進 `DESIGN-SYSTEM.md`。
- 追蹤事項：`dark-blue-50` 與 `grey-600-primary` 同為 `#94a3b8`；`dark-blue-700` 為純黑（Figma 匯出如此，暫不改）。

---

## 2026-07-20 — 專案初始化

- 建立專案憲法 `CONSTITUTION.md`，對齊四大原則與標準流程。
- 決定技術方向：**React + TypeScript**、**原生 CSS Variables**、先做**輕量預覽**（結構對齊 Storybook，之後可平滑升級）。
- 建立資料夾骨架：草稿區 `src/_draft/` 與正式區 `src/components/` 實體分開。
- 建立 `DESIGN-SYSTEM.md` 與本更新日誌的骨架。
- ⏳ 尚未有任何正式 Token 或元件，等待使用者提供第一批 Design Token。

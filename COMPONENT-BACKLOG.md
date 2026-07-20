# 元件清單（Component Backlog）

> 依「Background Information Upload」上傳畫面（三態：空 / 有檔案 / 編輯）拆解。
> 狀態：✅ 已完成(正式區) · 🟡 草稿區(待轉正式) · 🔜 待做 · ⏸️ 延後

## 原子 Atoms
| 元件 | 狀態 | 說明 |
|------|------|------|
| Button | 🟡 草稿 | Next / Back / View / Detail / Edit / Done 全是它 |
| FileTypeBadge | 🟡 草稿 | EML / PDF 標籤 |
| Checkbox | 🟡 草稿 | 編輯模式左側勾選框 |
| **Icon** | 🔜 | 圖示系統：upload、trash、pencil、check、info、header(archive)、angle-left。多個元件會用到，建議先做 |
| **IconButton** | 🔜 | 只有圖示的按鈕（垃圾桶刪除）。依賴 Icon |

## 分子 Molecules
| 元件 | 狀態 | 說明 |
|------|------|------|
| **UploadDropzone** | 🔜 | 「Drag or Click to upload」虛線框。狀態：default / hover / dragover / 有檔案時的精簡態 |
| **FileRow** | 🔜 | 檔案列：FileTypeBadge + 檔名 + 大小 + View/Detail；編輯模式加 Checkbox + 垃圾桶。⚠️ 含檔名 → 要處理極端值（超長檔名截斷、空值） |

## 組織 / 版面 Organisms
| 元件 | 狀態 | 說明 |
|------|------|------|
| **Card** | 🔜 | 白色圓角容器（Attachment 卡片外框） |
| **SectionHeader** | 🔜 | 「Attachment」標題 + 「EML, PDF only」副標 + 右側動作鈕（Edit/Done） |
| **PageHeader** | 🔜 | 頁首：header icon + 標題 + 「step 6/7, almost there」+ 右上 Information。⚠️ 含標題 → 極端值 |
| **PageFooter** | 🔜 | 頁尾：「2026 Q2」+ Back / Next |
| **Information（右上）** | 🔜 | info icon + 文字，可能是 Button 的 ghost 用法或獨立小元件（待確認） |

## 延後 Deferred
| 元件 | 狀態 | 說明 |
|------|------|------|
| WindowFrame | ⏸️ | macOS 視窗框 + 紅黃綠燈。與「桌面版固定視窗尺寸規則」有關，等你定規則再做 |

## 建議順序
Icon → IconButton →（UploadDropzone、FileRow）→（Card、SectionHeader）→（PageHeader、PageFooter）→ 組裝畫面 → WindowFrame（最後）

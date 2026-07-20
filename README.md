# Qlo 前端 Design System

呈現 Qlo 前端開發的專案，同時累積一套可跨專案重用的 Design System。

## 這個專案怎麼運作

請先讀 [`CONSTITUTION.md`](./CONSTITUTION.md)（專案憲法 / 最高規則）。

| 文件 | 用途 |
|------|------|
| [`CONSTITUTION.md`](./CONSTITUTION.md) | 專案憲法：四大原則、流程、分區 |
| [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) | 逐步累積的設計系統文件（可交付其他專案） |
| [`CHANGELOG.md`](./CHANGELOG.md) | 白話更新日誌 |

## 資料夾

```
src/tokens/       🎨 Design Token → CSS Variables
src/_draft/       🚧 草稿區（製作中、待確認）
src/components/    ✅ 正式區（已確定的元件）
src/screens/      🖼️ 用正式元件組裝的畫面
preview/          👀 輕量互動預覽（未來可轉 Storybook）
```

## 開發

```bash
npm install
npm run dev      # 啟動輕量預覽
```

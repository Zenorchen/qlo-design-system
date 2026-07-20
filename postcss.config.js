/* 建置時自動把 CSS 裡的 px 轉成 rem（1rem = 16px）。
 * 這樣我們可照 Figma 用 px 撰寫（tokens.css 維持 Figma 匯出原樣不手改），
 * 但瀏覽器最終收到的一律是 rem。細邊框（1.2px 等）也一起轉。 */
export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16,
      unitPrecision: 5, // 支援 1.2px → 0.075rem
      propList: ["*"], // 所有屬性都轉（含 border）
      minPixelValue: 0, // 連 1px 級細邊框也轉
    },
  },
};

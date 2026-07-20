# Button — Figma 規格（擷取自 Figma Dev Mode）

- 來源：Design System - Qlo，node `36:5816`（fileKey `uNTxugpd02sv20znvQZ6Dn`）
- 擷取日期：2026-07-20
- 略過項目（依使用者指示）：`showIcon`（angle-left 圖示）、`showCount` / `number`（數字顯示）

## 軸（Variant Axes）
- **color**：`red` / `black` / `grey`
- **style**：`filled` / `stroke` / `clean`
- **size**：`big` / `medium` / `small`
- **state**：`Default` / `hover` / `disable`（程式用 `:hover` / `:disabled` 表達）

## 尺寸 Size（共用：radius 12 = Radius/Medium、Poppins SemiBold、line-height 1）
| size | min-height | min-width | padding (y x) | gap | 字級 token | letter-spacing |
|------|-----------|-----------|---------------|-----|-----------|----------------|
| big | 52 | — | 16px 24px | 8 | Button/Semibold_18 (18px) | -0.18px (-0.01em) |
| medium | 44 | — | 14px 16px | 8 | Button/Semibold_16 (16px) | -0.16px (-0.01em) |
| small | 42 | 68 | 12px 14px | 4 | Button/Semibold_12 (12px) | -0.12px (-0.01em) |
| stroke 邊框 | 1.2px solid | | | | | |

## filled（文字一律白色 semantic/text/white）
| color | Default 底色 | hover 底色 |
|-------|-------------|-----------|
| red | Semantic/Brand/Primary `#fd5215` | Primitive/Qlo/400 `#ff9966` |
| black | Semantic/Text/Base01 `#0b1220` | Primitive/Grey/800 `#4b566b` |
| grey | Primitive/Grey/700 `#6d7b91` | Primitive/Grey/800 `#4b566b` |
| **disable（三色相同）** | 底 Primitive/Grey/300 `#d1d7de`、字 Primitive/Grey/200 `#dde4eb` | |

## stroke（邊框 1.2px、預設無底；文字色見下）
| color | 邊框色 | 文字色 | hover 底色 |
|-------|--------|--------|-----------|
| red | Semantic/Brand/Primary `#fd5215` | Semantic/Text/Qlo Primary `#fd5215` | Qlo/200 @ 50% `rgba(255,212,184,.5)` |
| black | Primitive/Grey/500 `#b9bec4` | Semantic/Text/Base01 `#0b1220` | Primitive/Grey/200 `#dde4eb` |
| grey | Primitive/Grey/500 `#b9bec4` | Primitive/Grey/700 `#6d7b91` | Primitive/Grey/200 `#dde4eb` |
| **disable（三色相同）** | 邊框 Grey/200 `#dde4eb`、字 Grey/200 | | |

## clean（無底無框；文字色同 stroke）
| color | 文字色 | hover 底色 |
|-------|--------|-----------|
| red | Semantic/Text/Qlo Primary `#fd5215` | Qlo/200 @ 50% `rgba(255,212,184,.5)` |
| black | Semantic/Text/Base01 `#0b1220` | **Primitive/Grey/500 `#b9bec4`** |
| grey | Primitive/Grey/700 `#6d7b91` | **Primitive/Grey/500 `#b9bec4`** |
| **disable（三色相同）** | 字 Primitive/Grey/500 `#b9bec4` | |

## ⚠️ 待確認 / 待補 token
1. **`Semantic/Text/Qlo Primary` (#fd5215)**：Figma 有這個語意 token，但先前貼給我的 `tokens.css` 沒有 → 需補進 tokens.css。
2. **hover tint `rgba(255,212,184,.5)`（= Qlo/200 @ 50%）**：Figma 是裸 rgba，沒有命名 token → 建議設一個語意 token。程式先用 `color-mix(Qlo/200 50%)` 對應。
3. **clean hover 不一致**：red 用淺 tint（qlo-200@50%），但 black/grey 用較深的 grey-500；stroke hover 卻都用淺色（grey-200）。疑似 Figma 刻意或筆誤 → 請設計端確認。
4. 邊框寬度 `1.2px` 非 token。

# Checkbox — Figma 規格

- 來源：Design System - Qlo，node `27:1545`（fileKey `uNTxugpd02sv20znvQZ6Dn`），擷取 2026-07-20
- 尺寸：24×24、border 1px solid、radius `Radius/Small`(8)、內距 4px、checkmark 16px 置中

## 軸
- **color**：black / grey / red
- **styleType**（Figma: style）：stroke（透明底）/ filled（有色底）
- **state**：default（未勾）/ selected（勾，Figma 拼字 seleced）/ hover
  - 程式對應：`checked`(boolean) + `:hover`

## 邊框色（依 color）
| color | border |
|-------|--------|
| black | `--semantic-text-dark` #0b1220 |
| grey | `--semantic-text-grey01` #94a3b8 |
| red | `--semantic-brand-primary` #fd5215 |

## 背景（filled 才有；stroke 為透明）
| color | filled 底色 |
|-------|-----------|
| black | `--primitive-grey-100` #e9f1f7 |
| grey | **#f2f7fe（裸 hex，無 token）** → FIGMA-SYNC |
| red | `--primitive-qlo-100` #fff1e6 |

## 勾選（checked）— 顯示 checkmark，顏色
| color | checkmark |
|-------|-----------|
| black | `--semantic-text-dark` #0b1220（原用手動補的 base02 #03071a，已移除該無規劃 token，改用 dark） |
| grey | `--semantic-text-grey01` #94a3b8 |
| red | `--semantic-brand-primary` #fd5215 |

## hover — box-shadow `0 0 4px 0 <glow>`
| color | glow |
|-------|------|
| black | `--primitive-grey-500` #b9bec4 |
| grey | `--primitive-dark-blue-50` #94a3b8 |
| red | `--semantic-brand-primary` #fd5215 |

## 待確認 / 待補
1. grey filled 底 `#f2f7fe` 是裸 hex，無 token → 建議 Figma 補 token。程式暫用元件層級變數。
2. ~~`--semantic-base02` #03071a~~：已移除（無規劃的裸值）。black checkmark 改用 `--semantic-text-dark` #0b1220。
3. Figma 未定義 disabled、focus。程式：不做 disabled（待確認）；focus 加橘框（同 Button）。

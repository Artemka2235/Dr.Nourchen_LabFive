# Lab Work 5 — Registan Travel: written answers

## Part C — Bootstrap comparison

Part A needed about 390 lines of hand-written CSS in `style.css`, while the Bootstrap version needed only about 18 lines in `bootstrap-brand.css` (brand colours and fonts), because the navbar, grid (`container` / `row` / `col-*`), cards and spacing all come ready-made from Bootstrap's classes.

## Part D — Client bug reports

### Bug 1 — "Visited menu links do not turn gold when I hover."

**Cause:** the link pseudo-classes are not in **LVHA order** (`:link` → `:visited` → `:hover` → `:active`). `a:hover` and `a:visited` have the **same specificity**, so the **cascade** uses **source order**: the later rule `a:visited { background: none; }` wins over `a:hover` for any visited link.

**Fix:**
```css
nav a:link    { color: white; }
nav a:visited { color: white; }
nav a:hover   { background: #E0A526; }
nav a:active  { background: #E0A526; }
```

### Bug 2 — "The badge is in the corner of the whole page, not the card."

**Cause:** an element with `position: absolute` is placed relative to its **nearest positioned ancestor** (its **containing block**). `.card` has the default `position: static`, so there is no positioned ancestor and the badge is placed relative to the **initial containing block** (the page).

**Fix:**
```css
.card  { position: relative; padding: 16px; border-radius: 10px; }
.badge { position: absolute; top: 10px; right: 10px; }
```

### Bug 3 — "On my laptop the third card drops below the other two."

**Cause:** the default **box model** is `box-sizing: content-box`, so `width: 33.33%` is only the content width; **padding** (2 × 20px) and **border** (2 × 1px) are added on top. Each card is 33.33% + 42px wide, three cards are wider than 100%, and the third **float** wraps to the next line.

**Fix:**
```css
.card {
  box-sizing: border-box;   /* width now includes padding and border */
  width: 33.33%;
  float: left;
  padding: 20px;
  border: 1px solid #ddd;
}
```

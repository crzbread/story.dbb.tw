# story.dbb.tw

這是一個使用 Astro 與 Astro Theme Pure 建立的 AI 文章網站。

網站收錄由不同大型語言模型產生的文章。若想閱讀由人撰寫的內容，請前往
[dbb.tw](https://dbb.tw)。

## 執行方式

安裝相依套件：

```sh
yarn install
```

啟動本機開發環境：

```sh
yarn dev
```

檢查文章格式與程式碼：

```sh
yarn run check
```

建立正式網站：

```sh
yarn build
```

## 新增文章

每篇文章必須建立在 `src/content/blog/` 底下的獨立資料夾中。

```text
src/content/blog/
└── stable-english-or-pinyin-slug/
    ├── index.md
    ├── cover.jpg
    └── article-image.jpg
```

資料夾名稱必須使用穩定的英文或拼音網址名稱，並會成為文章網址：

```text
src/content/blog/stable-slug/index.md
→ /blog/stable-slug
```

文章發布後不要任意修改資料夾名稱。

### 文章格式

`index.md` 必須包含以下 frontmatter：

```yaml
---
title: 文章標題
description: 不超過 160 字的文章摘要
publishDate: 2026-06-13
language: zh-TW
tags:
  - AI
  - 主題標籤
heroImage:
  src: ./cover.jpg
  alt: 清楚描述封面內容的替代文字
---
```

若文章曾經更新，可以加入：

```yaml
updatedDate: 2026-06-15
```

### 給產生文章的 LLM

- 只能新增或修改指定文章資料夾內的內容。
- 不要修改網站程式碼、設定、Theme、README 或其他文章。
- 每篇文章必須完成後才能交付，不要產生草稿。
- `title` 不可超過 60 字，`description` 不可超過 160 字。
- 每篇文章至少加入一個有意義的 Tag。
- 封面圖片必須命名為 `cover.jpg`，並與 `index.md` 放在同一個資料夾。
- 文章使用的所有圖片都必須放在同一個文章資料夾內。
- Markdown 內的圖片必須使用相對路徑：

```md
![圖片替代文字](./article-image.jpg)
```

- 不要加入 Category。
- 完成文章後執行 `yarn run check`，確認文章格式正確。

/**
 * timeline（站內版翻書時間軸）的文案與可調參數。
 * 改這裡就好，不用進 timeline.astro 動版面；dev 模式存檔即生效。
 *
 * 文案裡的 {count} 會自動代換成目前的文章總數。
 */

export const bookSettings = {
  /** 單次翻頁動畫時間（毫秒） */
  flipMs: 1000,
  /** 一次翻多頁（時間軸跳頁）時，每張紙起翻的間隔（毫秒） */
  staggerMs: 130,
  /** 自動翻頁的間隔（毫秒） */
  autoFlipMs: 3600,
  /**
   * 文章數超過這個值時，上方時間軸自動從「每篇一個點」切換成
   * 「拉桿（scrubber）」模式：連續軌道＋月份刻度，游標指到哪就顯示哪篇，
   * 精選文章仍以金色菱形釘在軌道上。想先預覽拉桿模式，把它改成 1 即可。
   */
  scrubberThreshold: 1
}

export const bookText = {
  /** 瀏覽器分頁標題與搜尋引擎描述 */
  pageTitle: '我的故事書',
  pageDescription:
    '這是我的故事書：紀錄每篇文章的誕生時刻，點擊、滑動、鍵盤或自動翻頁，請慢慢讀完這本書。',

  /** 書本上方的頁面標題列 */
  masthead: {
    title: '我的故事書',
    sub: '點右頁往後翻、左頁往前翻；也可以按 ▶ 讓它自己翻'
  },

  /** 封面 */
  cover: {
    kicker: 'story.dbb.tw',
    titleLines: ['我的', '故事書'],
    sub: 'A CHRONICLE OF {count} STORIES'
  },

  /** 序（打開封面後的第一個跨頁：左頁、右頁） */
  introLeft: {
    heading: '序',
    body: '本書收錄了本站每一篇文章誕生的時刻，由舊到新裝訂成冊。每個跨頁都是一篇故事。'
  },
  introRight: {
    body: '點右頁往後翻、點左頁往前翻，也可以滑動、按方向鍵，或按下方的 ▶ 交給自動翻頁。上方時間軸的每個點都是一篇文章，點了直接翻到那一頁。',
    note: '共 {count} 篇'
  },

  /** 最後一個跨頁（左頁、右頁） */
  finLeft: {
    heading: '未完待續⋯',
    note: '之後的每一篇新文章，都會自動成為這本書的新頁。'
  },
  finRight: {
    note: '— 謝謝收看 · 全書完 · 共 {count} 篇 —',
    linkText: '查看所有文章 →'
  },

  /** 封底 */
  backCover: {
    sub: '— 全書完 —',
    kicker: 'story.dbb.tw · timeline'
  },

  /** 精選文章（frontmatter 有 featured: true）的書籤標示文字 */
  featuredBadge: '我很喜歡'
}

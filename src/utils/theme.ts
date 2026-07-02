export type Theme = 'system' | 'dark' | 'light'

const themeCycle: Theme[] = ['system', 'dark', 'light']

/** 主題三段循環：system → dark → light → system；未知或空值視為 system */
export function getNextTheme(current: string | null | undefined): Theme {
  const index = themeCycle.indexOf((current ?? 'system') as Theme)
  return themeCycle[(index + 1) % themeCycle.length]
}

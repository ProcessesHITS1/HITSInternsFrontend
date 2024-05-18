export const parseDate = (date: string | null | undefined) =>
  !date || date.slice(0, 10).replaceAll('-', '.')

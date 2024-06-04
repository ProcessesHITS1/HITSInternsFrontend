export const parseDate = (date: string | null | undefined) =>
  !date || date.slice(0, 10).replaceAll('-', '.')

export const prettyParseDateTime = (date: string | null | undefined) => {
  if (!date) return date
  try {
    const cur = new Date()
    const dateToParse = new Date(date)
    if (cur.getTime() - dateToParse.getTime() < 86_400_000) {
      return `Сегодня, ${dateToParse.getHours()}:${dateToParse.getMinutes()}`
    }
    if (cur.getTime() - dateToParse.getTime() < 2 * 86_400_000) {
      return `Вчера, ${dateToParse.getHours()}:${dateToParse.getMinutes()}`
    }
    return dateToParse.toLocaleString().slice(0, 17)
  } catch {
    return null
  }
}

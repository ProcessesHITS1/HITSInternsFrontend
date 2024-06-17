export const parseDate = (date: string | null | undefined) =>
  !date || date.slice(0, 10).replaceAll('-', '.')

export const prettyParseDateTime = (date: string | null | undefined) => {
  if (!date) return date
  try {
    const cur = new Date()
    const dateToParse = new Date(date)
    const hh = ('0' + dateToParse.getHours()).slice(-2)
    const mm = ('0' + dateToParse.getMinutes()).slice(-2)
    if (cur.getTime() - dateToParse.getTime() < 86_400_000) {
      return `Сегодня, ${hh}:${mm}`
    }
    if (cur.getTime() - dateToParse.getTime() < 2 * 86_400_000) {
      return `Вчера, ${hh}:${mm}`
    }
    return dateToParse.toLocaleString().slice(0, 17)
  } catch {
    return null
  }
}

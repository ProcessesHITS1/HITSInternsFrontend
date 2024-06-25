import { ResultStatus } from '../model'

export const getResultStatusName = (status: ResultStatus | null | undefined) => {
  if (!status) return '–'
  switch (status) {
    case ResultStatus.Accepted:
      return 'Подтвержден'
    case ResultStatus.Rejected:
      return 'Не подтвержден'
    case ResultStatus.Pending:
      return 'Ожидает подтверждения'
  }
}

export const getStudResultStatusName = (status: ResultStatus | null | undefined) => {
  if (!status) return '–'
  switch (status) {
    case ResultStatus.Accepted:
      return 'Оффер принят студентом'
    case ResultStatus.Rejected:
      return 'Студент отказался'
    case ResultStatus.Pending:
      return 'Студент думает'
  }
}

export const getOfferGivenStr = (offerGiven: boolean | null | undefined) => {
  if (offerGiven == null) return 'Нет данных'
  return offerGiven ? 'Есть' : 'Нет'
}

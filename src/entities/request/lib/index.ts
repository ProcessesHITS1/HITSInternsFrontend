import { ResultStatus } from '../model'

export const getResultStatusName = (status: ResultStatus | null | undefined) => {
  if (!status) return '–'
  switch (status) {
    case ResultStatus.Accepted:
      return 'Принят'
    case ResultStatus.Rejected:
      return 'Не принят'
    case ResultStatus.Pending:
      return 'В процессе'
  }
}

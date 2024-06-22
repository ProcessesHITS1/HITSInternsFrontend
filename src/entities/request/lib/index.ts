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

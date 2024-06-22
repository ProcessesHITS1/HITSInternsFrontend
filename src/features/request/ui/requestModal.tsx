import { Modal, Form, Button, Flex, Timeline, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCreateReqResultMutation } from '~features/request'
import { Company } from '~entities/company'
import { Request, ResultStatus } from '~entities/request'

export interface RequestModalProps {
  closed: boolean
  company: Company | null
  request: Request | null
  open: boolean
  close: () => void
}

export const RequestModal = (props: RequestModalProps) => {
  const { open, close, request, company, closed } = props
  const [trigger, triggerResult] = useCreateReqResultMutation()
  const [form] = Form.useForm()

  const wrappedClose = () => {
    if (!triggerResult.isLoading) {
      close()
    }
  }

  useEffect(() => {
    if (open && request) {
      const result = request.requestResult
      form.setFieldsValue({
        offerGiven: result?.offerGiven || '',
        resultStatus: result?.resultStatus || null,
      })
    }
  }, [open, request])

  const onFinish = async (data: any) => {
    try {
      if (request) {
        await trigger({
          requestId: request.id,
          offerGiven: data.offerGiven || null,
          resultStatus: data.resultStatus,
        }).unwrap()
        toast.success('Сохранено')
        wrappedClose()
      }
    } catch {
      toast.error('Произошла ошибка')
    }
  }
  const hasSnapshots = request?.requestStatusSnapshots?.length || 0 > 0

  const watch = Form.useWatch([], form)

  return (
    <Modal
      forceRender
      title={`Прогресс: ${request?.studentName}`}
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <div className='font-bold'>Основная информация</div>
      <div>Позиция: {`${request?.positionTitle}`}</div>
      <div>Компания: {company?.name}</div>
      <div>Контакты компании: {company?.contacts?.join(' • ') || 'отсутствуют'}</div>
      <div className='font-bold'>История</div>
      {!hasSnapshots && 'История отсутствует'}
      {hasSnapshots && (
        <Timeline
          className='mt-1 mb-0'
          mode='left'
          items={
            request?.requestStatusSnapshots?.map((s, i) => ({
              children: `${new Date(s.dateTime).toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}. ${s.status || '—'}`,
              color: i ? 'gray' : 'green',
            })) || []
          }
        />
      )}
      <div>Комментарий студента: {request?.requestResult?.description || '—'}</div>

      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item name={'offerGiven'} label='Оффер'>
          <Select
            disabled={closed}
            placeholder='Статус оффера'
            options={[
              { value: '', label: 'Неивзестно' },
              { value: true, label: 'Получен' },
              { value: false, label: 'Не получен' },
            ]}
          />
        </Form.Item>
        {watch?.offerGiven && (
          <Form.Item name={'resultStatus'} label='Подтверждение школы'>
            <Select
              disabled={closed}
              placeholder='Статус подтверждения школы'
              options={[
                { value: ResultStatus.Pending, label: 'В ожидании' },
                { value: ResultStatus.Accepted, label: 'Подтвержден' },
                { value: ResultStatus.Rejected, label: 'Отклонен' },
              ]}
            />
          </Form.Item>
        )}
        {!closed && (
          <Form.Item>
            <Flex>
              <Button
                type='primary'
                htmlType='submit'
                className='ms-auto'
                disabled={triggerResult.isLoading}
              >
                Сохранить
              </Button>
            </Flex>
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

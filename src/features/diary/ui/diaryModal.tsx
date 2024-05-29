import { DownloadOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Flex, Button, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAddDiaryFeedbackMutation } from '~features/diary'
import { AcceptanceStatus, downloadDiary, useGetDiaryByIdQuery } from '~entities/diary'
import { parseDate } from '~shared/lib/functions'

export interface DiaryModalProps {
  diaryId: string | null | undefined
  isOpen: boolean
  close: () => void
}

export const DiaryModal = (props: DiaryModalProps) => {
  const { isOpen, close, diaryId } = props
  const diaryQuery = useGetDiaryByIdQuery(
    { diaryId: diaryId || '' },
    {
      skip: !diaryId,
    }
  )

  const [trigger, result] = useAddDiaryFeedbackMutation()

  const [form] = Form.useForm()

  const wrappedClose = () => {
    if (!result.isLoading) {
      close()
    }
  }

  const feedbackHandler = async (data: any) => {
    if (!diaryId) {
      toast.error('Дневник не найден')
      return
    }
    try {
      await trigger({
        diaryId,
        ...data,
      })
      toast.success('Успешно')
      close()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  const downloadHandler = async () => {
    try {
      if (diaryQuery.data?.documentId) {
        await downloadDiary({
          documentId: diaryQuery.data.documentId,
        })
      }
    } catch {
      toast.error('Произошла ошибка при загрузке')
    }
  }

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
    }
  }, [isOpen])

  if (diaryQuery.isFetching) {
    return null
  }

  return (
    <Modal
      forceRender
      title={'Дневник практики'}
      open={isOpen}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      {diaryQuery.isError ? (
        'Произошла ошибка при загрузке дневника'
      ) : !diaryId ? (
        'Дневник практики отсутствует'
      ) : (
        <>
          <div className='flex items-center'>
            <span className='me-2'>
              Загружен: {parseDate(diaryQuery.data?.attachedAt)}
            </span>
            <Button
              type='primary'
              icon={<DownloadOutlined />}
              size='small'
              disabled={false}
              onClick={downloadHandler}
            />
          </div>

          <Form
            layout='vertical'
            validateTrigger='onBlur'
            form={form}
            onFinish={feedbackHandler}
            initialValues={
              diaryQuery.data?.diaryFeedback
                ? {
                    acceptanceStatus: diaryQuery.data.diaryFeedback.acceptanceStatus,
                    comments: diaryQuery.data.diaryFeedback.comments,
                  }
                : {}
            }
          >
            <Form.Item
              name='acceptanceStatus'
              label='Результат'
              rules={[
                {
                  required: true,
                  message: 'Укажите результат проверки',
                },
              ]}
            >
              <Select
                allowClear={false}
                placeholder='Результат проверки'
                options={[
                  { value: AcceptanceStatus.ACCEPTED, label: 'Принято' },
                  { value: AcceptanceStatus.REJECTED, label: 'Не принято' },
                ]}
              />
            </Form.Item>

            <Form.Item name='comments' label='Комментарий'>
              <Input.TextArea placeholder='Введите комментарий' />
            </Form.Item>

            <Form.Item>
              <Flex>
                <Button type='primary' htmlType='submit' className='ms-auto'>
                  Сохранить
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  )
}

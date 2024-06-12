import { DownloadOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Flex, Button, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAddDiaryFeedbackMutation } from '~features/diary'
import { AcceptanceStatus, Diary, downloadDiary } from '~entities/diary'
import { parseDate } from '~shared/lib/functions'

export interface DiaryModalProps {
  diaryId: string | null | undefined
  diary: Diary | null | undefined
  isOpen: boolean
  close: () => void
  semesterClosed: boolean
}

export const DiaryModal = (props: DiaryModalProps) => {
  const { isOpen, close, diaryId, diary, semesterClosed } = props

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
      if (diary?.documentId) {
        await downloadDiary({
          documentId: diary.documentId,
        })
      }
    } catch {
      toast.error('Произошла ошибка при загрузке')
    }
  }

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
      if (diary) {
        form.setFieldsValue({
          acceptanceStatus: diary.diaryFeedback?.acceptanceStatus,
          comments: diary.diaryFeedback?.comments,
        })
      }
    }
  }, [isOpen, diary])

  return (
    <Modal
      forceRender
      title={'Дневник практики'}
      open={!!(isOpen && (!diaryId || diary))}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      {!diaryId ? (
        'Дневник практики отсутствует'
      ) : (
        <>
          <div className='flex items-center'>
            <span className='me-2'>Загружен: {parseDate(diary?.attachedAt)}</span>
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
              diary?.diaryFeedback
                ? {
                    acceptanceStatus: diary.diaryFeedback.acceptanceStatus,
                    comments: diary.diaryFeedback.comments,
                  }
                : {}
            }
            disabled={semesterClosed}
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
              <Input.TextArea
                placeholder='Введите комментарий'
                style={{ color: 'black' }}
              />
            </Form.Item>

            <Form.Item>
              <Flex>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='ms-auto'
                  disabled={semesterClosed}
                >
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

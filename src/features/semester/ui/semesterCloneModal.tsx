import { Button, Col, DatePicker, Flex, Form, Modal, Row } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCloneSemesterByIdMutation } from '~features/semester'
import { Semester } from '~entities/semester'

dayjs.extend(customParseFormat)

export interface SemesterCloneModalProps {
  open: boolean
  close: () => void
  semester: Semester | null | undefined
  year: number | null
}

const dateFormat = 'YYYY-MM-DD'

export const SemesterCloneModal = (props: SemesterCloneModalProps) => {
  const { semester, open, close, year } = props
  const [cloneSemester, cloneSemesterResult] = useCloneSemesterByIdMutation()
  const isResultLoading = cloneSemesterResult.isLoading

  const [form] = Form.useForm()

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
    }
  }

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])

  const onFinish = async (rawData: any) => {
    try {
      if (semester) {
        const documentsDeadline =
          rawData.documentsDeadline?.format(dateFormat) + 'T00:00:00Z'

        await cloneSemester({
          semesterIdToClone: semester.id,
          newSemesterData: {
            documentsDeadline,
            year: +documentsDeadline.slice(0, 4),
            seasonId: semester.seasonId,
            semester: semester.semester + 1,
          },
        }).unwrap()
        toast.success('Успешно')
      }
      close()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={`Скопировать семестр №${semester?.semester} (сезон-${year})`}
      open={!!(open && semester)}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form onFinish={onFinish} layout='vertical' validateTrigger='onChange' form={form}>
        <Row>
          <Col xs={24}>
            <Form.Item
              name='documentsDeadline'
              rules={[
                {
                  required: true,
                  message: 'Укажите срок приема дневникв',
                },
              ]}
              label={'Срок приема дневников'}
            >
              <DatePicker className='w-full' allowClear={false} />
            </Form.Item>

            <Form.Item>
              <Flex>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='ms-auto'
                  disabled={isResultLoading}
                >
                  Сохранить
                </Button>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

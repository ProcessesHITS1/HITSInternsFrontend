import { Button, Col, DatePicker, Flex, Form, Modal, Row } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useEditSemesterByIdMutation } from '~features/semester'
import { Semester } from '~entities/semester'

dayjs.extend(customParseFormat)

export interface SemesterModalProps {
  open: boolean
  close: () => void
  semester: Semester | null | undefined
}

const dateFormat = 'YYYY-MM-DD'

export const SemesterModal = (props: SemesterModalProps) => {
  const { semester, open, close } = props

  const [editSemester, editSemesterResult] = useEditSemesterByIdMutation()
  const isResultLoading = editSemesterResult.isLoading

  const [form] = Form.useForm()

  useEffect(() => {
    if (semester) {
      if (open) {
        form.setFieldsValue({
          documentsDeadline: dayjs(semester.documentsDeadline?.slice(0, 10), dateFormat),
        })
      }
    } else {
      form.resetFields()
    }
  }, [semester, open])

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
    }
  }

  const onFinish = async (rawData: any) => {
    try {
      if (semester) {
        const data = {
          ...semester,
          documentsDeadline: rawData.documentsDeadline?.format(dateFormat) + 'T00:00:00Z',
        }
        await editSemester({ id: semester.id, data }).unwrap()
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
      title={'Установить сроки для дневников'}
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

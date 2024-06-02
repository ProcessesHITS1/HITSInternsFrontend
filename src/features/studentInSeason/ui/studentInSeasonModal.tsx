import { Button, Col, Flex, Form, Modal, Row, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { UserInfo } from '~entities/user'
import { useAddStudentInSeasonMutation } from '../api'

export interface StudentInSeasonModalProps {
  year: number
  open: boolean
  close: () => void
  students: UserInfo[]
}

export const StudentInSeasonModal = (props: StudentInSeasonModalProps) => {
  const { open, close, students, year } = props

  const [addStudent, addStudentResult] = useAddStudentInSeasonMutation()
  const isResultLoading = addStudentResult.isLoading

  const [form] = Form.useForm()

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
  }, [open])

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
    }
  }

  const onFinish = async (data: any) => {
    try {
      await addStudent({ year, student: data?.student }).unwrap()
      form.resetFields()
      close()
      toast.success('Студент добавлен в сезон')
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal
      forceRender
      title={'Добавить студента'}
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form
        onFinish={onFinish}
        layout='vertical'
        validateTrigger='onBlur'
        form={form}
        initialValues={{
          student: students[0]?.id,
        }}
      >
        <Row>
          <Col xs={24}>
            <Form.Item name='student' label='Студент'>
              <Select
                showSearch
                filterOption={filterOption}
                placeholder='Выберите студента'
                allowClear={false}
                options={students.map((student) => ({
                  value: student.id,
                  label: `${student.lastName} ${student.firstName} ${student.patronymic}`,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
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
      </Form>
    </Modal>
  )
}

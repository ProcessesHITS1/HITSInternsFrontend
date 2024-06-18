import { Button, Col, Flex, Form, Modal, Row, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Company } from '~entities/company'
import { UserInfo } from '~entities/user'
import { useAddStudentInSemesterMutation } from '../api'

export interface StudentInSemesterModalProps {
  semesterId: string
  open: boolean
  close: () => void
  students: UserInfo[]
  companies: Company[]
}

export const StudentInSemesterModal = (props: StudentInSemesterModalProps) => {
  const { open, close, students, semesterId, companies } = props

  const [addStudent, addStudentResult] = useAddStudentInSemesterMutation()
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
      await addStudent({ semesterId, ...data }).unwrap()
      form.resetFields()
      close()
      toast.success('Студент добавлен в семестр')
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal
      forceRender
      title={'Добавить студента в семестр'}
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
          studentId: students[0]?.id,
          companyId: companies[0]?.id,
        }}
      >
        <Row>
          <Col xs={24}>
            <Form.Item name='studentId' label='Студент'>
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
          <Col xs={24}>
            <Form.Item name='companyId' label='Компания'>
              <Select
                showSearch
                filterOption={filterOption}
                placeholder='Выберите компанию'
                allowClear={false}
                options={companies.map((c) => ({
                  value: c.id,
                  label: c.name,
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

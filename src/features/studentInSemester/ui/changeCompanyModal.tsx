import { Button, Col, Flex, Form, Modal, Row, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Company } from '~entities/company'
import { StudentInSemester } from '~entities/studentInSemester'
import { useEditStudentInSemesterMutation } from '../api'

export interface ChangeCompanyModalProps {
  open: boolean
  close: () => void
  student: StudentInSemester | null
  companies: Company[]
}

export const ChangeCompanyModal = (props: ChangeCompanyModalProps) => {
  const { open, close, student, companies } = props

  const [editStudent, editStudentResult] = useEditStudentInSemesterMutation()
  const isResultLoading = editStudentResult.isLoading

  const [form] = Form.useForm()

  useEffect(() => {
    if (open && student) {
      form.setFieldValue('companyId', student.companyId)
    }
  }, [open])

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
    }
  }

  const onFinish = async (data: any) => {
    try {
      await editStudent({ companyId: data.companyId, id: student?.id || '' }).unwrap()
      form.resetFields()
      close()
      toast.success('Компания студента сохранена')
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
      <Form onFinish={onFinish} layout='vertical' validateTrigger='onBlur' form={form}>
        <Row>
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

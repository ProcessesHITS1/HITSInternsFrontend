import { Button, Col, Flex, Form, Modal, Row, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Company } from '~entities/company'
import { useAddCompanyInSeasonMutation } from '../api'

export interface CompanyInSeasonModalProps {
  year: number
  open: boolean
  close: () => void
  companies: Company[]
}

export const CompanyInSeasonModal = (props: CompanyInSeasonModalProps) => {
  const { open, close, companies, year } = props

  const [createCompany, createCompanyResult] = useAddCompanyInSeasonMutation()
  const isResultLoading = createCompanyResult.isLoading

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
      await createCompany({ year, company: data?.company }).unwrap()
      form.resetFields()
      close()
      toast.success('Компания добавлена в сезон')
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={'Добавить компанию'}
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
          company: companies[0]?.id,
        }}
      >
        <Row>
          <Col xs={24}>
            <Form.Item name='company' label='Компания'>
              <Select
                placeholder='Выберите компанию'
                allowClear={false}
                options={companies.map((company) => ({
                  value: company.id,
                  label: company.name,
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

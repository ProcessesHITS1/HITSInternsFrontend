import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Form, Input, Modal, Row, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCreateCompanyMutation, useEditCompanyMutation } from '~features/company'
import { Company } from '~entities/company'
import { UserInfo } from '~entities/user'

export interface CompanyModalProps {
  open: boolean
  close: () => void
  company: Company | null
  personal: UserInfo[]
}

export const CompanyModal = (props: CompanyModalProps) => {
  const { company, open, close, personal } = props

  const [createCompany, createCompanyResult] = useCreateCompanyMutation()
  const [editCompany, editCompanyResult] = useEditCompanyMutation()
  const isResultLoading = createCompanyResult.isLoading || editCompanyResult.isLoading

  const [form] = Form.useForm()

  useEffect(() => {
    if (open) {
      form.resetFields()
      if (company) {
        form.setFieldsValue(company)
      }
    }
  }, [company, open])

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
      form.resetFields()
    }
  }

  const onFinish = async (rawData: any) => {
    const data = {
      ...rawData,
      seasonIds: rawData.seasonIds || [],
      contacts: rawData.contacts || [],
    }

    try {
      if (company) {
        await editCompany({ id: company.id, data }).unwrap()
      } else {
        await createCompany({ data }).unwrap()
      }
      close()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={company ? 'Редактирование компании' : 'Новая компания'}
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
        initialValues={company || {}}
      >
        <Row>
          <Col xs={24}>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Введите название',
                },
              ]}
              label='Название'
            >
              <Input placeholder='Введите название' autoComplete='off' />
            </Form.Item>
            <Form.Item name='curatorId' label='Куратор'>
              <Select
                placeholder='Выберите куратора'
                allowClear
                options={personal.map((user) => ({
                  value: user.id,
                  label: `${user.lastName} ${user.firstName} ${user.patronymic}`,
                }))}
              />
            </Form.Item>
            <Form.List name='contacts'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? 'Контакты' : ''}
                      key={field.key}
                      required={false}
                    >
                      <div className='flex items-start'>
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Введите контакт',
                            },
                          ]}
                          className='w-full inline-block'
                        >
                          <Input.TextArea placeholder='Описание' />
                        </Form.Item>
                        <MinusCircleOutlined
                          className='ms-1 mt-1'
                          style={{ fontSize: '20px' }}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                      Контакт
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
              {company ? 'Сохранить' : 'Создать'}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}

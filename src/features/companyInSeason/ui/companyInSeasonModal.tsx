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
  //const [editCompany, editCompanyResult] = useEditCompanyInSeasonMutation()
  const isResultLoading = createCompanyResult.isLoading //|| editCompanyResult.isLoading

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
            {/*<Form.List name='positions'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item label={index === 0 ? 'Позиции' : ''} required={false}>
                      <div className='w-full flex items-start'>
                        <Form.Item
                          name={[index, 'profession']}
                          validateTrigger={['onChange', 'onBlur']}
                          className='w-full'
                          rules={[{ required: true, message: 'Укажите профессию' }]}
                        >
                          <Select
                            placeholder='Укажите профессию'
                            allowClear={false}
                            options={[
                              { value: 'noProfession', label: 'Не указано' },
                              ...professions.map((profession) => ({
                                value: profession.id,
                                label: profession.name,
                              })),
                            ]}
                            disabled={!!company}
                            className='w-full'
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className='ms-2 mt-1 d-inline-block'
                          style={{ fontSize: '20px' }}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                      <Form.Item
                        name={[index, 'amount']}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            message: 'Укажите количество мест',
                          },
                        ]}
                        className='w-full'
                      >
                        <InputNumber
                          min='0'
                          max='100'
                          placeholder='Количество мест'
                          className='w-full'
                        />
                      </Form.Item>
                      <Form.Item
                        name={[index, 'description']}
                        validateTrigger={['onChange', 'onBlur']}
                        className='w-full'
                      >
                        <Input.TextArea placeholder='Описание' />
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                      Позиция
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>*/}
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

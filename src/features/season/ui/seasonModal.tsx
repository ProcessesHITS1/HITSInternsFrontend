import { Button, Col, DatePicker, Flex, Form, InputNumber, Modal, Row } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCreateSeasonMutation, useEditSeasonMutation } from '~features/season'
import { Season } from '~entities/season'

dayjs.extend(customParseFormat)

export interface SeasonModalProps {
  open: boolean
  close: () => void
  season: Season | null
}

const dateFormat = 'YYYY-MM-DD'
const minYear = 2015
const maxYear = 2030

export const SeasonModal = (props: SeasonModalProps) => {
  const { season, open, close } = props

  const [createSeason, createSeasonResult] = useCreateSeasonMutation()
  const [editSeason, editSeasonResult] = useEditSeasonMutation()
  const isResultLoading = createSeasonResult.isLoading || editSeasonResult.isLoading

  const [form] = Form.useForm()
  const watch = Form.useWatch([], form)
  const yearIsValid = watch?.year ? watch.year >= minYear && watch.year <= maxYear : false

  useEffect(() => {
    if (season) {
      form.setFieldsValue(season)
    } else {
      form.resetFields()
    }
  }, [season])

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
      form.resetFields()
    }
  }

  const onFinish = async (data: any) => {
    try {
      if (season) {
        await editSeason({ year: season.year, data }).unwrap()
      } else {
        await createSeason(data).unwrap()
      }
      form.resetFields()
      close()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={season ? 'Редактирование сезона' : 'Новый сезон'}
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form
        onFinish={onFinish}
        layout='vertical'
        validateTrigger='onChange'
        form={form}
        initialValues={
          season
            ? {
                year: season.year,
                interviews: [season.interviewStart, season.interviewEnd],
              }
            : {}
        }
      >
        <Row>
          <Col xs={24}>
            <Form.Item
              name='year'
              rules={[
                {
                  required: true,
                  message: 'Некорректный год',
                  type: 'number',
                  min: minYear,
                  max: maxYear,
                },
              ]}
              label={`Год (${minYear}-${maxYear})`}
            >
              <InputNumber
                className='w-full'
                placeholder='Введите год'
                autoComplete='off'
                controls={false}
                onChange={() => form.resetFields(['interviews'])}
              />
            </Form.Item>
            <Form.Item
              name='interviews'
              label='Даты собеседований'
              dependencies={['year']}
              rules={[{ required: true, message: 'Введите даты' }]}
            >
              <DatePicker.RangePicker
                className='w-full'
                maxDate={dayjs(
                  `${watch?.year ? watch.year + 1 : undefined}-03-01`,
                  dateFormat
                )}
                minDate={dayjs(`${watch?.year}-01-01`, dateFormat)}
                disabled={!yearIsValid}
                allowEmpty
              />
            </Form.Item>
            <Form.Item>
              <Flex>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='ms-auto'
                  disabled={isResultLoading}
                >
                  {season ? 'Сохранить' : 'Создать'}
                </Button>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

import { Button, Col, DatePicker, Flex, Form, InputNumber, Modal, Row } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  useCopySeasonMutation,
  useCreateSeasonMutation,
  useEditSeasonMutation,
} from '~features/season'
import { Season } from '~entities/season'

dayjs.extend(customParseFormat)

export interface SeasonModalProps {
  open: boolean
  close: () => void
  season: Season | null
  copy: boolean
}

const dateFormat = 'YYYY-MM-DD'
const minYear = 2015
const maxYear = 2030

export const SeasonModal = (props: SeasonModalProps) => {
  const { season, open, close, copy } = props

  const [createSeason, createSeasonResult] = useCreateSeasonMutation()
  const [editSeason, editSeasonResult] = useEditSeasonMutation()
  const [copySeason, copySeasonResult] = useCopySeasonMutation()
  const isResultLoading =
    createSeasonResult.isLoading ||
    editSeasonResult.isLoading ||
    copySeasonResult.isLoading

  const [form] = Form.useForm()
  const watch = Form.useWatch([], form)
  const yearIsValid = watch?.year ? watch.year >= minYear && watch.year <= maxYear : false

  useEffect(() => {
    if (season) {
      if (open) {
        form.setFieldsValue({
          year: season.year,
          seasonDates: [
            dayjs(season.seasonStart.slice(0, 10), dateFormat),
            dayjs(season.seasonEnd.slice(0, 10), dateFormat),
          ],
        })
      }
    } else {
      form.resetFields()
    }
  }, [season, open])

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
    }
  }

  const onFinish = async (rawData: any) => {
    try {
      const data = {
        year: rawData.year,
        seasonStart: rawData.seasonDates[0]?.format(dateFormat) + 'T00:00:00Z',
        seasonEnd: rawData.seasonDates[1]?.format(dateFormat) + 'T00:00:00Z',
      }
      if (season) {
        await editSeason({ year: season.year, data }).unwrap()
      } else {
        if (copy) {
          await copySeason(data as any).unwrap()
        } else {
          await createSeason(data).unwrap()
        }
      }
      close()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={
        copy ? 'Копирование сезона' : season ? 'Редактирование сезона' : 'Новый сезон'
      }
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
                interviews: [season.seasonStart, season.seasonEnd],
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
              />
            </Form.Item>
            <Form.Item
              name='seasonDates'
              label='Даты собеседований'
              rules={[{ required: true, message: 'Введите даты' }]}
            >
              <DatePicker.RangePicker
                className='w-full'
                defaultPickerValue={dayjs(`${watch?.year}-01-01`, dateFormat)}
                disabled={!yearIsValid}
                allowEmpty
                allowClear={false}
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

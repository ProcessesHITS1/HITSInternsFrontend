import { List } from 'antd'
import { Profession } from '../model'

export interface ProfessionListInterface {
  professions: Profession[]
}

export const ProfessionList = (props: ProfessionListInterface) => {
  return (
    <List
      className='w-full md:w-1/2 mt-5'
      dataSource={props.professions}
      bordered
      renderItem={(prof) => <List.Item>{prof.name}</List.Item>}
    />
  )
}

import { Table } from 'antd'
import cs from 'classnames'
import { UserInfo } from '../model'
import { userTableColumns } from './userTableColumns'

export interface UserTableProps {
  users: UserInfo[]
  className?: string
}

export const UserTable = (props: UserTableProps) => {
  const groups = [
    ...new Set(props.users.flatMap((user) => (user.group ? [user.group] : []))),
  ]
  return (
    <Table
      className={cs('w-full border-[1px] border-[lightgray] rounded', props.className)}
      pagination={{ pageSize: 20, showSizeChanger: false }}
      dataSource={props.users}
      columns={userTableColumns(groups)}
      rowKey={'id'}
    />
  )
}
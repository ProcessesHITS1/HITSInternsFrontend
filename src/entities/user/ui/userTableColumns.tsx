import { ColumnsType } from 'antd/lib/table'
import { getName, getRoleName } from '../lib'
import { Role, UserInfo } from '../model'

export const userTableColumns: (groups: UserInfo['group'][]) => ColumnsType<UserInfo> = (
  groups
) => [
  {
    title: 'ФИО',
    key: 'name',
    sorter: (a, b) => getName(a).localeCompare(getName(b)),
    render: (_, user) => getName(user),
  },
  {
    title: 'Группа',
    key: 'group',
    render: (_, user) => user.group ?? '—',
    filters: groups.map((group) => ({
      text: group,
      value: group,
    })),
    onFilter: (value, user) => user.group === (value as string),
  },
  {
    title: 'Почта',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'Телефон',
    key: 'phone',
    dataIndex: 'phone',
    responsive: ['md'],
  },
  {
    title: 'Роли',
    key: 'roles',
    dataIndex: 'roles',
    render: (_, user) =>
      user.roles.length
        ? user.roles.map((role) => getRoleName(role)).join(', ')
        : 'Нет ролей',
    filters: Object.values(Role).map((role) => ({
      text: getRoleName(role),
      value: role,
    })),
    onFilter: (value, user) => user.roles.includes(value as Role),
    defaultFilteredValue: [Role.ROLE_STUDENT],
    responsive: ['md'],
  },
]

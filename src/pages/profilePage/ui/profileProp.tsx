import { Typography } from 'antd'

export interface ProfilePropProps {
  name: string | undefined
  value: string | undefined
}

export const ProfileProp = (props: ProfilePropProps) => {
  return (
    <div className='flex flex-col'>
      <Typography.Text>{props.name}</Typography.Text>
      <Typography.Text type='secondary'>{props.value}</Typography.Text>
    </div>
  )
}

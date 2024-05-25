import { Profession } from '~entities/profession/@x/position'

export type Position = {
  description: string
  amount: number
  profession?: Profession | null | undefined
}

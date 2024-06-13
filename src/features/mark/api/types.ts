export type CreateRequirementReq = { description: string; semesterId: string }
export type CreateRequirementResp = void

export type CreateMarkReq = {
  studentInSemesterId: string
  body: {
    markRequirementId: string
    value: number
  }
}
export type CreateMarkResp = void

export type EditMarkReq = {
  id: string
  value: number
}
export type EditMarkResp = void

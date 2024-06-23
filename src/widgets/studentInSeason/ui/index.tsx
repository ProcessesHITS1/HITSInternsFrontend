import { SearchOutlined } from '@ant-design/icons'

import { Button, Checkbox, Flex, Input, Space } from 'antd'
import { useState } from 'react'
import { RequestModal } from '~features/request'
import {
  StudentInSeasonModal,
  StudentInSeasonRemoveModal,
} from '~features/studentInSeason'
import { Company } from '~entities/company'
import { Request } from '~entities/request'
import {
  EmploymentStatus,
  StudentInSeason,
  StudentInSeasonList,
  getEmplStatusName,
} from '~entities/studentInSeason'
import { UserInfo } from '~entities/user'

export interface StudentInSeasonSectionProps {
  companies: Company[]
  studentsInSeason: StudentInSeason[]
  students: UserInfo[]
  year: number
  isClosed: boolean
}

export const StudentInSeasonSection = (props: StudentInSeasonSectionProps) => {
  const { studentsInSeason, students, year, isClosed, companies } = props
  const [input, setInput] = useState(undefined as string | undefined)
  const [studentId, setStudentId] = useState('')
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false)
  const [reqModalState, setReqModalState] = useState({
    open: false,
    request: null as Request | null,
  })
  const [removeStudentModalState, setRemoveStudentModalState] = useState({
    open: false,
    studentId: null as string | null,
  })
  const [panelState, setPanelState] = useState({
    [EmploymentStatus.Employed]: true,
    [EmploymentStatus.Unemployed]: true,
  })

  const availableStudents = students.filter(
    (student) => !studentsInSeason.some((sIs) => sIs.id === student.id)
  )

  const checkbox = [EmploymentStatus.Unemployed, EmploymentStatus.Employed]

  const showStudentsInSeason = studentsInSeason.filter(
    (student) =>
      panelState[student.employmentStatus] &&
      (!input || student.name.toLowerCase().includes(input.toLowerCase()))
  )

  return (
    <>
      <RequestModal
        company={companies.find((c) => c.id === reqModalState.request?.companyId) || null}
        closed={isClosed}
        open={reqModalState.open}
        request={reqModalState.request}
        close={() => setReqModalState({ ...reqModalState, open: false })}
      />
      <StudentInSeasonModal
        students={availableStudents}
        year={year}
        open={addStudentModalOpen}
        close={() => setAddStudentModalOpen(false)}
      />
      <StudentInSeasonRemoveModal
        studentId={removeStudentModalState.studentId}
        open={removeStudentModalState.open}
        close={() =>
          setRemoveStudentModalState({ ...removeStudentModalState, open: false })
        }
        year={year}
      />
      <div className='flex flex-col items-center'>
        {!studentId && (
          <>
            <Space.Compact className='mb-2 w-1/2 md:w-1/4'>
              <Input
                disabled={!studentsInSeason.length}
                size='small'
                placeholder='Поиск по ФИО'
                prefix={<SearchOutlined />}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                allowClear={true}
              />
              <Button
                size='small'
                onClick={() => setAddStudentModalOpen(true)}
                disabled={isClosed || !availableStudents.length}
              >
                Добавить
              </Button>
            </Space.Compact>

            <Flex className='mb-2'>
              {studentsInSeason.length > 0 &&
                checkbox.map((item, i) => (
                  <Checkbox
                    key={i}
                    checked={panelState[item]}
                    onClick={() =>
                      setPanelState({ ...panelState, [item]: !panelState[item] })
                    }
                  >
                    {getEmplStatusName(item)}
                  </Checkbox>
                ))}
            </Flex>
          </>
        )}
        <StudentInSeasonList
          companies={companies}
          seasonYear={year}
          studentId={studentId}
          setStudentId={setStudentId}
          isClosed={isClosed}
          studentsInSeason={showStudentsInSeason}
          openRemoveModal={(studentId) =>
            setRemoveStudentModalState({ studentId, open: true })
          }
          openReqModal={(request) => setReqModalState({ open: true, request })}
        />
      </div>
    </>
  )
}

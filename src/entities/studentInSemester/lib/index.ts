import { useGetCompaniesQuery } from '~entities/company/@x/studentInSemester'
import { useGetAllUsersQuery } from '~entities/user/@x'
import { useGetAllStudentsInSemestersQuery } from '../api'
import { StudentInSemesterNormal } from '../model'

export const useGetNormalStudentsInSemester = (semesterId: string) => {
  const studentsInSemesters = useGetAllStudentsInSemestersQuery({ page: 1, size: 10000 })
  const studentsQuery = useGetAllUsersQuery({ page: 1, size: 10000 })
  const companiesQuery = useGetCompaniesQuery({ page: 1, size: 10000 })

  const isFetching =
    studentsInSemesters.isFetching ||
    studentsQuery.isFetching ||
    companiesQuery.isFetching
  const isLoading =
    studentsInSemesters.isLoading || studentsQuery.isLoading || companiesQuery.isLoading
  const isError =
    studentsInSemesters.isError || studentsQuery.isError || companiesQuery.isError

  const filteredData = studentsInSemesters.data?.data.filter(
    (record) => record.semesterId === semesterId
  )

  const mappedData: StudentInSemesterNormal[] = []

  filteredData?.forEach((record) => {
    mappedData.push({
      ...record,
      company: companiesQuery.data?.data.find(
        (company) => company.id === record.companyId
      ),
      student: studentsQuery.data?.data.find(
        (student) => student.id === record.studentId
      ),
    })
  })

  return {
    isFetching,
    isLoading,
    isError,
    data: mappedData,
  }
}

'use client'
import {
  EmployeeEditor,
  IconPlus,
  Layout,
  LayoutBody,
  Spinner,
} from '../components'
import { HRMenu } from './components'
import { Employee } from '@/app/business/domain/models'
import { NumberUtils } from '../business/utils'
import { useEffect, useState } from 'react'
9
export default function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(
    {} as Employee
  )
  const [isLoading, setIsLoading] = useState(true)
  const [showEditor, setShowEditor] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const httpResponse = await fetch(
      'http://localhost:3000/api/employees'
    ).then((response) => response.json())
    setEmployees(httpResponse)
    setIsLoading(false)
  }

  const handleCloseDetail = () => {
    setSelectedEmployee({} as Employee)
    setShowEditor(false)
  }

  const handleOpenDetalhe = (employee?: Employee) => {
    if (employee) setSelectedEmployee(employee)
    setShowEditor(true)
  }

  return (
    <Layout>
      {showEditor && (
        <EmployeeEditor
          employee={selectedEmployee}
          show={showEditor}
          onClose={handleCloseDetail}
        />
      )}
      <LayoutBody>
        <div className="flex flex-col gap-2">
          <HRMenu />
          <div>
            <button
              className="bg-gray-600 px-2 py-1 rounded-md text-gray-200"
              title="Novo funcionário"
              onClick={() => handleOpenDetalhe()}
            >
              <IconPlus />
            </button>
          </div>
          Funcionários {!isLoading && `(${employees.length})`}
          {isLoading ? (
            <Spinner data="Carregando funcionários..." />
          ) : (
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {employees.map((employee) => (
                <li key={employee.id} className="p-4 shadow">
                  <div>{employee.name}</div>
                  <div className="text-sm">
                    {NumberUtils.format(employee.phone1)}
                  </div>
                  <button onClick={() => handleOpenDetalhe(employee)}>
                    Detalhe
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </LayoutBody>
    </Layout>
  )
}

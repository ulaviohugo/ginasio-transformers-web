import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { DateUtils, GraphHtmlRefProps, GraphUtils, GraphValueProps } from '@/utils'
import { HttpStatusCode } from '@/data/protocols/http'
import { Spinner } from './spinner'
import { Button, Input, Select } from './form-controls'
import { IconSearch } from './icons'
import { GymModel } from '@/domain/models/gym'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'

type FilterDataProps = {
  year: number
  gym_id: number
}

export type HomeGraphDataProps = {
  monthly_fees: GraphValueProps[]
}

type HomeGraphProps = {
  data: HomeGraphDataProps
}

export function HomeGraph({ data }: HomeGraphProps) {
  const [loading, setLoading] = useState(true)
  const [graphData, setGraphData] = useState<HomeGraphDataProps>({ monthly_fees: [] })
  const [gyms, setGyms] = useState<GymModel[]>([])

  const user = useSelector(useAuth())
  const isAdmin = user.gym_id != null

  const currentDate = new Date()
  const [filterData, setFilterData] = useState<FilterDataProps>({
    year: currentDate.getFullYear(),
    gym_id: '' as any
  })

  const handleFilterInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFilterData({ ...filterData, [name]: value })
  }

  const fetchData = () => {
    const { year, gym_id } = filterData
    setLoading(true)
    makeAuthorizeHttpClientDecorator()
      .request({
        method: 'post',
        url: makeApiUrl('/graphs/monthly-fees'),
        body: { year, gym_id }
      })
      .then(({ body, statusCode }) => {
        console.log({ body, statusCode })
        if (statusCode != HttpStatusCode.ok) return toast.error(body)
        setGraphData(body)
      })
      .catch(({ message }) => toast.error(message))
      .finally(() => setLoading(false))
  }

  const fetchDataGym = async (queryParams?: string) => {
    const httpResponse = await makeAuthorizeHttpClientDecorator().request({
      url: makeApiUrl('/gym' + (queryParams || '')),
      method: 'get'
    })
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      setGyms(httpResponse.body)
    } else {
      toast.error(httpResponse.body)
    }
  }

  useEffect(() => {
    fetchDataGym()
  }, [])

  useEffect(() => {
    if (user.gym_id) {
      setFilterData({ ...filterData, gym_id: user.gym_id })
    }
  }, [user.gym_id])

  useEffect(() => {
    if (gyms.length > 0) {
      fetchData()
    }
  }, [gyms, filterData.year, filterData.gym_id])  // Chama fetchData quando gyms, year, ou gym_id mudar

  const operationChartRef = useRef<GraphHtmlRefProps>(null)

  useEffect(() => {
    GraphUtils.buildGraph({
      title: 'Mensalidades',
      data: graphData.monthly_fees,
      htmlRef: operationChartRef,
      graphType: 'bar'
    })
  }, [graphData])

  return (
    <div>
      <fieldset className="inline-flex gap-2 mb-3">
        <legend>Filtro</legend>
        <Input
          type="number"
          name="year"
          label="Ano"
          value={filterData.year}
          onChange={handleFilterInputChange}
        />
        <Select
          name="gym_id"
          onChange={handleFilterInputChange}
          label="Selecione a Filial"
          required
          data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
          value={isAdmin ? user.gym_id : filterData?.gym_id || ''}
          defaultText="Selecione"
          disabled={isAdmin}
        />
        <div className="flex items-end">
          <Button
            variant="gray-light"
            text="Filtrar"
            rightIcon={IconSearch}
            isLoading={loading}
            className="h-7"
            onClick={fetchData}
          />
        </div>
      </fieldset>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 border">
          <canvas ref={operationChartRef} />
        </div>
      </div>
    </div>
  )
}

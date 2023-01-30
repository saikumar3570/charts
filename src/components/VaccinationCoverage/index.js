import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {details} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return `${number.toString()}k`
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={details}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationCoverage

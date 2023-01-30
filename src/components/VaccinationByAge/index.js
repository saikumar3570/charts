import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {ageDetails} = props
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={ageDetails}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#2d87bb" />
            <Cell name="Female" fill="#a3df9f" />
            <Cell name="Others" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge

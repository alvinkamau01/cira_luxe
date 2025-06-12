"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Direct", value: 35 },
  { name: "Social", value: 45 },
  { name: "Referral", value: 20 },
]

const COLORS = ["#4318FF", "#80CAEE", "#22C55E"]

const VisitorsAnalytics=()=>{
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Visitors Analytics</h3>
        <select className="text-sm bg-transparent border-none">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VisitorsAnalytics
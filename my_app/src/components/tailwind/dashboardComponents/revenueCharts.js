"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const data = [
  { month: "Sep", revenue: 20, sales: 30 },
  { month: "Oct", revenue: 12, sales: 25 },
  { month: "Nov", revenue: 22, sales: 35 },
  { month: "Dec", revenue: 13, sales: 45 },
  { month: "Jan", revenue: 20, sales: 35 },
  { month: "Feb", revenue: 35, sales: 65 },
  { month: "Mar", revenue: 20, sales: 50 },
  { month: "Apr", revenue: 45, sales: 58 },
  { month: "May", revenue: 20, sales: 35 },
  { month: "Jun", revenue: 30, sales: 40 },
  { month: "Jul", revenue: 45, sales: 50 },
]

const  RevenueChart=()=>{
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <h3 className="font-medium">Total Revenue</h3>
          </div>
          <p className="text-sm text-gray-500">12.04.2022 - 12.05.2022</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Day</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Week</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Month</button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#4318FF" strokeWidth={2} />
            <Line type="monotone" dataKey="sales" stroke="#80CAEE" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart
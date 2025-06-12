import { MoreHorizontal, Search } from "lucide-react"

const orders = [
  {
    id: "3210",
    name: "Cortie Gemson",
    date: "May 23, 2021",
    total: "$239,00",
    status: "Processing",
  },
  {
    id: "3210",
    name: "Mathilde Tumilson",
    date: "May 15, 2021",
    total: "$650,50",
    status: "Shipped",
  },
  {
    id: "3210",
    name: "Audrye Heaford",
    date: "Apr 24, 2021",
    total: "$100,00",
    status: "Completed",
  },
  {
    id: "3210",
    name: "Brantley Mell",
    date: "Apr 10, 2021",
    total: "$19",
    status: "Refunded",
  },
  {
    id: "3210",
    name: "Dominique Enriques",
    date: "March 5, 2021",
    total: "$150,00",
    status: "Cancelled",
  },
]

const getStatusColor = (status) => {
    const colors = {
      Processing: "bg-orange-100 text-orange-600",
      Shipped: "bg-gray-900 text-white",
      Completed: "bg-green-100 text-green-600",
      Refunded: "bg-orange-100 text-orange-600",
      Cancelled: "bg-red-100 text-red-600",
    }
    return colors[status] || "bg-gray-100 text-gray-600"
  }
  

const OrdersTable= () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center gap-4">
        <button className="px-4 py-2 text-sm font-medium">All Orders</button>
        <div className="relative">
          <button className="px-4 py-2 text-sm font-medium border rounded-lg flex items-center gap-2">
            Sort by
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </button>
        </div>
        <div className="relative">
          <button className="px-4 py-2 text-sm font-medium border rounded-lg">
            10
            <svg className="w-4 h-4 inline-block ml-2" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="search"
            placeholder="Search"
            className="w-full max-w-xs pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">Actions</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="w-4 p-4">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="w-4 p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-6 py-4">
                  <span className="text-orange-500">#{order.id}</span>
                </td>
                <td className="px-6 py-4">{order.name}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersTable
import  Header  from "./dashboardComponents/header"
import OrdersTable  from "./dashboardComponents/ordersTable"
import  Sidebar  from "./dashboardComponents/sideBar"

const Dashboard=()=>{
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-4 rounded-full bg-purple-600" />
            <span className="text-purple-600">Dashboard</span>
            <span className="text-gray-400">→</span>
            <span>Orders</span>
          </div>
          <OrdersTable />
        </main>
      </div>
    </div>
  )
}



export default Dashboard
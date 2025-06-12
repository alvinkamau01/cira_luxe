
import { BarChart2, Box, Mail, MessageCircle, ShoppingBag, Users, FileText, User } from "lucide-react"

const  Sidebar=()=>{
  return (
    <div className="w-64 min-h-screen bg-white border-r">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <image
            src="/placeholder.svg?height=48&width=48"
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium">Timotheus Bendan</h3>
            <p className="text-sm text-gray-500">Sales Manager</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-medium text-gray-400 mb-2">E-Commerce</p>
        <nav className="space-y-1">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <BarChart2 className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a
            href="/orders"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg bg-purple-50 text-purple-600"
          >
            <Box className="w-5 h-5" />
            <span>Orders</span>
            <span className="ml-auto">→</span>
          </a>
          <a
            href="/products"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Products</span>
            <span className="ml-auto">→</span>
          </a>
          <a
            href="/customers"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </a>
          <a
            href="/invoices"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <FileText className="w-5 h-5" />
            <span>Invoices</span>
            <span className="ml-auto">→</span>
          </a>
        </nav>

        <p className="text-sm font-medium text-gray-400 mt-8 mb-2">Apps</p>
        <nav className="space-y-1">
          <a href="/chats" className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
            <MessageCircle className="w-5 h-5" />
            <span>Chats</span>
            <span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
          </a>
          <a href="/email" className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
            <Mail className="w-5 h-5" />
            <span>Email</span>
            <span className="ml-auto">→</span>
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;
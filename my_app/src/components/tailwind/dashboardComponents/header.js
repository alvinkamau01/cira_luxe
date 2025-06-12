import { Bell, Search, ShoppingCart } from "lucide-react"

const Header=()=>{
  return (
    <header className="bg-white border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <a href="/" className="text-red-500 text-2xl font-bold">
          Vetra
        </a>
        <h1 className="text-xl font-semibold ml-8">Orders</h1>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </button>
          <button className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}


export default Header

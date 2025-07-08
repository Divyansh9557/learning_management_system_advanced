'use client'

import { Input } from "@/components/ui/input"
import { useFilterParams } from "@/hooks/useQueryState"
import { Search } from "lucide-react"

export const AdminUserSeach =()=>{
    const [filter,setFilter] = useFilterParams()
    return (<>
     <div className="flex justify-between items-center">
        <div className="space-y-2 mb-2 " >
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-white/60">
            Manage users, roles, and permissions
          </p>
        </div>
       
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-4 ">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            value={filter.search}
            onChange={(e) => setFilter({search: e.target.value})}
            placeholder="Search users..."
            className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40"
          />
        </div>
        
      </div>
    </>)
}
import { UserTable } from "@/components/UserTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserPlus } from "lucide-react"

const UserManagement = () => {
  // Mock users data for the table
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Student", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Instructor", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Student", status: "Pending" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Student", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-white/60">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            placeholder="Search users..."
            className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40"
          />
        </div>
        <Button variant="outline" className="bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.05]">Filter</Button>
      </div>

      {/* Users Table */}
      <UserTable users={users} />
    </div>
  )
}

export default UserManagement
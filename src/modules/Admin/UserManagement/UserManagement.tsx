'use client'
import { UserTable } from "@/components/UserTable"
import { useFilterParams } from "@/hooks/useQueryState"
import { USER_PER_PAGE } from "@/lib/constants"
import { CoursePagination } from "@/modules/User/Browse/CoursePagination"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

const UserManagement = () => {
  // Mock users data for the table
  // const users = [
  //   { id: 1, name: "John Doe", email: "john@example.com", role: "Student", status: "Active" },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Instructor", status: "Active" },
  //   { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Student", status: "Pending" },
  //   { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin", status: "Active" },
  //   { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Student", status: "Inactive" },
  // ];
  const [filter] = useFilterParams()

  const trpc = useTRPC()
  const {data:users} = useSuspenseQuery(
    trpc.admin.getUser.queryOptions({search:filter.search,page:filter.page})
  )


  return (
    <div className="space-y-6">
     

      {/* Users Table */}
      <UserTable users={users} />
      <CoursePagination  limit={USER_PER_PAGE} totalPage={users.totalPage.total-1} />
    </div>
  )
}

export default UserManagement
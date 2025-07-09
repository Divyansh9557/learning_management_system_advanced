'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  UserCheck, Trash2 } from "lucide-react";
import { adminDashboardCourse, userGetOne } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useFilterParams } from "@/hooks/useQueryState";


interface UserTableProps {
  users?: userGetOne;
  compact?: boolean;
  adminUser?:adminDashboardCourse
}


export function UserTable({adminUser, users, compact = false }: UserTableProps) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const  [filter]= useFilterParams()
  
  
  const {mutate:deleteUser,isPending:isDeleting} = useMutation(
  trpc.admin.deleteUser.mutationOptions({
    onSuccess:async()=>{
        queryClient.invalidateQueries(
          trpc.admin.getUser.queryOptions({search:filter.search,page:filter.page})
        )
    }
  })
)
const {mutate:updateUser,isPending:isPromoting} = useMutation(
  trpc.admin.promoteUser.mutationOptions({
    onSuccess:async()=>{
        queryClient.invalidateQueries(
          trpc.admin.getUser.queryOptions({search:filter.search,page:filter.page})
        )
    }
  })
)
const {mutate:demoteUser,isPending:isDemoting} = useMutation(
  trpc.admin.demoteUser.mutationOptions({
    onSuccess:async()=>{
        queryClient.invalidateQueries(
          trpc.admin.getUser.queryOptions({search:filter.search,page:filter.page})
        )
    }
  })
)

const handlePromote = (userId: string,userRole:string) => {
  if(userRole==="student"){

    updateUser({userId})
  }
  else{
       demoteUser({userId})
  }
};
 

  const handleDelete = (userId: string) => {
    deleteUser({userId})
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.08] overflow-y-auto rounded-lg backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-white/[0.08] hover:bg-white/[0.02]">
            <TableHead className="text-white/80">Name</TableHead>
            <TableHead className="text-white/80">Email</TableHead>
            <TableHead className="text-white/80">Role</TableHead>
            <TableHead className="text-white/80">Status</TableHead>
            {!compact && <TableHead className="text-white/80">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
           {
            adminUser ? (<>
             {adminUser.allUsers.slice(0,5).map((user) => (
            <TableRow key={user.id} className="border-white/[0.08] hover:bg-white/[0.02]">
              <TableCell className="font-medium text-white">{user.name}</TableCell>
              <TableCell className="text-white/70">{user.email}</TableCell>
              <TableCell>
                <Badge 
                  variant="secondary"
                  className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  // variant={user.status === "Active" ? "default" : "secondary"}
                  className={"bg-green-500/20 text-green-300 border-green-500/30"}
                >
                  active
                </Badge>
              </TableCell>
             
            </TableRow>
          ))}
            </>):(<>
             {users?.existUser.map((user) => (
            <TableRow key={user.id} className="border-white/[0.08] hover:bg-white/[0.02]">
              <TableCell className="font-medium text-white">{user.name}</TableCell>
              <TableCell className="text-white/70">{user.email}</TableCell>
              <TableCell>
                <Badge 
                  variant="secondary"
                  className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  // variant={user.status === "Active" ? "default" : "secondary"}
                  className={"bg-green-500/20 text-green-300 border-green-500/30"}
                >
                  active
                </Badge>
              </TableCell>
              {!compact && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      disabled={isDemoting || isPromoting }
                      variant="outline"
                      onClick={() => handlePromote(user.id,user.role)}
                      className="bg-white/[0.03] cursor-pointer border-white/[0.08] hover:text-white text-white hover:bg-white/[0.05]"
                    >
                      <UserCheck className="h-4 w-4" />
                      {
                        user.role ==="student" ?"promote":"demote"
                      }
                    </Button>
                    
                    <Button
                      size="sm"
                      disabled={isDeleting}
                      variant="outline"
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500/10 cursor-pointer border-red-500/30 hover:text-white text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
            </>)
           }
        </TableBody>
      </Table>
    </div>
  );
}
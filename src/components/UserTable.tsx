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
import {  UserCheck, Ban, Trash2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  compact?: boolean;
}

export function UserTable({ users, compact = false }: UserTableProps) {
  const handlePromote = (userId: number) => {
    console.log(`Promoting user ${userId}`);
  };

  const handleBan = (userId: number) => {
    console.log(`Banning user ${userId}`);
  };

  const handleDelete = (userId: number) => {
    console.log(`Deleting user ${userId}`);
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.08] rounded-lg backdrop-blur-sm">
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
          {users.map((user) => (
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
                  variant={user.status === "Active" ? "default" : "secondary"}
                  className={user.status === "Active" 
                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              {!compact && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePromote(user.id)}
                      className="bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.05]"
                    >
                      <UserCheck className="h-4 w-4" />
                      Promote
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBan(user.id)}
                      className="bg-orange-500/10 border-orange-500/30 text-orange-300 hover:bg-orange-500/20"
                    >
                      <Ban className="h-4 w-4" />
                      Ban
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
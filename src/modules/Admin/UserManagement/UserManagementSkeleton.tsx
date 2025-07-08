'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface UserTableSkeletonProps {
  rows?: number;
  compact?: boolean;
}

export function UserTableSkeleton({ rows = 5, compact = false }: UserTableSkeletonProps) {
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
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i} className="border-white/[0.08] hover:bg-white/[0.02]">
              <TableCell><Skeleton className="h-4 w-24 bg-white/10" /></TableCell>
              <TableCell><Skeleton className="h-4 w-40 bg-white/10" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16 rounded-md bg-white/10" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16 rounded-md bg-white/10" /></TableCell>
              {!compact && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-20 rounded-md bg-white/10" />
                    <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
                    <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
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

'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useFilterParams } from "@/hooks/useQueryState"

export const CourseModerationHeader = () => {
  const [filter, setFilter] = useFilterParams()

  const handleClear = () => {
    setFilter({  status: "" })
  }

  const hasActiveFilter =   !!filter.status

  return (
    <div className="space-y-3 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Course Moderation</h1>
          <p className="text-white/60">Review and moderate course submissions</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-white/40">Courses awaiting approval</p>
          </CardContent>
        </Card>
        <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">
              Flagged Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">3</div>
            <p className="text-xs text-white/40">Courses needing attention</p>
          </CardContent>
        </Card>
        <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">
              Approved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">12</div>
            <p className="text-xs text-white/40">Courses published</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            value={filter.search || ""}
            onChange={(e) => setFilter({ search: e.target.value })}
            placeholder="Search courses..."
            className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40"
          />
        </div>

        <Select
          onValueChange={(value) => setFilter({ status: value })}
          value={filter.status || ""}
        >
          <SelectTrigger className="w-[180px] bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.05]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-[#111] text-white border-white/[0.08]">
            <SelectItem value="published">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="pending_approval">Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* Conditionally render clear button */}
        {hasActiveFilter && (
          <Button
            variant="ghost"
            onClick={handleClear}
            className="text-white hover:text-red-400"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}

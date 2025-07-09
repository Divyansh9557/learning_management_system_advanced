'use client'
import { useFilterParams } from "@/hooks/useQueryState";
import { Filter, Search } from "lucide-react"


const BrowsePageHeader = () => {
      const categories = [
        "all",
        "Programming",
        "Design",
        "Business",
        "Marketing",
       
      ];
      

      const [filter,setFilter] = useFilterParams()

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Browse Courses</h1>
          <p className="text-gray-400">
            Discover new skills with our comprehensive course catalog
          </p>
        </div>

{/* Search and Filters */}
<div className=" rounded-xl p-6 shadow-sm border border-gray-700 mb-8">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
    
    {/* Search Bar */}
    <div className="relative w-full lg:flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
        type="text"
        placeholder="Search courses, instructors..."
        className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white"
      />
    </div>

    {/* Filter Select with Icon Inside Input */}
   <div className="w-full sm:w-auto relative">
  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
  <select
    value={filter.category}
    onChange={(e) => setFilter({ category: e.target.value })}
    className="w-full sm:w-auto appearance-none pl-10 pr-8 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 truncate"
  >
    {categories.map((category) => (
      <option key={category} value={category} className="bg-gray-700  text-white">
        {category === "all" ? "All Categories" : category}
      </option>
    ))}
  </select>
</div>
  </div>
</div>


      </div>
    </div>
  );
}

export default BrowsePageHeader
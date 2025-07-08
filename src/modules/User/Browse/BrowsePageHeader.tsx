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
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={filter.search}
                onChange={(e) => setFilter({ search: e.target.value })}
                type="text"
                placeholder="Search courses, instructors..."
                className="w-full pl-10 pr-4 py-3 border  border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700  text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filter.category}
                  onChange={(e) => setFilter({ category: e.target.value })}
                  className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowsePageHeader
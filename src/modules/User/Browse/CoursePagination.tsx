'use client'

import { Button } from "@/components/ui/button";
import { useFilterParams } from "@/hooks/useQueryState";

interface Props{
    totalPage:number;
    limit?:number;
}

export const CoursePagination = ({totalPage,limit=6}:Props) => {
     const [filter,setFilter] = useFilterParams()
  return (
      
<div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
  <Button

    variant="outline"
    disabled={filter.page === 1}
    onClick={() => setFilter((val) => ({ ...val, page: val.page - 1 }))}
    className={`min-w-[100px] ${
      filter.page === 1 ? 'opacity-50 cursor-not-allowed ' : ''
    }`}
  >
    Previous
  </Button>

  <div className='flex gap-2 items-center'>
    
  {
    [...new Array(Math.ceil(totalPage/limit))].map((_,index)=>{
      return (
        <button
          onClick={() => setFilter({ page: index + 1 })}
          key={index}
          className={` rounded-sm px-2 py-1  hover:bg-white/80 
          ${filter.page === index + 1 ? "bg-white/80 text-black " : "bg-white/10 text-white "}
        `}
        >
          {index + 1}
        </button>
      );
    })
  }
  </div>
  

  <Button
    variant="outline"
    disabled={filter.page >= Math.ceil(totalPage/limit) }
    onClick={() => setFilter((val) => ({ ...val, page: val.page + 1 }))}
className="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
  >
    Next
  </Button>
</div>
  )
}

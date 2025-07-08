import Sidebar from "@/components/Sidebar";

interface Props {
  children: React.ReactNode;
}


const layout = ({ children }: Props) => {
  return (
    <>
     <div className="  flex h-full w-full">
        <div >
       <Sidebar  userRole="admin" />

        </div>

       <div className="flex-1  overflow-y-auto  text-white p-6">
        {children}
      </div>
    </div>
    </>
  )
};

export default layout
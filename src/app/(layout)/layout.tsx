import Navbar from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
}

const layout = ({children}:Props) => {
  return (
   <>
   <Navbar/>
   {children}
   </>
  )
}

export default layout
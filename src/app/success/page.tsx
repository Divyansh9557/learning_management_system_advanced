import { Suspense } from "react"
import SuccessPage from "./SuccessPage"


const page = async() => {
    

  return (
    <Suspense fallback={<>Loading...</>}>
      <SuccessPage />
    </Suspense>
  );
}

export default page
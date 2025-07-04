
interface Props {
  children: React.ReactNode;
}

const layout = ({children}:Props) => {
  return (
    <div className="bg-black" >{children}</div>
  )
}

export default layout
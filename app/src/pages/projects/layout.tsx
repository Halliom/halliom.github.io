import { Outlet } from "react-router-dom"


export const ProjectsLayout: React.FC = () => {

  return (
    <div className="w-full px-4 md:px-0 md:max-w-[90vw] lg:max-w-xl pb-8">
      <Outlet />
    </div>
  )
}
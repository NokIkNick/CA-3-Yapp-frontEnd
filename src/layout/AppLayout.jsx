import { Outlet } from "react-router-dom"
import Header from "./Header"


export const AppLayout = ({setSearch}) => {
    return (
      <>
        <Header setSearch={setSearch} />
        <Outlet />
      </>
    )
  }
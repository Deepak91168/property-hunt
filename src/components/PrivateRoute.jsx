import { Outlet, Navigate } from "react-router";
import {useAuthStatus} from "../hooks/useAuthStatus";
import { Loader } from "./Loader";
export default function PrivateRoute(){
  const {loggedin, checkingstatus} = useAuthStatus();
  if (checkingstatus) {
    return <Loader/>
  }
  return loggedin ? <Outlet /> : <Navigate to="/singin" />;
};

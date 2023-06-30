import { Outlet, Navigate } from "react-router";
import {useAuthStatus} from "../hooks/useAuthStatus";
export default function PrivateRoute(){
  const {loggedin, checkingstatus} = useAuthStatus();
  if (checkingstatus) {
    return <h3>Loding...</h3>;
  }
  return loggedin ? <Outlet /> : <Navigate to="/singin" />;
};

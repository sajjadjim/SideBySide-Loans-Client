import { Navigate, Outlet, useLocation } from "react-router";
// import { useAuth } from "../contexts/AuthContext.jsx";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
const location = useLocation();
  if (loading) {
    return <div>
      <span className="loading loading-ring loading-lg"></span>
      </div>;
  }

  // (no children), render Outlet
  if (!children) {
    return user ? <Outlet /> : <Navigate state ={location.pathname} to="/login" replace />;
  }

 
  return user ? children : <Navigate state ={location.pathname} to="/login" replace />;
};

export default PrivateRoute;
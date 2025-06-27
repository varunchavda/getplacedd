import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (!user || user.role !== "recruiter") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

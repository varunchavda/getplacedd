import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (user && user.role === "recruiter") {
    return children;
  }

  return <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

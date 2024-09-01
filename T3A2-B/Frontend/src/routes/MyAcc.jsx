import sessionState from "./store";
import MyAccountDash from "../components/MyAcc/MyAccountDash";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyAcc = () => {
  const userData = sessionState((state) => state.userData);
  const isAuthenticated = sessionState((state) => state.isAuthenticated);

  // Redirect user to log in if logged out and no user data
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated == false) {
      navigate("/user/login");
    }
  }, [isAuthenticated]);

  if (!userData.firstName) {
    return (
      <div className="contentFrame">
        <h3>Loading request...</h3>
      </div>
    );
  }

  return (
    <div className="contentFrame">
      <div>
        <h4>
          Welcome {userData.firstName} {userData.lastName}
        </h4>
        <p>
          Manage your appointments, personal information, pet information, and
          your history with us.
        </p>
        <MyAccountDash />
      </div>
    </div>
  );
};

export default MyAcc;

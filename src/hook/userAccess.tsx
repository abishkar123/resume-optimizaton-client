import { getAuth } from "firebase/auth";

export const userAccess = () => {
  const auth = getAuth();
  const authToken = auth.currentUser?.emailVerified
  console.log(authToken)
  const storedToken = localStorage.getItem("authToken");

 
  return storedToken ? JSON.parse(storedToken):null
};

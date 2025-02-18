import axios from "axios";

const useAuth = () => {
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });

    return response.data();
  };

  const signup = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await axios.post("http://localhost:8080/signup", {
      username,
      email,
      password,
    });

    return response.data();
  };

  const fetchUser = () => {};

  return { signup, login, fetchUser };
};

export default useAuth;

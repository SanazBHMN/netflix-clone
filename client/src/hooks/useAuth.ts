import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

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

    const { token } = response.data;
    cookie.set("session_token", token);

    return response.data;
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
    const response = await axios.post("http://localhost:8080/auth/signup", {
      username,
      email,
      password,
    });

    const { token } = response.data;
    cookie.set("session_token", token);

    return response.data;
  };

  const fetchUser = () => {};

  return { signup, login, fetchUser };
};

export default useAuth;

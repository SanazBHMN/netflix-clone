import { createContext, useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

export type Inputs = {
  email: string;
  name: string;
  password: string;
};

enum Variant {
  SIGN_UP,
  LOGIN,
}

interface AuthFormContextType {
  register: UseFormRegister<Inputs> | null;
  errors: FieldErrors<Inputs>;
}

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null,
  errors: {},
});

function LoginPage() {
  const [variant, setVariant] = useState(Variant.LOGIN);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>();

  // console.log(errors);

  const { signup, login } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async ({ name, email, password }) => {
    try {
      if (variant === Variant.SIGN_UP) {
        await signup({
          username: name,
          email,
          password,
        });
      } else {
        await login({ email, password });
      }
      setAuthError("");
      navigate("/browse");
    } catch (error: any) {
      setAuthError(error.response.data.errors[0].msg);
    }
  };

  const handleChangeAuthVariant = () => {
    if (variant === Variant.LOGIN) setVariant(Variant.SIGN_UP);
    else setVariant(Variant.LOGIN);

    setAuthError("");
  };

  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-3xl mb-8 font-semibold">
            {variant === Variant.SIGN_UP ? "Sign Up" : "Login"}
          </h2>
          <AuthFormContext.Provider value={{ register, errors }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {variant === Variant.SIGN_UP && (
                <Input id="username" type="text" label="Username" name="name" />
              )}
              <Input
                id="email"
                type="email"
                label="Email address"
                name="email"
              />
              <Input
                id="password"
                type="password"
                label="Password"
                name="password"
                validate={
                  variant === Variant.SIGN_UP
                    ? () => {
                        const password = getValues("password");
                        if (password.length < 8) {
                          return "Password must be greater that 8 characters";
                        }
                        if (!/[A-Z]/.test(password)) {
                          return "Password must have at least one uppercase value";
                        }
                        if (!/[a-z]/.test(password)) {
                          return "Password must have at least one lowercase value";
                        }
                        if (!/\d/.test(password)) {
                          return "Password must have at lease one number";
                        }
                        return true;
                      }
                    : undefined
                }
              />
              <input
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />
              {authError && <p className="text-red-500">{authError}</p>}
            </form>
          </AuthFormContext.Provider>
          {variant === Variant.LOGIN ? (
            <p
              className="text-neutral-500 mt-12"
              onClick={handleChangeAuthVariant}
            >
              <span className="text-white ml-1 hover:underline cursor-pointer">
                First time using Netflix?
              </span>
            </p>
          ) : (
            <p
              className="text-neutral-500 mt-12"
              onClick={handleChangeAuthVariant}
            >
              <span className="text-white ml-1 hover:underline cursor-pointer">
                Already have an account?
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

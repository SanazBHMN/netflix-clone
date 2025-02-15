import { createContext, useState } from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import Input from "../components/Input";
import Navbar from "../components/Navbar";

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
}

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null,
});

function LoginPage() {
  const [variant, setVariant] = useState(Variant.LOGIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-3xl mb-8 font-semibold">
            {variant === Variant.SIGN_UP ? "Sign Up" : "Login"}
          </h2>
          <AuthFormContext.Provider value={{ register }}>
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
              />
              <input
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />
            </form>
          </AuthFormContext.Provider>
          {variant === Variant.LOGIN ? (
            <p
              className="text-neutral-500 mt-12"
              onClick={() => setVariant(Variant.SIGN_UP)}
            >
              <span className="text-white ml-1 hover:underline cursor-pointer">
                First time using Netflix?
              </span>
            </p>
          ) : (
            <p
              className="text-neutral-500 mt-12"
              onClick={() => setVariant(Variant.LOGIN)}
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

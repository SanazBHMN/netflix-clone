import { useState } from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";

enum Variant {
  SIGN_UP,
  LOGIN,
}

function LoginPage() {
  const [variant, setVariant] = useState(Variant.LOGIN);

  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-3xl mb-8 font-semibold">
            {variant === Variant.SIGN_UP ? "Sign Up" : "Login"}
          </h2>
          <form className="flex flex-col gap-4">
            {variant === Variant.SIGN_UP && (
              <Input id="username" type="text" label="Username" />
            )}
            <Input id="email" type="email" label="Email address" />
            <Input id="password" type="password" label="Password" />
            <input
              type="submit"
              className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
            />
          </form>
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

import Link from "next/link";
import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export type CredentialsTypes = {
  email: string;
  password: string;
};

const resolver: Resolver<CredentialsTypes> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
        username: {
          type: "required",
          message: "Please enter a valid username",
        },
        password: {
          type: "required",
          message: "Please enter a valid password",
        },
      }
      : {},
  };
};

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsTypes>({ resolver });

  const sendDetails = handleSubmit(async (data: CredentialsTypes) => {
    await fetch("http://localhost:3000/api/utility/findUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push("/");
  });

  return (
    <form
      className="w-full h-full flex flex-col space-y-4 px-8 items-center "
      onSubmit={sendDetails}
    >
      <input
        className="border-2 rounded-sm
                            border-amber-700 
                            border-double outline-offset-2
                            text-lg 
                            "
        type="text"
        id="uname"
        placeholder="email"
        {...register("email")}
      />

      {errors?.email && (
        <p className="font-bold text-red-600 uppercase ">
          {errors.email.message}
        </p>
      )}

      <input
        type="password"
        placeholder="Password"
        className="border-2 rounded-sm
                                border-amber-700 
                                border-double outline-offset-2
                                text-lg
                                "
        {...register("password")}
      />

      {errors?.password && (
        <p className="font-bold text-red-600 uppercase ">
          {errors.password.message}
        </p>
      )}

      <input
        className="rounded-l border-4 border-teal-600 bg-teal-600 w-auto mx-auto bg-gre"
        type="submit"
        value="Submit"
      />
      <h4>Not logged in? Register here!</h4>
      <Link href="/RegisterPage">
        <h1 className="flex font-bold border-4 border-teal-600 bg-teal-600 rounded-lg  w-32 justify-center items-center">
          Register
        </h1>
      </Link>
      <button onClick={() => signIn("email")}> Sign in with github</button>
    </form>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
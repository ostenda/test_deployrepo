import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

export type RegisterFormTypes = {
  username: string;
  password: string;
  email: string;
  motherMaidenName: string;
};

const schema = yup
  .object({
    username: yup.string().required().min(4),
    password: yup.string().required().min(10),
    email: yup.string().email().required(),
    motherMaidenName: yup.string().required(),
  })
  .required();

function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormTypes>({ resolver: yupResolver(schema) });

  const sendDetails = handleSubmit(async (data: RegisterFormTypes) => {
    await fetch("http://localhost:3000/api/utility/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push("/");
  });

  return (
    <>
      <div className="flex-column mx-auto justify-center items-center my-10">
        <h1
          className="flex justify-center font-bold border-4
             border-yellow-900
             text-xl
             rounded-lg"
        >
          Hi, you can find the register form below!
        </h1>
        <div
          className="container lm justify-center items-center my-20 border-8
            border-yellow-900 bg-yellow-700 rounded bg-opacity-40"
        >
          <div className="my-10">
            <form
              className="w-full h-full flex flex-col space-y-4 px-8 opacity-100 "
              onSubmit={sendDetails}
            >
              <input
                className="border-2 rounded-sm
                            border-amber-700 
                            border-double outline-offset-2
                            text-lg
                            text-center
                            "
                type="text"
                id="uname"
                placeholder="Username"
                {...register("username")}
              />

              {errors?.username && (
                <p className="font-bold text-red-600 uppercase ">
                  {errors.username.message}
                </p>
              )}

              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-sm
                                border-amber-700 
                                border-double outline-offset-2
                                text-lg
                                text-center
                                "
                {...register("password")}
              />

              {errors?.password && (
                <p className="font-bold text-red-600 uppercase ">
                  {errors.password.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Email"
                className="border-2 rounded-sm
                                border-amber-700 
                                border-double outline-offset-2
                                text-lg
                                text-center
                                "
                {...register("email")}
              />

              {errors?.email && (
                <p className="font-bold text-red-600 uppercase">
                  {errors.email.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Mother's maiden name"
                className="border-2 rounded-sm
                            border-amber-700 
                            border-double outline-offset-2
                            text-lg
                            text-center
                            "
                {...register("motherMaidenName")}
              />

              {errors?.motherMaidenName && (
                <p className="font-bold text-red-600 uppercase">
                  {errors.motherMaidenName.message}
                </p>
              )}

              <input
                className="rounded-l border-4 border-teal-600
                                bg-teal-600 w-auto mx-auto bg-gre"
                type="submit"
                value="Register now"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
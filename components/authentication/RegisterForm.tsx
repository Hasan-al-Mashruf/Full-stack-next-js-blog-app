"use client";

import { registerUser } from "@/apis/apis";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [loader, setLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.status) {
        toast.success("Registration is completed");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      if (isAxiosError(error)) {
        const response: any = error.response;
        toast.error(response?.data?.message ?? "Something occurred");
      }
    }
  };

  useEffect(() => {
    if (watch("name") && watch("email") && watch("password")) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [watch("name"), watch("email"), watch("password")]);
  return (
    <div className="w-1/3">
      <div className="border-2 p-5">
        <h2 className="text-3xl font-medium">Sign Up</h2>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              {...register("name", { required: true })}
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              {...register("password", { required: true })}
            />
          </div>

          <span className="block mt-1 mb-5">
            Don&apos;t have an account? <Link href="/login"> Sign in</Link>
          </span>

          <Button
            type="submit"
            variant={loader ? "outline" : "default"}
            disabled={isDisabled}
          >
            {loader ? (
              <img src="/loader.svg" alt="" className="h-10 mx-auto" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

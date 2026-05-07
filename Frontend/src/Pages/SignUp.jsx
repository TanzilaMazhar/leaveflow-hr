import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader } from "lucide-react";
import api from "../api";

const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .regex(
      /^[a-zA-Zà-žÀ-Ž' -]{3,50}$/,
      "Name must be 3-50 characters and can include letters, spaces, apostrophes, and hyphens"
    ),

  email: z
    .string({ required_error: "Email is required" })
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Email must be in proper format"
    ),

  password: z
    .string({ required_error: "Password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    ),

  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
});
function SignUp() {
  const navigate = useNavigate();

  //setUp
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, reset
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values) => {
    try {
      // Backend request
      const res = await api.post(
        "/api/auth/signup",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
      );

      toast.success(res.data.message || "Account created successfully!");
      reset();
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4" >
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Sign Up
        </h1>
        <p className="text-gray-600 mb-6 text-center">Create your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your Name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500"
            />
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
            {isSubmitting ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center mt-2 sm:mt-2">
            <span className="text-gray-600 mr-1">Already have an account?</span>
            <button
              type="button"
              className="text-purple-600 font-medium hover:underline"
              onClick={() => navigate("/signin")} >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;


// npm install react-hook-form
//npm i zod
//npm install @hookform/resolvers

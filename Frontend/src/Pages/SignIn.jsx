import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Loader } from "lucide-react";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("password is required"),
});

function SignIn() {
  const navigate = useNavigate();

  //setUp
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin", values,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Signed in successfully!");

      localStorage.setItem("LoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Sign In</h1>
        <p className="text-gray-600 mb-6 text-center">Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-purple-500"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-purple-500"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            )}
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
              "Sign In"
            )}

          </button>
          <div className="text-center mt-2 sm:mt-2">
            <span className="text-gray-600 mr-1">Don’t have an account?</span>
            <button
              type="button"
              className="text-purple-600 font-medium hover:underline"
              onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

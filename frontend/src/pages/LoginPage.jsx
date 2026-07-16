import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
const LoginPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const loginMutation = useLogin();
  // React Query mutation hook for user registration

  const { login } = useContext(AuthContext)

  const onSubmit = async (data) => {
    console.log("DATA: ", data);
    loginMutation.mutate(data, {
      onSuccess: ({ data }) => {
        login(data.payload);
        console.log("User logged in:", data.payload);
        console.log("Login successful");
      },
      onError: (e) => {
        console.log("Error: " + e);
      }
    });

  };

  return (
    // Background Wrapper: पूरे स्क्रीन को कवर करने और सेंटर करने के लिए
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

      {/* Form Container Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        {/* Header / Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Email Field Group */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
              type="email"
              placeholder="name@company.com"
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 ${errors.email
                ? "border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/30"
                : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                }`}
            />
            {/* Error Message for Email */}
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field Group */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required"
              })}
              type="password"
              placeholder="••••••••"
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 ${errors.password
                ? "border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/30"
                : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                }`}
            />
            {/* Error Message for Password */}
            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          {/* Extra Options (Optional: Forgot Password Link) */}
          <div className="flex items-center justify-end text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-150">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition duration-200 flex items-center justify-center ${isSubmitting
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                {/* Simple Tailwind Loading Spinner */}
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Sign In"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
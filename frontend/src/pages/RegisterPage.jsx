import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useRegister } from "../hooks/useAuth.js";
import { AuthContext } from "../context/auth.context.jsx";

const RegisterPage = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const registerMutation = useRegister();
  const { login } = useContext(AuthContext); // was called before but never imported — wired up here

  const [showPassword, setShowPassword] = useState(false);

  // Pull a human-readable message out of whatever shape the backend error takes
  const getErrorMessage = (error) => {
    const status = error?.response?.status;
    const serverMessage = error?.response?.data?.message;

    if (status === 401 || status === 403) {
      return "Wrong credentials. Please double-check your details and try again.";
    }
    if (status === 409) {
      return serverMessage || "That username or email is already taken.";
    }
    return serverMessage || "Registration failed. Please try again.";
  };

  const onSubmit = (data) => {
    registerMutation.mutate(data, {
      onSuccess: ({ data }) => {
        login(data.payload);
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-indigo-100 border border-white/60">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create account</h2>
          <p className="text-sm text-slate-500 mt-2">Join us today — it only takes a minute.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              {...register("username", {
                required: "Username is required",
                maxLength: { value: 20, message: "Username cannot exceed 20 characters" },
              })}
              type="text"
              placeholder="johndoe"
              aria-invalid={errors.username ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200 ${
                errors.username
                  ? "border-red-400 focus:ring-red-200 focus:bg-white"
                  : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white"
              }`}
            />
            {errors.username && (
              <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Email address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200 ${
                errors.email
                  ? "border-red-400 focus:ring-red-200 focus:bg-white"
                  : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white"
              }`}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password with show/hide toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum password length is 6 characters" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                aria-invalid={errors.password ? "true" : "false"}
                className={`w-full px-4 py-3 pr-11 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200 ${
                  errors.password
                    ? "border-red-400 focus:ring-red-200 focus:bg-white"
                    : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.password.message}
              </p>
            )}
          </div>

          {/* Backend / credentials error */}
          {registerMutation.isError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-medium text-red-600 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{getErrorMessage(registerMutation.error)}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white tracking-wide shadow-md transition duration-200 transform active:scale-[0.99] ${
              registerMutation.isPending
                ? "bg-slate-400 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-indigo-200 hover:shadow-lg"
            }`}
          >
            {registerMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating account...
              </span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
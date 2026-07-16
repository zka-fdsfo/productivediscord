import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useAuth.js";

const RegisterPage = () => {
  // Destructuring form methods and validation states
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  // React Query mutation hook for user registration
  const registerMutation = useRegister();

  // Form submission handler
  const onSubmit = (data) => {
    console.log(data);
    registerMutation.mutate(data, {
      onSuccess: ({ data }) => {
        console.log("Registration successful");
        login(data.payload);
        console.log("User registered:", data.payload);
        reset(); // Clears form fields only after successful backend response
      },
      onError: (e) => {
        console.log("Error: " + e);
      }
    });
  };

  return (
    // Centered wrapper with a soft background gradient for a professional look
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">

      {/* Modern elevation card with glassmorphism touches */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">

        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-sm text-slate-500 mt-2">Join us today! Please enter your details.</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Username Field Group */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Username</label>
            <input
              {...register("username", {
                required: "Username is required",
                maxLength: {
                  value: 20,
                  message: "Username cannot exceed 20 characters"
                }
              })}
              type="text"
              placeholder="johndoe"
              aria-invalid={errors.username ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200 ${errors.username
                  ? "border-red-400 focus:ring-red-200 focus:bg-white"
                  : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white"
                }`}
            />
            {/* Username Validation Error Message */}
            {errors.username && (
              <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                ⚠️ {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field Group */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
              type="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200 ${errors.email
                  ? "border-red-400 focus:ring-red-200 focus:bg-white"
                  : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white"
                }`}
            />
            {/* Email Validation Error Message */}
            {errors.email && (
              <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field Group */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum password length is 6 characters"
                }
              })}
              type="password"
              placeholder="••••••••"
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200 ${errors.password
                  ? "border-red-400 focus:ring-red-200 focus:bg-white"
                  : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white"
                }`}
            />
            {/* Password Validation Error Message */}
            {errors.password && (
              <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          {/* Global Backend Error Notice */}
          {registerMutation.isError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-medium text-red-600">
              Registration failed. Please check your credentials and try again.
            </div>
          )}

          {/* Submit Button with Loading/Pending States */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white tracking-wide shadow-md transition duration-200 transform active:scale-[0.99] ${registerMutation.isPending
                ? "bg-slate-400 cursor-not-allowed shadow-none"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:shadow-lg"
              }`}
          >
            {registerMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                {/* Micro spinner animation for UX feedback */}
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating Account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

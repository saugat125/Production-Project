import axios from 'axios';
import { useForm } from 'react-hook-form';
import { getBaseURL } from '../apiConfig';
import { Link } from 'react-router-dom';

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    console.log(data);
    // Handle signup logic here
    try {
      const response = await axios.post(`${getBaseURL()}/user/register/`, {
        email: data.email,
        name: data.name,
        age: +data.age,
        gender: data.gender,
        password: data.password,
        password2: data.password2,
      });

      localStorage.setItem('token', response.data.token.access);
      localStorage.setItem('refreshToken', response.data.token.refresh);
      localStorage.setItem('name', response.data.name.split(' ')[0]);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setError('email', {
        type: 'manual',
        message: err.response.data.errors.email[0],
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(to_bottom,#b6ddf2,#f2f6fc)]">
      <div className="home pt-5 pl-10 absolute top-0 left-0">
        <Link to="/">
          <img src="/images/home.png" alt="" className="w-8 h-8" />
        </Link>
      </div>
      <section className="px-4 py-8 md:py-10">
        <div className="mx-auto max-w-lg rounded-3xl border bg-[linear-gradient(to_bottom,#c3f1fc,#FFFFFF)] px-6 py-8 shadow-custom sm:px-10 md:px-14 md:py-10">
          <div className="mb-4 flex justify-center">
            <div className="relative h-16 w-16">
              <img
                src="/images/in.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="mb-6 text-center md:mb-10">
            <h3 className="mb-1 text-xl font-semibold md:text-2xl">
              Create your account
            </h3>
            <p className="text-sm text-gray-600 md:text-base">
              Enter your credentials to create a new account
            </p>
          </div>

          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img
                      src="/images/name.png"
                      alt="Name icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full rounded-lg border p-2 pl-12 ${
                      errors.name ? 'border-red-500' : 'border-[#a3a3a3]'
                    }`}
                    {...register('name', { required: 'Full name is required' })}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img
                      src="/images/email.png"
                      alt="Email icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full rounded-lg border p-2 pl-12 ${
                      errors.email ? 'border-red-500' : 'border-[#a3a3a3]'
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img
                      src="/images/password.png"
                      alt="Password icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full rounded-lg border p-2 pl-12 ${
                      errors.password ? 'border-red-500' : 'border-[#a3a3a3]'
                    }`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img
                      src="/images/password.png"
                      alt="Password icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className={`w-full rounded-lg border p-2 pl-12 ${
                      errors.password2 ? 'border-red-500' : 'border-[#a3a3a3]'
                    }`}
                    {...register('password2', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                  />
                </div>
                {errors.password2 && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password2.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img
                      src="/images/age.png"
                      alt="Age icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="number"
                    placeholder="Age"
                    className={`w-full rounded-lg border p-2 pl-12 ${
                      errors.age ? 'border-red-500' : 'border-[#a3a3a3]'
                    }`}
                    {...register('age', {
                      required: 'Age is required',
                      min: {
                        value: 13,
                        message: 'You must be at least 13 years old',
                      },
                      max: {
                        value: 120,
                        message: 'Please enter a valid age',
                      },
                    })}
                  />
                </div>
                {errors.age && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img
                      src="/images/name.png"
                      alt="Gender icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <select
                    className={`w-full rounded-lg border p-2 pl-12 ${
                      errors.gender ? 'border-red-500' : 'border-[#a3a3a3]'
                    } ${!watch('gender') ? 'text-gray-400' : 'text-black'}`}
                    {...register('gender', {
                      required: 'Please select your gender',
                    })}
                  >
                    <option value="" className="text-gray-400">
                      Gender
                    </option>
                    <option value="M" className="text-black">
                      Male
                    </option>
                    <option value="F" className="text-black">
                      Female
                    </option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-2.5 text-white transition-colors hover:bg-gray-800"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Login */}
            <div className="mt-8 text-center text-sm">
              Already have an account?
              <Link to="/login" className="ml-1 font-semibold hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

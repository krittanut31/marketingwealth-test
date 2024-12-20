import React, { useState, useEffect } from "react";
import { formType } from "../type";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login, logout } from "../store/slices/userSlice";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [form, setForm] = useState<formType>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [layout, setLayout] = useState<string>("signin");
  const navigation = useNavigate();
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: formType) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignin = async () => {
    await axios
      .post("http://localhost:8000/user/signin", form, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(login());
        toast.success("Login success.");
        navigation("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Email or Password invalid.");
      });
  };

  const handleRegister = async () => {
    if (
      form.password === form.confirmPassword &&
      form.password.length > 0 &&
      form.confirmPassword.length > 0
    ) {
      await axios
        .post("http://localhost:8000/user/register", form)
        .then((res) => {
          toast.success("Register success.");
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data.message);
        });
    } else {
      toast.error(
        "Password and confirm password do not match. Please check again."
      );
    }
  };

  useEffect(() => {
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [layout]);

  if (token) {
    return <Navigate to={"/"} />;
  } else
    return (
      <main className="w-full h-[calc(100dvh-40px)] flex justify-center items-center bg-[#ddd]">
        <ToastContainer />
        <section className="w-[500px] h-[500px] bg-slate-800 rounded-2xl p-4">
          {
            {
              signin: (
                <div className="flex flex-col text-white gap-2">
                  <label className="font-bold" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="focus:outline-none text-black px-2 py-1"
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <label className="font-bold" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="focus:outline-none text-black px-2 py-1"
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="rounded-sm px-4 py-2 bg-[#1E3A8A] font-semibold mt-10"
                    onClick={() => handleSignin()}
                  >
                    Sign in
                  </button>
                  <p className="text-center">or</p>
                  <button
                    type="button"
                    className="rounded-sm px-4 py-2 bg-[#F97316] font-semibold"
                    onClick={() => setLayout("register")}
                  >
                    Register
                  </button>
                </div>
              ),
              register: (
                <div className="flex flex-col text-white gap-2">
                  <label className="font-bold" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="focus:outline-none text-black px-2 py-1"
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <label className="font-bold" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="focus:outline-none text-black px-2 py-1"
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <label className="font-bold" htmlFor="password">
                    Confirm Password
                  </label>
                  <input
                    className="focus:outline-none text-black px-2 py-1"
                    type="password"
                    id="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="rounded-sm px-4 py-2 bg-[#1E3A8A] font-semibold mt-10"
                    onClick={() => handleRegister()}
                  >
                    Register
                  </button>
                  <p className="text-center">or</p>
                  <button
                    type="button"
                    className="rounded-sm px-4 py-2 bg-[#F97316] font-semibold"
                    onClick={() => setLayout("signin")}
                  >
                    Sign in
                  </button>
                </div>
              ),
            }[layout]
          }
        </section>
      </main>
    );
};

export default Signin;

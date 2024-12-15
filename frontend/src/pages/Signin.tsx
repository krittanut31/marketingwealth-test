import React, { useState } from "react";
import { formType } from "../type";

const Signin = () => {
  const [form, setForm] = useState<formType>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [layout, setLayout] = useState<string>("signin");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: formType) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(form);

  return (
    <main className="w-full h-[calc(100dvh-40px)] flex justify-center items-center bg-[#ddd]">
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
                  type="submit"
                  className="rounded-sm px-4 py-2 bg-[#1E3A8A] font-semibold mt-10"
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
                  type="submit"
                  className="rounded-sm px-4 py-2 bg-[#1E3A8A] font-semibold mt-10"
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

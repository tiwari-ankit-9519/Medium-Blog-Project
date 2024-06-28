import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { SigninInput } from "@ankittiwari9519/medium-blog";
import LoadingComponent from "../components/LoadingComponent";
import axios from "axios";

export default function Signin() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFormData = {
      email: emailInputRef.current?.value || "",
      password: passwordInputRef.current?.value || "",
    };
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(
        `https://backend.pt713138.workers.dev/api/v1/signin`,
        newFormData
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/");
      setFormData(newFormData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <LoadingComponent />}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center bg-gray-100">
        <div className="lg:flex lg:flex-col md:hidden hidden gap-2 mx-10 my-5 md:my-10 lg:my-0">
          <p className="text-2xl font-medium text-justify">
            "The Customer Service that I received was exceptional. The support
            team went above and beyond to address my concerns"
          </p>
          <span className="font-medium">Jules Winnfield</span>
          <span className="text-gray-500">CEO, Acme Inc.</span>
        </div>

        <div className="flex flex-col justify-center items-center bg-white min-h-screen">
          <form
            onSubmit={handleFormSubmission}
            className="flex flex-col w-full px-5 md:p-0 md:w-1/2 gap-3"
          >
            <h1 className="text-3xl font-bold text-center">
              Log in to your Account
            </h1>
            <p className="text-gray-500 text-center">
              Not Registered Yet?{" "}
              <Link className="underline" to="/signup">
                Signup
              </Link>
            </p>
            <label className="font-medium">Email</label>
            <input
              type="text"
              ref={emailInputRef}
              className="p-2 focus: outline-none focus: border focus: border-gray-300 rounded"
              placeholder="Enter your email"
            />
            <label className="font-medium">Password</label>
            <input
              type="password"
              ref={passwordInputRef}
              className="p-2 focus: outline-none focus: border focus: border-gray-300 rounded"
              placeholder="********"
            />
            <button className="p-2 bg-gray-800 rounded text-white">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState, useRef, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@ankittiwari9519/medium-blog";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";

export default function Signup() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = {
      name: nameInputRef.current?.value || "",
      email: emailInputRef.current?.value || "",
      password: passwordInputRef.current?.value || "",
    };

    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(
        `https://backend.pt713138.workers.dev/api/v1/signup`,
        newFormData
      );
      const jwt = response.data.jwt;
      console.log(jwt);

      localStorage.setItem("token", jwt);
      setFormData(newFormData);
      setError(false);
      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingComponent />}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center bg-gray-100">
        <div className="flex flex-col justify-center items-center bg-white min-h-screen">
          <form
            onSubmit={handleFormSubmission}
            className="flex flex-col w-full px-5 md:p-0 md:w-1/2 gap-3"
          >
            <h1 className="text-3xl font-bold text-center">
              Create an Account
            </h1>
            <p className="text-gray-500 text-center">
              Already have an account?{" "}
              <Link className="underline" to="/signin">
                Login
              </Link>
            </p>
            <label className="font-medium">Name</label>
            <input
              type="text"
              ref={nameInputRef}
              className="p-2 focus: outline-none focus: border focus: border-gray-300 rounded"
              placeholder="Enter your name"
            />
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

        <div className="md:flex md:flex-col hidden gap-2 mx-10 my-5 md:my-10 lg:my-0">
          <p className="text-2xl font-medium text-justify">
            "The Customer Service that I received was exceptional. The support
            team went above and beyond to address my concerns"
          </p>
          <span className="font-medium">Jules Winnfield</span>
          <span className="text-gray-500">CEO, Acme Inc.</span>
        </div>
      </div>
    </>
  );
}

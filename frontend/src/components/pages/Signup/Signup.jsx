import React, { useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../redux/store";
import { setLoading } from "../../../redux/authslice";

const Signup = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispach = useDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] || null });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispach(setLoading(true));
      const formData = new FormData();
      formData.append("username", input.username);
      formData.append("email", input.email);
      formData.append("phonenumber", input.phonenumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispach(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-gray-200 rounded-lg shadow-sm p-6 my-10 bg-white"
        >
          <h1 className="font-bold text-2xl mb-6 text-center text-gray-800">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={input.username}
              name="username"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@email.com"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              value={input.phonenumber}
              name="phonenumber"
              onChange={changeEventHandler}
              placeholder="9999999999"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="mb-2 block">Select Role</Label>
            <RadioGroup defaultValue="student" className="flex gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            {/* Profile Upload */}
            <div className="flex items-center gap-2 mt-4">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                onChange={changeFileHandler}
                type="file"
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
            >
              signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;

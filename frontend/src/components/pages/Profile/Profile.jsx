import React, { useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Label } from "../../ui/label";
import AppliedJobTable from "../../ProfileComponent/AppliedJobTable/AppliedJobTable";
import UpdateProfileDialog from "../../ProfileComponent/UpdateProfileDialog/UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isHaveResume = !!user?.profile?.resume;
  const Skills = user?.profile?.skills;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 ">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
                alt="Profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-lg">{user?.username}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 ">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 ">
            <Contact />
            <span>{user?.phonenumber}</span>
          </div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1 flex-wrap">
              {Skills && Skills.length > 0 ? (
                Skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label className="text-md font-bold ">Resume</Label>
            {isHaveResume ? (
              <a
                target="_blank"
                href="https://youtube.com"
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName  || "Download Resume"}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Applicatoin Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

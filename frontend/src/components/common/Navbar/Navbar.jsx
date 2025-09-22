import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            job<span className="text-[#f83002]">portal</span>
          </h1>
        </div>

        {/* Menu + Profile */}
        <div className="flex items-center gap-10">
          {/* Menu */}
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            <li className="hover:text-[#f83002] cursor-pointer transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-[#f83002] cursor-pointer transition-colors">
              <Link to="/jobs">Jobs</Link>
            </li>
            <li className="hover:text-[#f83002] cursor-pointer transition-colors">
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#f83002] transition">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 shadow-md">
                <div className="flex items-center gap-4 border-b pb-3 mb-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      viral mern stack
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 justify-start text-gray-700 hover:text-[#f83002]"
                  >
                    <User2 size={18} />
                    <Link to="/profile">View Profile</Link>
                    
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 justify-start text-gray-700 hover:text-[#f83002]"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

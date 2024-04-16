import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { UserAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("User has been logged out");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToogler = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const navItems = [
    {
      path: "/",
      title: "Start a search",
    },
    {
      path: "/my-job",
      title: "My Jobs",
    },
    {
      path: "/salary",
      title: "Salary Estimate",
    },
    {
      path: "/post-job",
      title: "Post A Job",
    },
  ];
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={"29"}
            height={"30"}
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx={"12.0143"}
              cy={"12.5143"}
              r={"12.0143"}
              fill="#3575e2"
              fillOpacity={"0.4"}
            />
            <circle
              cx={"16.9857"}
              cy={"17.4857"}
              r={"12.0143"}
              fill="#3575e2"
            />
          </svg>
          <span>JobPortal</span>
        </a>

        {/* Nav items for large devices */}

        <ul className="hidden md:flex gap-12 ">
          {navItems.map((item) => {
            return (
              <li key={item.path} className="text-base text-primary">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Sign Up and Login button */}

        {user?.email ? (
          user.photoURL ? (
            <div className="flex">
              <img
                src={`${user?.photoURL}`}
                className="rounded-full h-[42px] mr-4"
              />
              <button className="Btn" onClick={handleLogOut}>
                <div className="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>

                <div className="text">Logout</div>
              </button>
            </div>
          ) : (
            <div className="flex">
              <MdAccountCircle
                className="mr-4"
                style={{ height: "42px", width: "42px" }}
              />
              <button className="Btn" onClick={handleLogOut}>
                <div className="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>

                <div className="text">Logout</div>
              </button>
            </div>
          )
        ) : (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to={"/login"} className="py-2 px-5 border rounded">
              Log In
            </Link>
            <Link
              to={"/signup"}
              className="py-2 px-5 border rounded bg-blue text-white hover:bg-black"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Nav items for mobile devices */}

        <div className="md:hidden block">
          <button onClick={handleMenuToogler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Nav items for mobile devices */}

      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map((item) => {
            return (
              <li
                key={item.path}
                className="text-base text-white first:text-white py-1"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
          {!user?.email && (<li className="text-white py-1 flex flex-col gap-3">
            <Link to={"/login"}>Log In</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </li>)}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

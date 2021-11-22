import React, { FC, Fragment, memo, useContext, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import Button from "./Button";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ReactComponent as Ladderly } from "../assets/svg/navbar.svg";
import { AuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";
import { auth } from "../firebase";
import { LadderContext } from "../context/LadderContext";

interface Props {}

const Navbar: FC<Props> = (props) => {
  const user = useContext(AuthContext);
  const { loading } = useContext(LadderContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  let completeButtonRef = useRef(null);
  const signOut = () => {
    return auth.signOut();
  };
  const handleSignOut = () => {
    signOut().then(() => {
      window.location.href = "/ladders";
    });
  };
  return (
    <>
      <nav className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-1 text-center bg-white border-b border-gray-100 shadow-md sm:px-8 md:mb-10">
        <div className="flex items-center justify-between w-full h-16 px-5 ">
          <div className="flex items-center object-fill">
            <Ladderly />
          </div>

          <div className="justify-between hidden md:flex lg:space-x-10 md:space-x-6">
            <li className="text-xl list-none hover:underline">
              <Link to="/ladders">
                <button className="font-semibold">Ladders</button>
              </Link>
            </li>

            <li className="text-xl list-none hover:underline">
              <Link to="/community">
                <button className="font-semibold">Community</button>
              </Link>
            </li>
            {!loading ? (
              !user ? (
                <>
                  <Link to="/signin">
                    <Button theme="outline">Sign in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Avatar
                    alt="profile_pic"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    size="small"
                  />
                  <Button onClick={handleSignOut}>Sign Out</Button>
                </>
              )
            ) : (
              <div className="flex items-center space-x-4">
                <div className="w-16 bg-gray-200 rounded-full h-9 animate-pulse"></div>
                <div className="w-16 bg-gray-200 rounded-full h-9 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            {!isMenuOpen && <HiOutlineMenu className="w-10 h-10" />}
            {isMenuOpen && <GrClose className="w-10 h-10" />}
          </button>
        </div>
      </nav>
      <Transition.Root show={isMenuOpen} as={Fragment}>
        <Dialog
          initialFocus={completeButtonRef}
          open={isMenuOpen}
          onClose={setIsMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            entered="opacity-50"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black top-16 sm:hidden" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed bottom-0 right-0 z-10 flex flex-col w-40 h-full pl-2 space-y-4 transform bg-gray-200 border-2 sm:hidden top-16">
              <Link to="/community">
                <button ref={completeButtonRef} className="font-bold">
                  Community
                </button>
              </Link>
              <Link to="/ladders">
                <button className="font-bold">Ladders</button>
              </Link>
              {!user ? (
                <>
                  <Link to="/signin">
                    <button className="font-bold">Sign In</button>
                  </Link>
                  <Link to="/signup">
                    <button className="font-bold">SignUp</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile">
                    <button className="font-bold">Profile</button>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block mr-auto font-bold"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

Navbar.defaultProps = {};

export default memo(Navbar);

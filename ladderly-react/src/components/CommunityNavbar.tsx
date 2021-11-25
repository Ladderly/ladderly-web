import { FiSearch } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { FC, Fragment, memo, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";
import { AiFillHome } from "react-icons/ai";
import { RiFileListFill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { GiStairs } from "react-icons/gi";
import { ReactComponent as Ladderly } from "../assets/svg/navbar.svg";
import profile from "../assets/img/anonymous.jpg";
interface Props {}

const CommunityNavbar: FC<Props> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //   const history = useHistory();
  const user = useContext(AuthContext);
  const signOut = () => {
    return auth.signOut();
  };
  const handleSignOut = () => {
    signOut();
    sessionStorage.clear();
    setLoading(false);
    window.location.href = "/community";
  };
  return (
    <>
      <nav className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white border-b-2 border-gray-200 shadow-sm lg:space-x-12 md:space-x-10 md:px-16 sm:px-4 sm:space-x-0">
        <div className="flex">
          <Ladderly />
        </div>

        <div className="items-center justify-between hidden w-full sm:flex">
          <div className="flex ml-10 lg:space-x-10 md:space-x-7 sm:space-x-4">
            <Link to="/community">
              <button className="w-7 h-7">
                <MdHome className="w-7 h-7" />
              </button>
            </Link>
            <Link to={user ? "/community/questionlist" : "/signin"}>
              <button className="w-7 h-7">
                <BiBookAdd className="w-7 h-7" />
              </button>
            </Link>
            <Link to="/ladders">
              <button className="w-7 h-7">
                <GiStairs className="w-7 h-7" />
              </button>
            </Link>
          </div>

          <div className="relative lg:w-2/4 md:w-1/3 sm:w-1/3">
            <FiSearch className="absolute right-0 w-5 h-5 mr-2 top-3 text-secondary-400"></FiSearch>
            <input
              type="text"
              className="justify-between w-full p-3 mx-4 border-2 border-transparent border-solid rounded-full focus:outline-none focus:border-secondary-300"
              placeholder="What are you looking for?"
            />
          </div>

          {!user && !loading ? (
            <div className="flex lg:space-x-6 md:space-x-4 sm:space-x-4">
              <Link to="/signin">
                <Button theme="outline">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-2 lg:space-x-10 sm:justify-between">
              <Link to={`/profile/${user!.uid}`}>
                <button>
                  <Avatar src={profile} size="small" alt="profile-pic" />
                </button>
              </Link>
              <Button
                loading={loading}
                className="w-28"
                onClick={() => {
                  setLoading(true);
                  handleSignOut();
                }}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>

        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            {!isMenuOpen && <HiOutlineMenu className="w-10 h-10" />}
            {isMenuOpen && <GrClose className="w-10 h-10" />}
          </button>
        </div>
      </nav>
      <Transition.Root show={isMenuOpen} as={Fragment}>
        <Dialog open={isMenuOpen} onClose={setIsMenuOpen}>
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
            <div className="fixed bottom-0 right-0 flex flex-col w-48 h-full pt-4 pl-6 space-y-6 transform border-2 bg-gray-50 sm:hidden top-16">
              <div className="flex space-x-2">
                <AiFillHome className="w-6 h-6 text-secondary-400" />
                <Link to="/community">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="font-bold text-center w-7 text-secondary-400"
                  >
                    Community
                  </button>
                </Link>
              </div>
              <div className="flex space-x-2">
                <GiStairs className="w-6 h-6 text-secondary-400" />
                <Link to="/ladders">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="font-bold text-center w-7 text-secondary-400"
                  >
                    Ladders
                  </button>
                </Link>
              </div>
              {user && (
                <div className="flex space-x-2">
                  <CgProfile className="w-6 h-6 text-secondary-400" />
                  <Link to={`/profile/${user!.uid}`}>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="font-bold text-center w-7 text-secondary-400"
                    >
                      Profile
                    </button>
                  </Link>
                </div>
              )}
              <div className="flex space-x-2">
                <RiFileListFill className="w-6 h-6 text-secondary-400" />
                <Link to={user ? "/community/questionlist" : "/signin"}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="font-bold text-center w-7 text-secondary-400"
                  >
                    QuestionList
                  </button>
                </Link>
              </div>
              {!user && (
                <>
                  <div className="flex space-x-2">
                    <BiLogIn className="w-6 h-6 text-secondary-400" />
                    <Link to="/signin">
                      <button className="font-bold text-center w-7 text-secondary-400">
                        Login
                      </button>
                    </Link>
                  </div>
                  <div className="flex space-x-2">
                    <BiLogIn className="w-6 h-6 text-secondary-400" />
                    <Link to="/signup">
                      <button className="font-bold text-center w-7 text-secondary-400">
                        SignUp
                      </button>
                    </Link>
                  </div>
                </>
              )}
              {user && (
                <div className="flex space-x-2">
                  <GoSignOut className="w-6 h-6 text-secondary-400" />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="font-bold text-center w-7 text-secondary-400"
                  >
                    SignOut
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

CommunityNavbar.defaultProps = {};

export default memo(CommunityNavbar);

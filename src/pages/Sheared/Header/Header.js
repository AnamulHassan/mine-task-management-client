import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaAngleDown,
  FaCheck,
  FaMoon,
  FaPenAlt,
  FaSun,
  FaTasks,
} from 'react-icons/fa';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';

const Header = () => {
  const [user, setUser] = useState(false);
  const [lightMode, setLightMode] = useState(true);
  const navItems = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'bg-[#e0d4e8] py-4 border-opacity-50 border-t-[3px] border-[#fe7178] leading-8 px-4 inline-flex bg-opacity-10 rounded-xl duration-300'
            : 'bg-transparent py-4 border-t-[3px] border-transparent leading-8 px-4 inline-flex bg-opacity-10 rounded-xl duration-300'
        }
        to="/add_task"
      >
        <span className="inline-flex items-center text-[#e0d4e8]">
          <FaPenAlt className="mr-2 text-[#b89cc2]" />
          Add Task
        </span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'bg-[#e0d4e8] py-4 border-opacity-50  border-t-[3px] border-[#fe7178] leading-8 px-4 inline-flex bg-opacity-10 rounded-xl duration-300 '
            : 'bg-transparent py-4 border-t-[3px] border-transparent leading-8 px-4 inline-flex bg-opacity-10 rounded-xl duration-300'
        }
        to="/my_task"
      >
        <span className="inline-flex items-center  text-[#e0d4e8]">
          <FaTasks className="mr-2 text-[#b89cc2]" />
          My Task
        </span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'bg-[#e0d4e8] border-opacity-50  py-4 border-t-[3px] border-[#fe7178] leading-8 px-4 inline-flex bg-opacity-10 rounded-xl duration-300'
            : 'bg-transparent py-4 border-t-[3px] border-transparent leading-8 px-4 inline-flex bg-opacity-10 rounded-xl duration-300'
        }
        to="/finished_task"
      >
        <span className="inline-flex items-center text-[#e0d4e8]">
          <FaCheck className="mr-2 text-[#b89cc2]" />
          Finished Task
        </span>
      </NavLink>
    </>
  );
  return (
    <header className="pt-6">
      <nav className="w-11/12 mx-auto border-[3px] border-b-0 px-2 rounded-t-xl border-[#e0d4e8] border-opacity-30 py-2 flex items-center justify-between bg-[#41106b] bg-opacity-50">
        <div>
          <Link to="/">MineTask</Link>
        </div>
        <div className="text-xl space-x-4 font-semibold">{navItems}</div>
        <div>
          {user ? (
            <div className="flex items-center">
              <div className="border-[3px] border-opacity-40 rounded-full border-[#e0d4e8] relative  ">
                <img
                  className="w-14 h-14 rounded-full z-20"
                  src="https://i.ibb.co/nfPDGJg/profile.jpg"
                  alt=""
                />
                <div className="bg-[#33085b] hover:opacity-0 duration-300 opacity-20 w-full h-full absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="ml-2">
                <h4 className="text-xl font-semibold">Kate Winslet</h4>
                <h5 className="text-[#b89cc2] text-lg">Web Developer</h5>
              </div>
              <div className="mx-2">
                <Menu
                  placement="bottom-end"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  styled={{
                    borderRadius: '400px',
                  }}
                >
                  <MenuHandler>
                    <Button
                      className="!text-[#e0d4e8] border-0 rounded-none p-0"
                      variant="outlined"
                    >
                      <span className="h-10 w-10 bg-[#e0d4e8] inline-flex bg-opacity-0 items-center justify-center hover:bg-opacity-10 rounded-2xl duration-300">
                        <FaAngleDown className="text-2xl" />{' '}
                      </span>
                    </Button>
                  </MenuHandler>
                  <MenuList className="!bg-[#481162] border-[3px] border-[#e0d4e8] border-opacity-30 bg-opacity-30 text-[#e0d4e8] text-lg font-semibold">
                    <MenuItem className="hover:bg-[#e0d4e8] hover:bg-opacity-10 hover:text-[#e0d4e8]">
                      <Link to="/profile">Your Profile</Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setLightMode(!lightMode)}
                      className="hover:bg-[#e0d4e8] hover:bg-opacity-10 hover:text-[#e0d4e8]"
                    >
                      {lightMode ? (
                        <span className="inline-flex items-center">
                          Light Mode <FaSun className="ml-2" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          Dark Mode <FaMoon className="ml-2" />
                        </span>
                      )}
                    </MenuItem>
                    <MenuItem className="hover:bg-[#e0d4e8] hover:bg-opacity-10 hover:text-[#e0d4e8]">
                      <button>Logout</button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="custom-button  py-2 mr-2 border-transparent text-white  leading-8 px-8 inline-flex rounded-xl text-2xl font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

// {
//   /* <button onClick={() => setOpen(!open)}>
//
// </button> */
// }

import React from "react";

const Navbar = () => {
  return (
    <Navbar
      className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex gap-2 items-center">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Material Tailwind
          </Typography>

          <div>
            <div className="flex rounded-full border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
              <button className="flex items-center justify-center px-3">
                <MagnifyingGlassIcon className="text-red-400 w-5 h-6" />
              </button>
              <input
                type="email"
                placeholder="Search..."
                className="w-full outline-none bg-white text-sm px-5 py-3"
              />
            </div>
          </div>
        </div>
        <Profile />
      </div>
    </Navbar>
  );
};

export default Navbar;

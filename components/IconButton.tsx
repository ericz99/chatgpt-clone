import React from "react";

type IconButtonProps = {
  icon?: JSX.Element;
  hover?: () => void;
};

export default function IconButton({ icon, hover }: IconButtonProps) {
  return (
    <button
      type="button"
      className="w-full p-2.5 flex justify-center items-center duration-200 ease-in-out"
      onMouseEnter={hover}
      onMouseLeave={hover}
    >
      {icon}
    </button>
  );
}

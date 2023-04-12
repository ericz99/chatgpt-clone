"use client";

import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  icon?: JSX.Element;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ icon, children, onClick, type }: ButtonProps) {
  return (
    <button
      type={type}
      className="px-2 text-sm flex justify-center items-center bg-semi-dark-grey text-white rounded-lg font-semibold h-8 hover:bg-semi-light-grey ease-in-out duration-200"
      onClick={onClick}
    >
      {icon}
      <span className="mx-4">{children}</span>
    </button>
  );
}

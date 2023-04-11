"use client";

import React from "react";

type ButtonProps = {
  icon?: JSX.Element;
  children: React.ReactNode;
};

export default function Button({ icon, children }: ButtonProps) {
  return (
    <button
      type="button"
      className="w-full p-2 flex justify-center items-center bg-semi-dark-grey text-white rounded-lg font-semibold h-12 hover:bg-semi-light-grey ease-in-out duration-200"
    >
      {icon}
      <span className="ml-4">{children}</span>
    </button>
  );
}

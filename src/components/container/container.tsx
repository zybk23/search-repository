"use client";
import React from "react";

interface IContainer {
  children: React.ReactNode;
}

const Container = ({ children }: IContainer) => {
  return <div className="w-full mx-auto max-w-[1080px]">{children}</div>;
};

export default Container;

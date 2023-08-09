import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex text-slate-300 justify-between items-center mb-4">
      <Link href="/">
        <h1 className="text-2xl">Tasks Management</h1>
      </Link>
      <Link
        className="border border-slate-300 px-2 py-1 rounded hover:transition-all hover:duration-200 hover:bg-slate-600 focus-within:bg-slate-600 focus-within:text-slate-100 hover:text-slate-100 outline-none"
        href="/new-task"
      >
        Add Task
      </Link>
    </header>
  );
};

export default Header;

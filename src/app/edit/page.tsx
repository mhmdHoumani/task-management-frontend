import React from "react";
import { getTask } from "@/lib/actions/tasks.actions";
import EditForm from "@/components/EditForm";
import { ITask } from "@/lib/types/tasks.type";
import Link from "next/link";

const EditTask = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const task_id = searchParams.id;
  if (!task_id) {
    return (
      <>
        <header className="flex flex-col mb-4">
          <h1 className="text-2xl">Something went wrong</h1>
          <span>
            Please navigate back to{" "}
            <Link
              href="/"
              className="font-bold text-slate-400 hover:underline hover:text-slate-500"
            >
              Home
            </Link>
          </span>
        </header>
      </>
    );
  }

  const result: ITask = await getTask(task_id);
  if (typeof result === "string") {
    return (
      <>
        <header className="flex flex-col mb-4">
          <h1 className="text-2xl">Something went wrong</h1>
          <span>
            {result}.{" "}
            <Link
              href="/"
              className="font-bold text-slate-400 hover:underline hover:text-slate-500"
            >
              Go back
            </Link>
          </span>
        </header>
      </>
    );
  }

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Edit Task</h1>
      </header>
      <EditForm
        searchParams={searchParams}
        title={result.title}
        description={result.description}
        due_date={result.due_date}
      />
    </>
  );
};

export default EditTask;

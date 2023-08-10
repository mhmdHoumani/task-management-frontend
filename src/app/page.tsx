import DeleteTask from "@/components/DeleteTask";
import { deleteTask, getAllTasks, getTask } from "@/lib/actions/tasks.actions";
import { ITask } from "@/lib/types/tasks.type";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const tasks: ITask[] = await getAllTasks();

  return (
    <main className="">
      <section className="flex flex-col gap-5 items-center justify-start">
        {tasks.map((task) => {
          const created_date = new Date(task.createdAt);
          const updated_date = new Date(task.updatedAt);
          const due_date = new Date(task.due_date);
          return (
            <div
              key={task._id}
              className="p-5 border border-slate-100 w-full max-w-7xl rounded-lg"
            >
              <div className="static flex mb-1 justify-between items-center">
                <p className="text-4xl">{task.title}</p>
                <div className="flex items-center justify-center gap-4">
                  <Link
                    href={{ pathname: "/edit", query: { id: task._id } }}
                    className="hover:underline hover:text-green-400"
                  >
                    edit
                  </Link>
                  <DeleteTask task_id={task._id} />
                </div>
              </div>
              <p className="text-sm">{task.description}</p>
              <p className="mt-5 text-slate-400 text-sm">Due Date</p>
              <p className="text-slate-400 text-sm">
                {due_date.toDateString()} at {due_date.toLocaleTimeString()}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Home;

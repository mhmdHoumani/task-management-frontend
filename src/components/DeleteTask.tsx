"use client";
import { deleteTask } from "@/lib/actions/tasks.actions";
import AlertIcon from "@/lib/utils/AlertIcon";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const DeleteTask = ({ task_id }: { task_id: string }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPopup(false);
        setMessage("");
      }
    };
    window.addEventListener("keyup", close);
  }, []);

  const deletingTask = async () => {
    setDeleting(true);
    const task = await deleteTask(task_id);
    setDeleting(false);
    setOpenPopup(false);
    setMessage(task);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setMessage("");
  };

  return (
    <>
      <button
        onClick={(e) => setOpenPopup(true)}
        className="hover:underline hover:text-red-400"
      >
        delete
      </button>
      <AnimatePresence>
        {openPopup && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            className="fixed inset-0 z-10 h-screen w-screen bg-slate-800/30"
            id="main-container"
            onClick={(e) => {
              // @ts-ignore
              if (e.target.id === "main-container") {
                setOpenPopup(false);
                setMessage("");
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed left-0 right-0 top-10 mx-4 flex max-h-fit flex-col items-stretch rounded-lg bg-slate-700 p-4 shadow-[0_0px_10px_0px_#0002] sm:m-auto sm:max-w-xl"
            >
              <h1>Are you sure you want to delete this task?</h1>
              <div className="basis-full flex gap-5 mt-5">
                <button
                  className="basis-1/2 border border-slate-300 px-2 py-1 rounded hover:transition-all hover:duration-200 hover:bg-slate-500 focus-within:bg-slate-500 hover:border-slate-500 focus-within:border-slate-500 focus-within:text-slate-100 hover:text-slate-100 outline-none"
                  onClick={(e) => setOpenPopup(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={deleting}
                  className={`${
                    deleting &&
                    "opacity-30 cursor-wait bg-red-500 border-none text-slate-100"
                  } basis-1/2 border border-slate-300 px-2 py-1 rounded hover:transition-all hover:duration-200 hover:bg-red-500 focus-within:bg-red-500 hover:border-red-500 focus-within:border-red-500 focus-within:text-slate-100 hover:text-slate-100 outline-none`}
                  onClick={deletingTask}
                >
                  {deleting ? "Deleting" : "Yes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {message !== "" && (
          <motion.div
            initial={{
              opacity: 0,
              x: -1000,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              x: -1000,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            className="fixed top-10 left-10 z-50 flex items-center min-w-[20rem] justify-start rounded-lg bg-slate-700/40 px-4 py-2"
          >
            <AlertIcon />
            <p className="ml-2 text-2xl font-bold text-slate-100">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteTask;

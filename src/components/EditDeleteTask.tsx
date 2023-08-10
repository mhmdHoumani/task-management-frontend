"use client";
import { Task } from "@/app/page";
import React, { useRef } from "react";
import EditPopup from "./Popups/EditPopup";

const EditDeleteTask = ({ task }: { task: Task }) => {
  const moreDetailsRef = useRef<{
    openTrigger: () => void;
    closeTrigger: () => void;
  }>();
  return (
    <>
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={(e) => {
            console.log(task);
            moreDetailsRef.current!.openTrigger();
          }}
        >
          edit
        </button>
        <p>delete</p>
      </div>
      <EditPopup title="Edit Task" ref={moreDetailsRef as any} />
    </>
  );
};

export default EditDeleteTask;

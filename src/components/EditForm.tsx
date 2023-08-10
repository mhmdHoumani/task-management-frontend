"use client";
import { editTask } from "@/lib/actions/tasks.actions";
import { basicSchema } from "@/schemas";
import { useFormik } from "formik";
import React from "react";
import TaskForm from "./TaskForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ITask } from "@/lib/types/tasks.type";

const EditForm = ({
  searchParams,
  title,
  description,
  due_date,
}: {
  searchParams: { [key: string]: string };
  title: string;
  description: string;
  due_date: string;
}) => {
  const task_id = searchParams.id;
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: title,
      description: description,
      due_date: new Date(due_date).toISOString().slice(0, 10),
    },
    validationSchema: basicSchema,
    onSubmit: (values, actions) => editTask(values, actions, task_id, router),
  });

  return (
    <form onSubmit={handleSubmit} className="flex gap-1 flex-col max-w-4xl">
      <TaskForm
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <div className="flex gap-1 mt-8 justify-end">
        {!isSubmitting && (
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting && "cursor-wait opacity-40"
          } border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none`}
        >
          {isSubmitting ? "Saving" : "Edit Task"}
        </button>
      </div>
    </form>
  );
};

export default EditForm;

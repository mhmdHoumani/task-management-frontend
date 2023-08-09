"use client";
import Link from "next/link";
import { FormikHelpers, useFormik } from "formik";
import { basicSchema } from "@/schemas";
import { createTask } from "@/lib/actions/tasks.actions";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export interface FormType {
  title: string;
  description: string;
  due_date: string;
}

export default function Page() {
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
      title: "",
      description: "",
      due_date: "",
    },
    validationSchema: basicSchema,
    onSubmit: (values, actions) => createTask(values, actions, router),
  });
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form onSubmit={handleSubmit} className="flex gap-1 flex-col max-w-4xl">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter the title"
          className={`${
            errors.title && touched.title && "border-red-500"
          } border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-50`}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.title && touched.title && (
          <p className="text-red-500 font-light text-sm">{errors.title}</p>
        )}
        <label htmlFor="description" className="mt-4">
          Description
        </label>
        <textarea
          rows={10}
          id="description"
          name="description"
          placeholder="Description of the task"
          className={`${
            errors.description && touched.description && "border-red-500"
          } border resize-none border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100`}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.description && touched.description && (
          <p className="text-red-500 font-light text-sm">
            {errors.description}
          </p>
        )}
        <label htmlFor="due_date" className="mt-4">
          Due Date
        </label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          className={`${
            errors.due_date && touched.due_date && "border-red-500"
          } border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100`}
          value={values.due_date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.due_date && touched.due_date && (
          <p className="text-red-500 font-light text-sm">{errors.due_date}</p>
        )}
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
            {isSubmitting ? "Creating task" : "Create"}
          </button>
        </div>
      </form>
    </>
  );
}

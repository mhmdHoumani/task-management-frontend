"use client";
import Link from "next/link";
import { useFormik } from "formik";
import { basicSchema } from "@/schemas";
import { createTask } from "@/lib/actions/tasks.actions";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";

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
        <h1 className="text-2xl">New Task</h1>
      </header>
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
            {isSubmitting ? "Creating task" : "Create"}
          </button>
        </div>
      </form>
    </>
  );
}

import { TaskParams } from "@/lib/types/tasks.type";
import { FormikErrors, FormikTouched } from "formik";
import React, { FocusEvent } from "react";

const TaskForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}: {
  values: TaskParams;
  errors: FormikErrors<TaskParams>;
  touched: FormikTouched<TaskParams>;
  handleBlur: {
    (e: FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}) => {
  return (
    <>
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
        <p className="text-red-500 font-light text-sm">{errors.description}</p>
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
    </>
  );
};

export default TaskForm;

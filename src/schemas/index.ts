import * as yup from "yup";

export const basicSchema = yup.object().shape({
  title: yup.string().min(3).required("title is a required field"),
  description: yup.string().min(10).required("please enter a description"),
  due_date: yup.date().required("due date is required"),
});

import { FormType } from "@/app/new-task/page";
import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const createTask = async (
  values: FormType,
  actions: FormikHelpers<FormType>,
  router: AppRouterInstance
) => {
  const title = values.title;
  const description = values.description;
  const due_date = values.due_date;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, due_date }),
      }
    );
    const result = await response.json();
    if (result.status === 201) {
      actions.resetForm();
      router.push("/");
    } else {
      console.log(result.message);
    }
  } catch (error: any) {
    console.log("error: ", error);
  }
};

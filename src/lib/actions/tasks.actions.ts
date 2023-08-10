import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { TaskParams } from "../types/tasks.type";

export const createTask = async (
  values: TaskParams,
  actions: FormikHelpers<TaskParams>,
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

export const getAllTasks = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const result = await response.json();
    if (result.status === 200) {
      return result.data;
    }
    console.log(result.message);
    return result.message;
  } catch (error: any) {
    console.log("error: ", error);
    return error.message;
  }
};

export const editTask = async (
  values: TaskParams,
  actions: FormikHelpers<TaskParams>,
  id: string,
  router: AppRouterInstance
) => {
  const title = values.title;
  const description = values.description;
  const due_date = values.due_date;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, due_date }),
      }
    );
    const result = await response.json();
    if (result.status === 200) {
      actions.resetForm();
      router.push("/");
    } else {
      console.log(result.message);
    }
  } catch (error: any) {
    console.log("error: ", error);
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const result = await response.json();
    if (result.status === 200) {
      return result.data;
    }
    console.log(result.message);
    return result.message;
  } catch (error: any) {
    console.log("error: ", error);
    return error.message;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (result.status === 200) {
      return result.data;
    }
    console.log(result.message);
    return result.message;
  } catch (error: any) {
    console.log("error: ", error);
    return error.message;
  }
};

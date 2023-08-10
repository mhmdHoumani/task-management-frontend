export interface TaskParams {
  title: string;
  description: string;
  due_date: string;
}

export interface ITask extends TaskParams {
  _id: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

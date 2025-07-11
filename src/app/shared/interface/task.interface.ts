export interface TaskItem {
  id?: string;
  category?: string;
  title?: string;
  description: string;
  dueDate: string;
  priority: number | string;
  assignedTo?: {
    user: string;
  }[];
  subTask:string[];
}
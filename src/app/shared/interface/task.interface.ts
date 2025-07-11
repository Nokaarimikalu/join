export interface TaskItem {
  id?: string;
  title?: string;
  description: string;
  dueDate: Date;
  priority: number | string;
  assignedTo?: any;
  subTask?: {
    task: string;
  }[];
}
export interface TaskItem {
  id?: string;
  category?: string;
  title?: string;
  description: string;
  dueDate: Date;
  priority: number | string;
  assignedTo?: any;
  subTask?: {
    task: string;
  }[];
}
export interface TaskItem {
  id?: string;
  status?: string;
  category?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  priority:string;
  assignedTo?: {
    user: string;
  }[];  
  subTask?:string[];
}
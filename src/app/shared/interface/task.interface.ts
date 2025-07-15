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
  subTask:string[];
}

export interface TaskItemBoard {
  id: string;
  status: string;
  category?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  priority:string;
  assignedTo?: {initials:string, firstName:string, lastName:string, color:string, email:string, phone:string}[];  
  subTask?:string[];
  subTaskFillTest: {
    text: string;
    completed: boolean;
  }[];
}
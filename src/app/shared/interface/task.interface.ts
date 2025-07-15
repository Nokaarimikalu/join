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
  assignedTo?: {user:string}[]; 
  // assignedTo?: Map<number, { color: string; email: string; firstName: string; initials: string; lastName: string; phone: string }>[]; 
  subTask?:string[];
  // subTaskFillTest?: {
  //   text: string;
  //   completed: boolean;
  // }[];
  subTaskFillTest: Map<number, { text: string; completed: boolean }>[];
}
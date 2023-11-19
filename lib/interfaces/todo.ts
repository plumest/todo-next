import { TError } from ".";
import { TodoStatusEnum } from "../enums";

export type TTodoStatus = (typeof TodoStatusEnum)[keyof typeof TodoStatusEnum];

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  status: TTodoStatus;
}

export interface ITodoResponse {
  tasks: ITodo[];
  pageNumber: number;
  totalPages: number;
  error?: TError;
}

export interface ITodoRequest {
  offset?: number;
  limit?: number;
  sortBy?: string;
  isAsc?: boolean;
  status?: string;
}

export interface ITodoListProps extends ITodoResponse {
  status: TTodoStatus;
}

export interface ITodoProps extends ITodo {
  onDeletingTask: () => void;
}

export interface IGroupedTodo {
  date: string;
  tasks: ITodo[];
}

export interface ITodoDetailProps extends ITodoProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

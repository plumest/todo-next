import { TodoStatusEnum } from "../enums";

export type TTodoStatus = (typeof TodoStatusEnum)[keyof typeof TodoStatusEnum];

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  createAt: Date | string;
  status: TTodoStatus;
}

export interface ITodoResponse {
  tasks: ITodo[];
  pageNumber: number;
  totalPages: number;
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
  onClick?: () => void;
}

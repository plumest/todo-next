"use server";

import { ITodoResponse, TTodoStatus } from "@/lib/interfaces";

export const loadTodo = async (
  type: TTodoStatus = "TODO",
  page: number = 0
): Promise<ITodoResponse> => {
  const { signal } = new AbortController();
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/todo?status=${type}&offset=${page}`,
      {
        cache: "force-cache",
        signal,
      }
    );
    const data: ITodoResponse = await response.json();

    if (!data?.tasks?.length) {
      return { ...data, error: { message: "Task not found.", status: 404 } };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

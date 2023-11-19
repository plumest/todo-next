"use server";

import { ITodoResponse, TTodoStatus } from "@/lib/interfaces";

export const loadTodo = async (
  type: TTodoStatus = "TODO",
  page: number = 0
): Promise<ITodoResponse> => {
  const { signal } = new AbortController();
  try {
    const response = await fetch(
      `http://localhost:3000/api/todo?status=${type}&offset=${page}`,
      {
        cache: "force-cache",
        signal,
      }
    );
    const data: ITodoResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

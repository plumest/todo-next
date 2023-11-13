"use server";

import { ITodoRequest, ITodoResponse } from "../interfaces";
import qs from "qs";

export async function getTodos(
  props: ITodoRequest,
  signal?: AbortSignal
): Promise<ITodoResponse> {
  const query = props
    ? qs.stringify(props, { addQueryPrefix: true, skipNulls: true })
    : qs.stringify(
        { limit: 10, status: "TODO" },
        { addQueryPrefix: true, skipNulls: true }
      );
  const data = await fetch(
    `https://todo-list-api-mfchjooefq-as.a.run.app/todo-list${query}`,
    { signal }
  );
  return data.json();
}

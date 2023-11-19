"use server";

import { ITodoResponse } from "@/lib/interfaces";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ITodoResponse>> {
  const url = new URL(request.nextUrl);
  const offset = url.searchParams.get("offset") ?? 0;
  const limit = url.searchParams.get("limit") ?? 10;
  const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
  const isAsc = url.searchParams.get("isAsc") ?? true;
  const status = url.searchParams.get("status") ?? "TODO";

  const controller = new AbortController();
  const signal = controller.signal;

  const query = qs.stringify(
    { offset, limit, sortBy, isAsc, status },
    { addQueryPrefix: true, skipNulls: true }
  );

  try {
    const response = await fetch(
      `https://todo-list-api-mfchjooefq-as.a.run.app/todo-list${query}`,
      { signal }
    );
    const data: ITodoResponse = await response.json();

    if (!data?.tasks?.length) {
      NextResponse.json({
        ...data,
        error: {
          message: "Tasks not found.",
          status: 404,
          path: "app/api/todo/route.tsx",
          function: "GET",
        },
      });
    }

    return NextResponse.json(data);
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({
      tasks: [],
      pageNumber: 0,
      totalPages: 0,
      error: {
        message: error?.message ?? "Internal server error.",
        status: 500,
        path: "app/api/todo/route.tsx",
        function: "GET",
      },
    });
  } finally {
    controller.abort();
  }
}

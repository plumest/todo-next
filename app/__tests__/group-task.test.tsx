/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import { groupTasks } from "../_actions/group-task-action";
import { IGroupedTodo, ITodo } from "@/lib/interfaces";

describe("grouping task", () => {
  let previousGroups: IGroupedTodo[];
  let newTasks: ITodo[];

  beforeEach(() => {
    previousGroups = [
      {
        date: "2021-08-01",
        tasks: [
          {
            id: "1",
            title: "test",
            description: "test",
            status: "TODO",
            createdAt: "2021-08-01T00:00:00.000Z",
          },
        ],
      },
    ];
  });

  test("When add new date task, It should create new date", () => {
    newTasks = [
      {
        id: "2",
        title: "test",
        description: "test",
        status: "TODO",
        createdAt: "2021-08-05T00:00:00.000Z",
      },
    ];
    expect(groupTasks(previousGroups, newTasks)).toEqual([
      {
        date: "2021-08-01",
        tasks: [
          {
            id: "1",
            title: "test",
            description: "test",
            status: "TODO",
            createdAt: "2021-08-01T00:00:00.000Z",
          },
        ],
      },
      {
        date: "2021-08-05",
        tasks: [...newTasks],
      },
    ]);
  });

  test("When add existing date task, It should append task to existing date", () => {
    newTasks = [
      {
        id: "3",
        title: "test",
        description: "test",
        status: "TODO",
        createdAt: "2021-08-01T00:00:00.000Z",
      },
    ];
    expect(groupTasks(previousGroups, newTasks)).toEqual([
      {
        date: "2021-08-01",
        tasks: [
          {
            id: "1",
            title: "test",
            description: "test",
            status: "TODO",
            createdAt: "2021-08-01T00:00:00.000Z",
          },
          ...newTasks,
        ],
      },
    ]);
  });
});

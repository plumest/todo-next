/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import { deleteTask, groupTasks } from "../_actions/group-task-action";
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

  test("When add new date task, It should create new date.", () => {
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

  test("When add existing date task, It should append task to existing date.", () => {
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

  test("When delete last task for given date, It should delete that date object.", () => {
    expect(deleteTask(previousGroups, "1", "2021-08-01")).toEqual([]);
  });

  test("When delete task, It should return remove only that task.", () => {
    const newGroups = groupTasks(previousGroups, [
      {
        id: "3",
        title: "test",
        description: "test",
        status: "TODO",
        createdAt: "2021-08-01T00:00:00.000Z",
      },
    ]);
    expect(deleteTask(newGroups, "1", "2021-08-01")).toEqual([
      {
        date: "2021-08-01",
        tasks: [
          {
            id: "3",
            title: "test",
            description: "test",
            status: "TODO",
            createdAt: "2021-08-01T00:00:00.000Z",
          },
        ],
      },
    ]);
  });

  test("When delete non existing task, It should return previous value.", () => {
    expect(deleteTask(previousGroups, "100", "2021-08-01")).toEqual([
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
    ]);
  });

  test("When delete with non existing date, It should return previous value.", () => {
    expect(deleteTask(previousGroups, "1", "2021-08-10")).toEqual([
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
    ]);
  });
});

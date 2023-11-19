import { IGroupedTodo, ITodo } from "@/lib/interfaces";
import toast from "react-hot-toast";

export const groupTasks = (
  previousGroups: IGroupedTodo[],
  newTasks: ITodo[]
): IGroupedTodo[] => {
  const newGroups: IGroupedTodo[] = [...previousGroups];

  for (const newTask of newTasks) {
    const dateKey = new Date(newTask.createdAt).toISOString().split("T")[0];
    const existingGroup = newGroups.find((group) => group.date === dateKey);
    const existingTask = existingGroup?.tasks.find(
      (task) => task.id === newTask.id
    );

    if (existingGroup && !existingTask) {
      existingGroup.tasks.push(newTask);
    } else if (!existingTask) {
      newGroups.push({ date: dateKey, tasks: [newTask] });
    }
  }
  return newGroups;
};

export const deleteTask = (
  groupedTasks: IGroupedTodo[],
  taskId: string,
  groupDate: string
): IGroupedTodo[] => {
  const newGroupTasks = [...groupedTasks];
  const groupIndex = groupedTasks.findIndex(
    (group) => group.date === groupDate
  );

  if (groupIndex !== -1) {
    newGroupTasks[groupIndex].tasks = newGroupTasks[groupIndex].tasks.filter(
      (task) => task.id !== taskId
    );

    // Remove the group if it has no tasks
    if (groupedTasks[groupIndex].tasks.length === 0) {
      newGroupTasks.splice(groupIndex, 1);
    }
  } else {
    toast.error("Task not found.");
  }
  return newGroupTasks;
};

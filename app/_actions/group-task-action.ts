import { IGroupedTodo, ITodo } from "@/lib/interfaces";

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

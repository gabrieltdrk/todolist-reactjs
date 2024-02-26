import { Trash } from "@phosphor-icons/react";
import { ChangeEvent, useState } from "react";
import { TaskType } from "./Tasks";

interface TaskProps extends TaskType {
  onDeleteTask: (task: string, isCompleted: boolean) => void;
  onCompleteTask: (isCompleted: boolean) => void;
}

export function Task({ content, onDeleteTask, onCompleteTask }: TaskProps) {
  const [completeTask, setCompleteTask] = useState(false);
  function handleDeleteTask() {
    onDeleteTask(content, completeTask);
  }

  function handleCompleteTask(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    setCompleteTask(isChecked);
    onCompleteTask(isChecked);
  }

  return (
    <article className="flex bg-[--gray-400] my-4 py-4 items-center ring-offset rounded-lg">
      <input
        checked={completeTask}
        onChange={handleCompleteTask}
        className="rounded-full mx-3 hover:bg-[--blue-dark] checked:bg-[--purple-dark] checked:hover:bg-[--purple]"
        type="checkbox"
      />
      <span className={completeTask ? "flex-1 line-through" : "flex-1 text-white"}>{content}</span>
      <Trash
        size={24}
        onClick={handleDeleteTask}
        className="mx-3 cursor-pointer hover:fill-[--danger] hover:bg-[--gray-400]"
      />
    </article>
  );
}

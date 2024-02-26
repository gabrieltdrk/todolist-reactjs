import { ClipboardText, PlusCircle } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "./Task";

export interface TaskType {
  content: string;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]); // ALL TASKS
  const [createTask, setCreateTask] = useState<string>(""); // CREATE TASKS
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0); // Completed Tasks Count

  function handleChangeTask(event: ChangeEvent<HTMLInputElement>) {
    setCreateTask(event.target.value);
  }

  function handleSubmitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTask: TaskType = { content: createTask };
    setTasks([newTask, ...tasks]);
    setCreateTask("");
  }

  function handleDeleteTask(taskToDelete: string, isCompleted: boolean) {
    const newTasks = tasks.filter((task) => task.content !== taskToDelete);
    if (isCompleted) {
      setCompletedTasksCount(completedTasksCount - 1);
      setTasks(newTasks);
    } else {
      setTasks(newTasks);
    }
  }

  function handleCompleteTask(isCompleted: boolean) {
    isCompleted
      ? setCompletedTasksCount(completedTasksCount + 1)
      : setCompletedTasksCount(completedTasksCount - 1);
  }

  return (
    <main>
      <header>
        <form
          onSubmit={handleSubmitTask}
          className="flex items-center justify-center gap-2 mx-2 -mt-7"
        >
          <input
            value={createTask}
            onChange={handleChangeTask}
            className="flex w-[638px] h-[54px] bg-[--gray-500] rounded-lg drop-shadow-md p-[10px] text-base"
            placeholder="Adicione uma nova tarefa"
            type="text"
          />
          <button
            className="flex gap-1 items-center justify-center h-[54px] w-[90px] px-2 bg-[--blue-dark] text-[--white] rounded-lg hover:bg-[--blue] transition-colors"
            type="submit"
          >
            Criar <PlusCircle size={24} />
          </button>
        </form>
      </header>

      <div className="max-w-[736px] sm:m-auto mx-2">
        <header className="flex justify-between max-w-[736px] mx-2 mt-14 m-auto">
          <div className="flex items-center gap-2">
            <strong className="text-[--blue]">Tarefas criadas</strong>
            <span className="rounded-full bg-[--gray-400] text-[--white] px-2.5 py-0.5 drop-shadow">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 mx-0">
            <strong className="text-[--blue] ">Concluídas</strong>
            <span className="rounded-full bg-[--gray-400] text-[--white] px-2.5 py-0.5 drop-shadow">
              {completedTasksCount} de {tasks.length}
            </span>
          </div>
        </header>

        <div>
          {tasks.length !== 0 ? (
            tasks.map((task) => {
              return (
                <div key={task.content}>
                  <Task
                    content={task.content}
                    onCompleteTask={handleCompleteTask}
                    onDeleteTask={handleDeleteTask}
                  />
                </div>
              );
            })
          ) : (
            <article className="flex flex-col gap-2 items-center ">
              <ClipboardText className="mt-16" size={56} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </article>
          )}
        </div>
      </div>
    </main>
  );
}

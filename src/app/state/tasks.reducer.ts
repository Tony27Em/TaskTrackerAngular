import { createReducer, on } from "@ngrx/store";
import { TaskType } from "../models/task.model";
import { TasksAction } from "./data.action";

export const initialState: Array<TaskType> = [];

export const tasksReducer = createReducer(
  initialState,
  on(TasksAction.retrievedTasks, (_state, { tasks }) => tasks),
  on(TasksAction.addTask, (state, { task }) => [...state, task]),
  on(TasksAction.removeTask, (state, { taskID }) => state.filter(item => item.id !== taskID)),
)
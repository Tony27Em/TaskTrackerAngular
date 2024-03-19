import { createActionGroup, props } from "@ngrx/store";
import { TaskType } from "../models/task.model";
import { UserType } from "../models/user.model";

export const TasksAction = createActionGroup({
  source: 'Tasks',
  events: {
    'Retrieved Tasks': props<{ tasks: Array<TaskType> }>(),
    'Add Task': props<{ task: TaskType }>(),
    'Remove Task': props<{ taskID: string }>(),
  }
})

export const UserAction = createActionGroup({
  source: 'Users',
  events: {
    'Retrieved Users': props<{ users: Array<UserType> }>(),
  }
})
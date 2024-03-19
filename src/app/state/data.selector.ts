import { createFeatureSelector } from "@ngrx/store";
import { TaskType } from "../models/task.model";
import { UserType } from "../models/user.model";

export const selectTasks = createFeatureSelector<Array<TaskType>>('tasks');
export const selectUsers = createFeatureSelector<Array<UserType>>('users');

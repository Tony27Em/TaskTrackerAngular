import { createReducer, on } from "@ngrx/store";
import { UserType } from "../models/user.model";
import { UserAction } from "./data.action";

export const initialState: Array<UserType> = [];

export const usersReducer = createReducer(
  initialState,
  on(UserAction.retrievedUsers, (_state, { users }) => users)
)
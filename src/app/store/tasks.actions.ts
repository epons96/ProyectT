import { Action } from "@ngrx/store";
import { ITask } from "../core/interfaces/task.class";

export const ADD_TASK = "Add task";

export class AddTask implements Action {
  readonly type = ADD_TASK;
  constructor(public payload: ITask) {}
}

export type Actions = AddTask;

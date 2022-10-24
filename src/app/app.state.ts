import { ITask } from "./core/interfaces/task.class";

export interface AppState {
  readonly tasks: ITask[];
}

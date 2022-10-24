import { ITask } from "../core/interfaces/task.class";
import * as TaskActions from "./tasks.actions";

const initialState: ITask = {
  name: "First Task",
  state: "Pending",
};

export function taskReducer(state: ITask[] = [], action: TaskActions.Actions) {
  switch (action.type) {
    case TaskActions.ADD_TASK:
      return [...state, action.payload];
    default:
      return state;
  }
}

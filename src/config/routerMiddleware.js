import { createRoutine } from "redux-saga-routines";

export const push = createRoutine('REACT_ROUTER_PUSH');
export const replace = createRoutine('REACT_ROUTER_PUSH');

const routerMiddleware = (history) => () => next => action => {
    const result = next(action);
    if (action.type === push.TRIGGER) {
      history.push(action.payload);
    }

    if (action.type === replace.TRIGGER) {
      history.replace(action.payload);
    }
    return result;
};

export default routerMiddleware;

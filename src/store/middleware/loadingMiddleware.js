import { startRequest, finishRequest } from "../slices/globalSlice.js";

export const loadingMiddleware = (store) => (next) => (action) => {
  // Если начинается любой asyncThunk (pending)
  if (action.type.endsWith("/pending")) {
    store.dispatch(startRequest());
  }

  // Если заканчивается (fulfilled или rejected)
  if (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) {
    store.dispatch(finishRequest());
  }

  return next(action);
};



export default function createAsyncActionHandlers(name, onSuccess) {
  function onPending(state) {
    const changes = {};

    changes[name + 'Pending'] = true;
    changes[name + 'Error'] = null;

    return Object.assign({}, state, changes);
  }

  function onRejected(state, action) {
    const changes = {};

    changes[name + 'Pending'] = false;
    changes[name + 'Error'] = action.error;

    return Object.assign({}, state, changes);
  }

  function onFulfilled(state, action) {
    const changes = onSuccess(state, action.payload);

    changes[name + 'Pending'] = false;
    changes[name + 'Error'] = null;

    return Object.assign({}, state, changes);
  }

  const actions = {};

  actions[name + 'Pending'] = onPending;
  actions[name + 'Fulfilled'] = onFulfilled;
  actions[name + 'Rejected'] = onRejected;

  return actions;
}


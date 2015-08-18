export default function asyncAction(name, cb) {
  return function(...args) {
    return {
      types: [
        name + 'Pending',
        name + 'Fulfilled',
        name + 'Rejected'
      ],
      payload: {
        promise: cb(...args)
      }
    };
  };
}


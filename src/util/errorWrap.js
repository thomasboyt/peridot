/*
 * Top-level error handler for async functions.
 *
 * Various subcommands have custom error handlers for prettier errors & preventing exit
 */
export default async function errorWrap(cb, ...args) {
  try {
    await cb(...args);
  } catch(err) {
    if (err.stack) {
      // JS errors
      console.log(err.stack);
    } else {
      // Other error
      console.log(err);
    }

    process.exit(1);
  }
}

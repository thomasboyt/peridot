export function intOpt(name) {
  return function(val, defaultVal) {
    const parsed = parseInt(val, 10);

    if (Number.isNaN(parsed)) {
      console.error(`Invalid option ${name} = ${val}: should be an integer (e.g. ${defaultVal})`);
      process.exit();
    }

    return parsed;
  };
}

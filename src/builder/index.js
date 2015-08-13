import build from './build';

export default async function(options) {
  console.log('Building...');

  try {
    await build(options);

  } catch(err) {
    console.error('Unhandled error building:');

    // warning: lame duck-typing below~

    if (err.stack) {
      // JS errors
      console.log(err.stack);

    } else if (err.url) {
      // Failed window.fetch response
      console.log(`${err.url} - ${err.status} ${err.statusText}`);
      const body = await err.text();
      console.log(body);

    } else {
      // Other error
      console.log(err);
    }

    return;
  }

  console.log('...Done!');
}

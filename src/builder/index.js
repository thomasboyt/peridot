import build from './build';

export default async function() {
  console.log('Building...');

  try {
    await build();
  } catch(err) {
    console.error('Unhandled error building:');

    // warning: lame duck-typing below~

    if (err.stack) {
      // JS errors
      console.log(err.stack);

    } else if (err.url) {
      // Failed window.fetch response
      console.log(`${err.url} - ${err.status} ${err.statusText}`);

      err.text().then((body) => {
        console.log(body);
      });

    } else {
      // Other error
      console.log(err);
    }

    return;
  }

  console.log('...Done!');
}

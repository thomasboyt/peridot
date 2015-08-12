import express from 'express';

export default function serve() {
  const app = express();

  app.use(express.static('_site/'));

  const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
  });
}

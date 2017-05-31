# now-env
Module to load environment variables defined in a `now.json` file or the `now` key in the `package.json` and set them in `process.env`.

## Usage
Download it from npm

```bash
yarn add now-env
npm i now-env
```

Then require it and call the method `config`.

```js
require('now-env').config()
```

You can now check in `process.env` for you environment variables.

This module check if you are running in production mode and if so don't do anything. That check only work if you run your script with `NODE_ENV=production node index.js`.

Because [now.sh](https://now.sh) automatically run your app with the `now.json` environment variables then this module it's not going to do anything in production :)

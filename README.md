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

## Using secrets
Most probably you will want to use [secret keys](https://zeit.co/docs/features/env-and-secrets#securing-env-variables-using-secrets) in your `now.json` file. This module allow you to use them too without worries in development.

Just create a `now-secrets.json` file with you development secrets, that file can (and most probably) be ignored with Git, then just use `now-env` as usual and it will auto-detect the file and use it to replace your secrets values.

If the file doesn't exists or if your secret key is not defined then it's going to use the key name as value for your environment variable.

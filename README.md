# now-env
Module to load environment variables defined in a `now.json` file or the `now` key in the `package.json` and set them in `process.env`.

## Usage
Download it from npm.

```bash
yarn add now-env
npm i now-env
```

Then require it.

```js
require('now-env').config()
```

That's all, you can now check in `process.env` for you environment variables!

> If your application is running inside [▲ZEIT Now](https://now.sh) cloud then this module is not going to do anything and let ▲ZEIT Now set your environment variables.

## Using secrets
Most probably you will want to use [secret keys](https://zeit.co/docs/features/env-and-secrets#securing-env-variables-using-secrets) in your `now.json` file. This module allow you to use them too without worries in development.

Just create a `now-secrets.json` file with you development secrets, that file **must be ignored** with Git, then just use `now-env` as usual and it will auto-detect the file and use it to replace your secrets values.

If the file doesn't exists or if your secret key is not defined then it's going to use the secret name as value, that means if `DB_PASS` is `@db_pass` and you don't define it inside `now-secrets.json` then the value will be `@db_pass`.

## Migrate from `dotenv`
If you're already using the `dotenv` module you can switch to `now-env` easily.

1. Create a `now.json` file with the `env` key with every environment variable.
2. Install `now-env`
3. Change `require('dotenv').config()` with `require('now-env').config()`.
4. That's all!

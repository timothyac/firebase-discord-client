# firebase-discord-client

> Dashboard client that uses firebase auth, then allows you to store discord tokens

## What is it

This is a very early model concept of custom authentication. I dislike using Discord as a provider as it is lacking some core features. Also Firebase Auth is super easy to setup, it's state change observable pattern does suck though. Once again this is early proof of concept. This has _NO_ styling yet. Literally just logic. Also this relies on a serverless function that I have built, but have yet to upload.

## Development

Built with [react](https://reactjs.org/). You'll need [node.js](http://nodejs.org/) & [yarn](https://yarnpkg.com/).

```bash
# clone repo
git clone https://github.com/SunstroUS/firebase-discord-client.git

# install dependencies
yarn install

# start app on port 3000
yarn start
```

## License

<a href="/LICENSE.md">MIT</a>

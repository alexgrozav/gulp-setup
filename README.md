# Webpack 2 Boilerplate

This is a complete Webpack 2 boilerplate using TypeScript with compilation and linting functionality. To show how to use webpack together with a server, there's a `server.js` file with a basic ExpressJS setup.

### Development Server
To run the ExpressJS development server use:

~~~
npm start
~~~

Or, to use the included WebPack dev server:

~~~
npm run dev
~~~


### Production Server
To run the production server, first create the assets bundle, then use:
~~~
npm run build

NODE_ENV=production npm start
~~~

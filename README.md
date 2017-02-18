# Webpack 2 Boilerplate

This is a complete Webpack 2 boilerplate using TypeScript and Stylus with compilation and linting functionality. To show how to use webpack together with a server, there's a `server.js` file with a basic ExpressJS setup.

Simply work with the files in the `src` folder, WebPack will automatically compile and reload the files in the browser. The ExpressJS server runs on `http://localhost:3000` by default.


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

## Configuration
To update the current configuration


## How to contribute to Webpack Boilerplate

#### **Did you find a bug?**

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/pixevil/webpack-boilerplate/issues).

* If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

#### **Did you write a patch that fixes a bug?**

* Open a new GitHub pull request with the patch.

* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

#### **Do you intend to add a new feature or change an existing one?**

* Suggest your change as an issue and start writing code.

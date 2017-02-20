# Gulp Webpack Boilerplate

This is a complete Gulp workflow setup bundled with Rollup and Webpack 2 using TypeScript and Stylus with compilation and linting functionality. To show how to use webpack together with a server, there's a `server.js` file with a basic ExpressJS setup.

Simply work with the files in the `src` folder, Gulp will use Rollup to process the files into the `build` folder, then WebPack 2 will automatically compile a bundle into the `dist` folder. The ExpressJS server runs on `http://localhost:3000` by default.

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
To update the current configuration, make sure you modify the files in the `config` folder.

## How to contribute to Gulp Webpack Boilerplate

#### **Did you find a bug?**

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/pixevil/webpack-boilerplate/issues).

* If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

#### **Did you write a patch that fixes a bug?**

* Open a new GitHub pull request with the patch.

* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

#### **Do you intend to add a new feature or change an existing one?**

* Suggest your change as an issue and start writing code.

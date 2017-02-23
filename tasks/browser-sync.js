module.exports = (gulp, plugins, paths) => {
  return () => {
    // Initialize browserSync
    plugins['browser-sync'].init({
      port: 3000,
      proxy: "localhost:3030"
    });
  }
}

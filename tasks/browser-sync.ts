module.exports = (gulp: any, plugins: any, paths: any) => {
  return () => {
    // Initialize browserSync
    plugins['browser-sync'].init({
      proxy: "localhost:3030"
    });
  }
}

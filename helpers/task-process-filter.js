module.exports = (task, step) => task.filter && task.filter[step] ? task.filter[step] : (() => true)

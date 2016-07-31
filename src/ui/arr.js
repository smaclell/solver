const arr = {};
const addMethod = m => arr[m] = (t, f) => Array.prototype[m].call(t, f);
['forEach', 'filter'].forEach(m => addMethod(m));

export default arr;

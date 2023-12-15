function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false;

  const _debounce = function (...args) {
    // 函数内部的this执行当前绑定的元素
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        // 当前一个周期执行完成之后 过段时间继续操作 要保证依旧可以一执行就触发
        isInvoke = false;
      }, delay);
    }
  };
  return _debounce;
}

export { debounce };

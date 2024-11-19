export default {
  mounted(el) {
    function move(pos) {
      if (!el._startPos) return;

      el.scrollTo(el._startScroll[0] + el._startPos[0] - pos[0], el._startScroll[1] + el._startPos[1] - pos[1]);
    }

    el._mousedown = (e) => {
      el._startPos = [e.clientX, e.clientY];
      el._startScroll = [el.scrollLeft, el.scrollTop];
    };

    el._mousemove = (e) => {
      if (!el._startPos) return;

      move([e.clientX, e.clientY]);
    };

    el._mouseup = (e) => {
      if (!el._startPos) return;
      move([e.clientX, e.clientY]);

      el._startPos = null;
      el._startScroll = null;
    };

    el.addEventListener('mousedown', el._mousedown);
    window.addEventListener('mousemove', el._mousemove);
    window.addEventListener('mouseup', el._mouseup);
  },

  beforeUnmount(el) {
    el.removeEventListener('mousedown', el._mousedown);
    window.removeEventListener('mousemove', el._mousemove);
    window.removeEventListener('mouseup', el._mouseup);
  },
};

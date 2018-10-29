;(function (win, doc) {
    function changeSize() {
      if (doc.documentElement.clientWidth > 750) {
        doc.documentElement.style.fontSize = '100px'
        return
      }
      doc.documentElement.style.fontSize = 50 * doc.documentElement.clientWidth / 320 + 'px'
    }////50是可变的
    changeSize();
    window.addEventListener('resize', changeSize, false)

  })(window, document);
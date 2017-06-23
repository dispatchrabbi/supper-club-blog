function timeout() {
  const timeout = 1000;

  const mark = Date.now();
  while(Date.now() - mark < timeout) { }
}

module.exports = timeout;

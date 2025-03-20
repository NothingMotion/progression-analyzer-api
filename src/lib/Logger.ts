class Logger {
  static log(message: string) {
    console.log(message);
  }
  static error(message: string) {
    console.error(message);
  }
  static warn(message: string) {
    console.warn(message);
  }
}

export default Logger;

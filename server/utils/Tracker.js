export default class Tracker {
  constructor() {
    this.timers = {
      Total: {
        start: new Date(),
      }
    };
  }

  mark(base, type) {
    if (!this.timers[base]) {
      this.timers[base] = {};
    }

    if (type === 'start') {
      this.timers[base].start = new Date();
    }

    if (type === 'end') {
      this.timers[base].end = new Date();
    }
  }

  info(label) {
    let info = [];

    if (label) {
      info.push(label);
    }

    for (let timer in this.timers) {
      if (this.timers[timer].start && this.timers[timer].end) {
        const duration = this.timers[timer].end - this.timers[timer].start;
        const str = `  -- ${timer}: ${duration} ms`
        info.push(str);
      }
    }

    return info.join('\n')
  }
}

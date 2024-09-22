import { observable, action, makeObservable } from "mobx";

class Counter {
  value: number = 0;

  constructor() {
    makeObservable(this, {
      value: observable,
      increment: action,
    });
  }

  increment() {
    this.value += 1;
    // console.log(this.value);
  }
}

export const counter = new Counter();

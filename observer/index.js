//要被订阅的主题
class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  attach(observer) {
    this.observers.push(observer);
  }
  notifyAllObservers() {
    this.observers.forEach(observer=> {
      observer.update();
    });
  }
}
//观察者
class Observer {
  constructor(name,subject) {
    this.name = name;
    this.subject  = subject;
    this.subject.attach(this);
  }
  update() {
    console.log(`${this.name} is updata, subject state is ${this.subject.state}`);
  }
}

const s1 = new Subject();
const o1  = new Observer('o1', s1);
s1.setState(1);
console.log('=======================================');
const o2 = new Observer('o2', s1);
const o3 = new Observer('o2', s1);
s1.setState(2);



console.log(o1,o2,o3);
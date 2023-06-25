import "./output.css";
import { tween, chain, delay, styler, action } from "popmotion";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
  <div class="box">
  <div class="heart">
  
  </div>
  </div>

<div><button class="btn">Start</button></div>
`;

const divStyler = styler(document.querySelector(".box"));

const merge2 = (...actions) =>
  action(({ update, complete, error }) => {
    const values = new Map();
    const completes = new Set();

    const updateMergeValue = () => {
      update({
        rotate: [...values.values()].reduce((s, v) => (v.rotate || 0) + s, 0)
      });
    };

    const subs = actions.map((thisAction, index) => {
      const onUpdate = (value) => {
        values.set(index, value);
        updateMergeValue();
      };

      const onComplete = () => {
        completes.add(index);
        if (completes.size >= actions.length) {
          complete();
        }
      };

      return thisAction.start({
        update: onUpdate,
        complete: onComplete,
        error
      });
    });
    return {
      seek: (progress) => subs.forEach((sub) => sub.seek(progress)),
      resume: () => subs.forEach((sub) => sub.resume()),
      stop: () => subs.forEach((sub) => sub.stop())
    };
  });

const act = merge2(
  tween({ from: { rotate: 0 }, to: { rotate: 45 }, duration: 5000 }),
  tween({ from: { rotate: 0 }, to: { rotate: 360 }, duration: 5000 })
).start(divStyler.set);

document.querySelector(".btn").addEventListener("click", () => {
  act.seek(0.5);
  act.resume();
});

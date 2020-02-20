import { delay } from './delay.js';

export const each = (hugos) => {
  // todo: hoist this variable out because it's searched for twice
  const theContainer = document.querySelector('#outcome');
  Object.keys(hugos).forEach((novel) => {
    const theWinners = hugos[novel];
    const rowsToBuild = Object.keys(theWinners).length;
    delay(rowsToBuild, theWinners, theContainer);
  });
};
// export { each as default };

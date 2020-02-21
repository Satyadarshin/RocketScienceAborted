export const controllers = (thisIndex) => {
const buildStepBackward = (thisIndex <= 0) ? 0 : thisIndex - 1;
  const stepBackward = buildStepBackward.toString();
  const buildStepForward = (thisIndex <= 0) ? 1 : thisIndex + 1;
  const stepForward = buildStepForward.toString();

} 
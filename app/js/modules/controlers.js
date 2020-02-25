/* eslint-disable import/prefer-default-export */
export const controlers = (thisIndex) => {
const buildStepBackward = (thisIndex <= 0) ? 0 : thisIndex - 1;
  const stepBackward = buildStepBackward.toString();
  const buildStepForward = (thisIndex <= 0) ? 1 : thisIndex + 1;
  const stepForward = buildStepForward.toString();
  const footerRow = document.getElementById('toolbar');
  footerRow.innerHTML = `
  // <td colspan="3">
  //   <div id="actions">
  //     <button class="previous_row" data-previous="#"><i class="fas fa-step-backward"></i></button>
  //     <button class="pause_row"><i class="fas fa-pause"></i></button>
  //     <button class="next_row" data-next="#"><i class="fas fa-step-forward"></i></button>
  //   </div>
  // </td>
  // `;

  <td colspan="3">
    <div class="actions">
      <button class="previous_row" data-previous="${stepBackward}"><i class="fas fa-step-backward"></i></button>
      <button class="pause_row"><i class="fas fa-pause"></i></button>
      <button class="next_row" data-next="${stepForward}"><i class="fas fa-step-forward"></i></button>
    </div>
  </td>
  `;
} 
import {FaRegTimesCircle} from 'react-icons/fa';
export default function Modal(props) {
  function dismiss() {
    var modal = document.getElementById(props.id);
    modal.style.display = "none";
  }
  return (
    <>
      <div id={props.id} class="modal">
        <div class="modal-content">
          <div class="modal-header border-black">
            <span class="close" onClick={dismiss}><FaRegTimesCircle /></span>
            <h2>{props.title}</h2>
          </div>
          <div class="modal-body">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react'

const Modal = ({ id, header, body, footer }) => {
  return (
    <div class="modal fade" id={id} tabindex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id={`${id}Label`}>
              {header}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {body}
          </div>
          <div class="modal-footer">
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

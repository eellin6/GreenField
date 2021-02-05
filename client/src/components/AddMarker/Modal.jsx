
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Modal = ({ handleClose, isOpen, children, handleAddMarker, marker, markers }) => {
  const {register, handleSubmit} = useForm();
  const showHideClassName = isOpen ? "modal display-block" : "modal display-none";

console.log(marker.position)
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <form onSubmit={handleSubmit(handleAddMarker(marker.position))}>
          <label>Description</label>
          <input ref={register} name="description" />

          <label>Photo</label>
          <input ref={register} name="photo"
                placeholder="upload photo"
                />
           <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
    </form>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
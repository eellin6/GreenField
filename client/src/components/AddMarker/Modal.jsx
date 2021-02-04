
import React from 'react'
import { useForm } from 'react-hook-form'

const Modal = ({ handleClose, isOpen, children }) => {
  const {register, handleSubmit} = useForm();
  const showHideClassName = isOpen ? "modal display-block" : "modal display-none";
  const onSubmit = data => console.log(data)

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <form onSubmit={handleSubmit(onSubmit)}>
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
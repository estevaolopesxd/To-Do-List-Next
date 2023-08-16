import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './modal.css'


const Modal = ({ show, onClose, onNewTask }) => {
  const [nameTask, setNameTask] = useState('')
  const [description, setDescription] = useState('');


  const handleSubmit = () => {
    const taskData = {
      name: nameTask,
      description: description
    };
    onNewTask(taskData);

    // Limpar os campos do formulário após o envio
    setNameTask('');
    setDescription('');

  };


  const displayStyle = show ? "block" : "none";


  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: displayStyle }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Task</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label className='text-center'>Name Task: </label>
            <input type='text' value={nameTask} onChange={(e) => setNameTask(e.target.value)} />

            <label className='text-center'>Description: </label>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>New Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
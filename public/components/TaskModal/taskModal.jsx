import React, { useState } from 'react';
import './taskModal.css'

const TaskModal = ({ show, onClose, task }) => {

    if (!show) {
        return null;
    }


    return (

        <div className="modal" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sua Task</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>{task.name}</h5>
                        <p>{task.description}</p>
                        <p className='date'>Criada em: {task.createdAt.toLocaleDateString()} às {task.createdTime}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
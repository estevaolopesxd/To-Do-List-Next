'use client'
import { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css';


//components
import BtnPrimary from '@/public/components/Btn/BtnPrimary/btnPrimary';
import Modal from '@/public/components/Modal/modal'
import TaskModal from '@/public/components/TaskModal/taskModal';




export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [taskModals, setTaskModals] = useState({});
  const [selectedTask, setSelectedTask] = useState(null)

  const currentDate = new Date();



  // abre o modal da tarefa selecionada
  const openTaskModal = (task) => {
    setSelectedTask(task);
  };



  // abrir modal
  const openModal = (column) => {
    setSelectedColumn(column);
    setShowModal(true);
  };

  // fechar modal
  const closeModal = () => {
    setSelectedColumn('');
    setShowModal(false);
  };



  // cria uma nova tarefa
  function handleNewTask(data) {

    // valida se os campos estão preenchidos
    if (!data.name || !data.description) {
      alert("Preencha todos os campos!");
    } else {
      const newTaskObj = {
        name: data.name, // Usar data.name em vez de taskName
        description: data.description, // Usar data.description em vez de descritionTask
        column: selectedColumn,
        createdAt: currentDate, // Adicione o campo da data de criação
        createdTime: currentDate.toLocaleTimeString()
      };

      setTasks([...tasks, newTaskObj]);
      closeModal();
    }
  }



  //deleta a tarefa
  function removeTask(index) {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  }



  /////////////////////////////////    Drag and Drop start
  // Comecei a mover o item, então transfiro carrego os dados
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
    setDraggedTask(tasks[index]);
  };



  const handleDragOver = (e) => {
    e.preventDefault();
  };


  // quando soltou o mouse no local de destino
  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData('index');
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(sourceIndex, 1);

    // Verificar se a tarefa já está na coluna
    if (draggedTask.column !== targetColumn) {
      // Atualizar a coluna da tarefa arrastada
      draggedTask.column = targetColumn;

      // Encontrar o index onde a tarefa deve estar na nova coluna
      const targetIndex = updatedTasks.findIndex(task => task.column === targetColumn);
      updatedTasks.splice(targetIndex, 0, draggedTask);

      setTasks(updatedTasks);
      setDraggedTask(null);
    }
  };

  //////////////////////////// Drag And Drop End ///////////////////




  return (
    <main className='container-fluid'>


      <div id={styles.fatherTodo}> {/*div principal das tarefas cadastradas */}

        <div id={styles.columnBacklog} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'columnBacklog')}> {/*Coluna "Em Andamento"*/}
          <h2 className={styles.titleColumn}>BackLog</h2>
          {tasks.map((task, index) => (
            task.column === 'columnBacklog' && (
              <div key={index} className={styles.newTodo} draggable='true' onDragStart={(e) => handleDragStart(e, index)} onClick={() => openTaskModal(task)}>
                <div className={styles.sttBackLog}></div>
                <h5>{task.name}</h5>
                <p>{task.description.length > 20 ? `${task.description.slice(0, 20)}...` : task.description}</p>
                {task.description.length > 20}
                <div className={styles.btnDel}>
                  <button onClick={() => removeTask(index)}>
                    <Image
                      src="/trashIcon.png"
                      width={20}
                      height={20}
                      alt="Icon trash"
                      className={styles.imgTodo}
                    />
                  </button>
                </div>
              </div>
            )
          ))}

          <BtnPrimary text={'Add Task'} onClick={() => openModal('columnBacklog')} />

        </div>


        <div id={styles.columnTask} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'columnTask')}>  {/*Coluna "A Fazer"*/}
          <h2 className={styles.titleColumn}>To Do</h2>
          {tasks.map((task, index) => (
            task.column === 'columnTask' && (
              <div key={index} className={styles.newTodo} draggable='true' onDragStart={(e) => handleDragStart(e, index)} onClick={() => openTaskModal(task)}>
                <div className={styles.sttTask}></div>
                <h5>{task.name}</h5>
                <p>{task.description.length > 20 ? `${task.description.slice(0, 20)}...` : task.description}</p>
                {task.description.length > 20}
                <div className={styles.btnDel}>
                  <button onClick={() => removeTask(index)}>
                    <Image
                      src="/trashIcon.png"
                      width={20}
                      height={20}
                      alt="Icon trash"
                    />
                  </button>
                </div>



              </div>
            )
          ))}
          {/* <Modal show={showModal} onClose={closeModal} onNewTask={handleNewTask} /> */}
          <BtnPrimary text={'Add Task'} onClick={() => openModal('columnTask')} />
        </div>



        <div id={styles.columnProgress} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'columnProgress')}> {/*Coluna "Em Andamento"*/}
          <h2 className={styles.titleColumn}>In Progress</h2>
          {tasks.map((task, index) => (
            task.column === 'columnProgress' && (
              <div key={index} className={styles.newTodo} draggable='true' onDragStart={(e) => handleDragStart(e, index)} onClick={() => openTaskModal(task)}>
                <div className={styles.sttProgress}></div>
                <h5>{task.name}</h5>
                <p>{task.description.length > 20 ? `${task.description.slice(0, 20)}...` : task.description}</p>
                {task.description.length > 20}
                <div className={styles.btnDel}>
                  <button onClick={() => removeTask(index)}>
                    <Image
                      src="/trashIcon.png"
                      width={20}
                      height={20}
                      alt="Icon trash"
                    />
                  </button>
                </div>
              </div>
            )
          ))}
          {/* <Modal show={showModal} onClose={closeModal} onNewTask={handleNewTask} /> */}
          <BtnPrimary text={'Add Task'} onClick={() => openModal('columnProgress')} />
        </div>



        <div id={styles.columnConcluded} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'columnConcluded')}> {/*Coluna "Concluido"*/}
          <h2 className={styles.titleColumn}>Done</h2>

          {tasks.map((task, index) => (
            task.column === 'columnConcluded' && (
              <div key={index} className={styles.newTodo} draggable='true' onDragStart={(e) => handleDragStart(e, index)} onClick={() => openTaskModal(task)}>
                <div className={styles.sttConcluded}></div>
                <h5>{task.name}</h5>
                <p>{task.description.length > 20 ? `${task.description.slice(0, 20)}...` : task.description}</p>
                {task.description.length > 20}
                <div className={styles.btnDel}>
                  <button onClick={() => removeTask(index)}>
                    <Image
                      src="/trashIcon.png"
                      width={20}
                      height={20}
                      alt="Icon trash"
                    />
                  </button>
                </div>

              </div>
            )
          ))}
          {/* <Modal show={showModal} onClose={closeModal} onNewTask={handleNewTask} /> */}
          <BtnPrimary text={'Add Task'} onClick={() => openModal('columnConcluded')} />

        </div>

        <div id={styles.columnReview} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'columnReview')}> {/*Coluna "Em Andamento"*/}
          <h2 className={styles.titleColumn}>Review</h2>
          {tasks.map((task, index) => (
            task.column === 'columnReview' && (
              <div key={index} className={styles.newTodo} draggable='true' onDragStart={(e) => handleDragStart(e, index)} onClick={() => openTaskModal(task)}>
                <div className={styles.sttReview}></div>
                <h5>{task.name}</h5>
                <p>{task.description.length > 20 ? `${task.description.slice(0, 20)}...` : task.description}</p>
                {task.description.length > 20}
                <div className={styles.btnDel}>
                  <button onClick={() => removeTask(index)}>
                    <Image
                      src="/trashIcon.png"
                      width={20}
                      height={20}
                      alt="Icon trash"
                    />
                  </button>
                </div>
              </div>
            )
          ))}

          <BtnPrimary text={'Add Task'} onClick={() => openModal('columnReview')} />
          {/* <Modal show={showModal} onClose={closeModal} onNewTask={handleNewTask} /> */}
        </div>

        <Modal show={showModal} onClose={closeModal} onNewTask={handleNewTask} />



        {tasks.map((task, index) => (
          <TaskModal
            key={index}
            show={selectedTask === task}
            onClose={() => setSelectedTask(null)}
            task={task}
          />
        ))}
      </div>



    </main>
  )
}

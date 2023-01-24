import React, { useState, useEffect } from "react";

const toDoList = () => {

// Creo los estados para la entrada de valores (inputValue) y para la lista de tareas (taskList)
const [inputValue, setInputValue] = useState("")
const [taskList, setTaskList] = useState([])

// Creación del usuario
	function crearUsuario() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javgarmon',{
			method: 'POST', //  Los métodos pueden ser: GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([]) // body data type must match "Content-Type" header
		})//busca la info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
	}

// Funcion para obtener la lista de tareas del usuario
	function getList() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javgarmon',{
			method: 'GET', 
		})
		.then((response)=>response.json())
		.then((data)=>setTaskList(data))
		.catch((err)=>console.log(err))
	}

// Función para enviar la lista de tareas del usuario
	const putList = async (taskList) => {
		try {
			await fetch('https://assets.breatheco.de/apis/fake/todos/user/javgarmon',{
			method: 'PUT', 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(taskList) 
		})
		} catch (error) {
			console.log(error)
		}
		
	}

// Función useEffect
	useEffect(() => {
		//crearUsuario();
		getList();
		console.log(taskList)
		console.log("Hasta aquí ok");
	}, [])

	useEffect(() =>{
		if (taskList.length >0) {
			putList(taskList)
		}
	}, [taskList])

// Función para manejar la entrada de valores
const handleInputChange = (e) => {
	if (e.key === "Enter"){	
		if (inputValue !== "") {
				setTaskList([...taskList, {label:inputValue, done:false}])
				setInputValue("")
			} 
		}
	}
		
// Función para manejar la eliminación de elementos de la lista de tareas
	const handleRemoveTask = (index) => {
		const updatedTask = [...taskList];
		updatedTask.splice(index, 1);
		setTaskList(updatedTask);
		console.log(taskList)
	}

	return (
		<>
		<div className="text-center">
			<h1>To-Do List</h1>
			<div className="container">
				<div className="mb-3">
{/* Input para añadir tareas a la lista */}
					<input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a task and press Enter" 
						onChange={e => setInputValue(e.target.value)}      
						value={inputValue}
						onKeyDown={handleInputChange} />
				</div>
			</div>
{/* Lista donde se van añadiento las tareas */}
			<div className="container">{console.log(taskList)}
				<ul className="list-group">
					{taskList && taskList.map((task, index) => (
						<li key={index} >
							{task.label}
	{/* Botón para eliminar tarea */}
							<span>
								<i className="fa fa-trash" onClick={() => handleRemoveTask(index)}></i>
							</span>
						</li>
					))}
				</ul>
			</div>
{/* Info de tareas pendientes */}
			<div className="container"><p>Pending tasks:{taskList.length}</p></div>
		</div>
		</>
	);
}

export default toDoList;

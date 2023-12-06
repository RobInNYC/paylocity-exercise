import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { getEmployees, addEmployee, saveEmployee, getEmployeeProjectedCost } from './employee-api.js';



export function EmployeeEdit(props) {
	const [ fname, setFname ] = useState("");
	const [ employeeToEdit, setEmployeeToEdit ] = useState(props.id);
	const [ employeeData, setEmployeeData ] = useState({});

	const allEmployees = getEmployees();

	const handleCancelButtonClick = () => {
		setFname("");
		setEmployeeData({
			fname: ''
			, dependents: []
			, id: 0
		});
		props.editCompleteCallback();
	}

	const handleSaveButtonClick = () => {
		const employeeToSave = {
			...employeeData
			, fname: fname
			, id: props.id
		};
		saveEmployee(employeeToSave);
		setFname("");
		setEmployeeData({
			fname: ''
			, dependents: []
			, id: 0
		});
		props.editCompleteCallback();
	};

	const handleTextChange = (event) => {
		setFname(event.target.value);
	}

	useEffect(() => {
		setEmployeeToEdit(props.id);
		const foundEmployee = allEmployees.find((employee) => {
			return employee.id === props.id;
		});
		if (foundEmployee) {
			setEmployeeData(foundEmployee);
			setFname(foundEmployee.fname);
		}
	}, [props.id]);

	const changeDependentName = (event) => {
		const newDependents = [...employeeData.dependents];
		newDependents[event.target.getAttribute("dIdx")] = event.target.value;
		setEmployeeData({
			...employeeData
			, dependents: newDependents
		});
	}

	const removeDependent = (event) => {
		const newDependents = [...employeeData.dependents];
		newDependents.splice(event.target.getAttribute("dIdx"), 1);
		setEmployeeData({
			...employeeData
			, dependents: newDependents
		});
	}

	const addNewDependent = () => {
		const newDependents = employeeData.dependents ? [...employeeData.dependents] : [];
		newDependents.push("");
		setEmployeeData({
			...employeeData
			, dependents: newDependents
		});
	}

	return (
		<div>
			<h1>Employee Edit: { employeeToEdit }</h1>
			<table>
				<tbody>
					<tr>
						<td>First Name</td>
						<td><input type="text" value={ fname } onChange={ handleTextChange } /></td>
					</tr>
					{
						employeeData.dependents?.length > 0 &&
						<tr>
							<td>Dependents</td>
							<td>
								<ul>
									{ employeeData.dependents.map((dependent, idx) => {
										return (<li key={ idx }>
											<input dIdx={ idx } value={ dependent } type="text" onChange={ changeDependentName } />
											<button dIdx={ idx } onClick={ removeDependent }>Remove</button>
										</li>)
									})}
								</ul>
							</td>
						</tr>
					}
					<tr>
						<td colSpan="2">
						<button onClick={ addNewDependent }>Add New Dependent</button>
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<button onClick={ handleSaveButtonClick }>Save { employeeToEdit === 0 ? 'New' : '' } Employee</button>
							<button onClick={ handleCancelButtonClick }>Cancel</button>
						</td>
					</tr>
					<tr>
						{ 
							fname.length > 0 &&
							<td colSpan="2">
								Projected Cost: { getEmployeeProjectedCost(employeeData) }
							</td>
						}
					</tr>
				</tbody>
			</table>
		</div>
	)
}

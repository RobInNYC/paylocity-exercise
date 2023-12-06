import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
		getEmployees
		, addEmployee
		, subscribeToChanges
		, getEmployeeCost
		, getEmployeeCostPerPeriod 
		, getEmployeeNetPayPerPeriod
		, getEmployeeNetPayPerYear
} from './employee-api.js';

import './employee-list.css';


export function EmployeeList(props) {
	const [ employees, setEmployees ] = useState([]);

	const updateEmployees = () => {
		setEmployees(getEmployees());
	}

	useEffect(() => {
		updateEmployees();
		subscribeToChanges(updateEmployees);
	}, []);

	const editEmployee = (employeeId) => {
		props.editCallback(employeeId);
	}


	return (
		<div className="employee-list">
			<div className="list-header">
				<h1>Employee List: { employees.length }</h1>
			</div>
			<div className="list-body">
				<table>
					<tbody>
						{employees.map((employee, idx) => {
							return (
								<React.Fragment>
								<tr key={ idx }>
									<td>
										<button onClick={ (() => { editEmployee(employee.id) })}>Edit</button>
									</td>
									<td>
										<h4>
											{employee.fname}: (Employee ID: { employee.id })
										</h4>
									</td>
								</tr>
								<tr>
									<td colSpan="2">
									</td>
									<td>
										({ employee.dependents.length === 0 ? 'No ' : '' }Dependents{ employee.dependents.length !== 0 ? ': ' + employee.dependents.join(', ') : '' })
									</td>
								</tr>
								<tr>
									<td colSpan="2"></td>
									<td>Deductions:</td>
									<td>
										(${ getEmployeeCost(employee.id) } / year)
									</td>
								</tr>
								<tr>
									<td colSpan="3"></td>
									<td>
										(${ getEmployeeCostPerPeriod(employee.id) } / pay period)
									</td>
								</tr>
								<tr>
									<td colSpan="2"></td>
									<td>Net Pay:</td>
									<td>
										(${ getEmployeeNetPayPerYear(employee.id) } / year)
									</td>
								</tr>
								<tr>
									<td colSpan="3"></td>
									<td>
										(${ getEmployeeNetPayPerPeriod(employee.id) } / pay period)
									</td>
								</tr>
								</React.Fragment>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}


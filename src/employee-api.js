let employeeList = [
	{
		id: 1
		, fname: "John"
		, dependents: []
		, enrolledInBenefits: false
	}
	, {
		id: 2
		, fname: "Steve"
		, dependents: [
			"Alice"
			, "Jane"
		]
		, enrolledInBenefits: true
	}
];

const EMPTY_EMPLOYEE = {
	id: 0
	, fname: ""
	, dependents: []
};

const TOTAL_PAY_PERIODS_PER_YEAR = 26;

let subscribers = [];


export const subscribeToChanges = (callback) => {
	subscribers.push(callback);
};

export const notifyChanges = () => {
	subscribers.forEach((callback) => {
		callback();
	});
}

export const getEmployees = () => {
	return [...employeeList];
};

export const addEmployee = (fname) => {
	employeeList.push({
		id: employeeList.length + 1
		, fname: fname
		, dependents: []
	});

	notifyChanges();
}

export const saveEmployee = (employee) => {
	let foundEmployee = employeeList.find((e) => {
		return e.id === employee.id;
	});
	if (! foundEmployee) {
		foundEmployee = Object.assign({}, EMPTY_EMPLOYEE);
		foundEmployee.id = employeeList.length + 1;
		employeeList.push(foundEmployee);
	}
	foundEmployee.fname = employee.fname;
	foundEmployee.dependents = [...employee.dependents];
	foundEmployee.enrolledInBenefits = employee.enrolledInBenefits;

	console.log(employeeList);

	notifyChanges();
}

const getCostByName = (name, originalCost) => {
	if (name?.toUpperCase().startsWith("A")) {
		return originalCost * 0.9;
	}
	return originalCost;
}

export const getEmployeeCost = (employeeId) => {
	const foundEmployee = employeeList.find((employee) => {
		return employee.id === employeeId;
	});

	let totalCost = getEmployeeProjectedCost(foundEmployee);
	return totalCost;
}

export const getEmployeeCostPerPeriod = (employeeId) => {
	let totalCost = getEmployeeCost(employeeId);

	return Math.floor((totalCost / TOTAL_PAY_PERIODS_PER_YEAR) * 100) / 100;
}

export const getEmployeeNetPayPerYear = (employeeId) => {
	return getEmployeeNetPayPerPeriod(employeeId) * TOTAL_PAY_PERIODS_PER_YEAR;
}

export const getEmployeeNetPayPerPeriod = (employeeId) => {
	return 2000 - getEmployeeCostPerPeriod(employeeId);
}

export const getEmployeeProjectedCost = (employeeData) => {
	if (employeeData.enrolledInBenefits === false) {
		return 0;
	}

	let totalCost = getCostByName(employeeData.fname, 1000);
	employeeData.dependents?.forEach((dependent) => {
		totalCost += getCostByName(dependent, 500);
	});

	return totalCost;
}

import { faker } from '@faker-js/faker';
import { Router } from 'express';

export interface Employee {
	id: string;
	name: string;
	designation: string;
	hired_date: Date;
	salary: number;
}

const employees: Employee[] = Array(20)
	.fill(null)
	.map(() => {
		const name = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
		};

		return {
			id: faker.datatype.uuid(),
			name: `${name.firstName} ${name.lastName}`,
			designation: faker.name.jobTitle(),
			hired_date: faker.date.past(),
			salary: faker.datatype.number({ min: 10000, max: 100000 }),
		};
	});

export const employeesRouter = Router();

employeesRouter.get('/', (request, response) => {
	response.json(employees);
});

employeesRouter.post('/', (request, response) => {
	const { name, designation, hired_date, salary } = request.body;

	const employee = {
		id: faker.datatype.uuid(),
		name,
		designation,
		hired_date,
		salary,
	};

	employees.push(employee);

	return response.json(employee);
});

employeesRouter.put('/:id', (request, response) => {
	const { id } = request.params;
	const { name, designation, hired_date, salary } = request.body;

	const employeeIndex = employees.findIndex(employee => employee.id === id);

	if (employeeIndex < 0) {
		return response.status(404).json({ error: 'Employee not found.' });
	}

	const employee = {
		...employees[employeeIndex],
		name,
		designation,
		hired_date,
		salary,
	};

	employees[employeeIndex] = employee;

	return response.json(employee);
});

employeesRouter.delete('/:id', (request, response) => {
	const { id } = request.params;

	const employeeIndex = employees.findIndex(employee => employee.id === id);

	if (employeeIndex < 0) {
		return response.status(404).json({ error: 'Employee not found.' });
	}

	const deleted = employees.splice(employeeIndex, 1);

	return response.json(deleted);
});

employeesRouter.get('/:id', (request, response) => {
	const { id } = request.params;

	const employee = employees.find(employee => employee.id === id);

	if (!employee) {
		return response.status(404).json({ error: 'Employee not found.' });
	}

	return response.json(employee);
});

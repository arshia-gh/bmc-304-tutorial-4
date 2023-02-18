import { faker } from '@faker-js/faker';
import { Router } from 'express';

export interface Student {
	id: string;
	name: string;
	email: string;
	age: number;
	gpa: number;
}

const students: Student[] = Array(20)
	.fill(null)
	.map(() => {
		const name = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
		};

		return {
			id: faker.datatype.uuid(),
			name: `${name.firstName} ${name.lastName}`,
			email: faker.internet.email(),
			age: faker.datatype.number({ min: 18, max: 24 }),
			gpa: faker.datatype.number({ min: 0, max: 4, precision: 0.01 }),
		};
	});

export const studentsRouter = Router();

studentsRouter.get('/', (request, response) => {
	response.json(students);
});

studentsRouter.post('/', (request, response) => {
	const { name, email, age, gpa } = request.body;

	const student = {
		id: faker.datatype.uuid(),
		name,
		email,
		age,
		gpa,
	};

	students.push(student);

	return response.json(student);
});

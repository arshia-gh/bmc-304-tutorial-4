import { faker } from '@faker-js/faker';
import { Router } from 'express';

export interface Student {
	id: string;
	name: string;
	email: string;
	age: number;
	gpa: number;
}

const students: Student[] = [];

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

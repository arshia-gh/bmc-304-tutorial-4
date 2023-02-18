import { faker } from '@faker-js/faker';
import { Router } from 'express';

export interface Album {
	id: string;
	title: string;
	artist: string;
	year: number;
	cover: string;
}

const albums: Album[] = [];

export const albumsRouter = Router();

albumsRouter.get('/', (request, response) => {
	response.json(albums);
});

albumsRouter.post('/', (request, response) => {
	const { title, artist, year, cover } = request.body;

	const album = {
		id: faker.datatype.uuid(),
		title,
		artist,
		year,
		cover,
	};

	albums.push(album);

	return response.json(album);
});

albumsRouter.put('/:id', (request, response) => {
	const { id } = request.params;
	const { title, artist, year, cover } = request.body;

	const albumIndex = albums.findIndex(album => album.id === id);

	if (albumIndex < 0) {
		return response.status(404).json({ error: 'Album not found.' });
	}

	const album = {
		...albums[albumIndex],
		id,
		title,
		artist,
		year,
		cover,
	};

	albums[albumIndex] = album;

	return response.json(album);
});

albumsRouter.delete('/:id', (request, response) => {
	const { id } = request.params;

	const albumIndex = albums.findIndex(album => album.id === id);

	if (albumIndex < 0) {
		return response.status(404).json({ error: 'Album not found.' });
	}

	const deleted = albums.splice(albumIndex, 1);

	return response.json(deleted);
});

albumsRouter.get('/:id', (request, response) => {
	const { id } = request.params;

	const album = albums.find(album => album.id === id);

	if (!album) {
		return response.status(404).json({ error: 'Album not found.' });
	}

	return response.json(album);
});

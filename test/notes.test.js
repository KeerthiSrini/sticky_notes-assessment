const request = require("supertest");
let {
	app
} = require("../app");
let {
	server
} = require("../app");
let delay = require("delay");
let mongoose = require("mongoose");

let createTestData = {
	"title": "new",
	"content": "This is a new notes content for testing the API",
}

let updateTestData = {
	"title": "new",
	"content": "This is a updated notes content for testing the API",
}

describe('Error Validation for Invalid URL', () => {
	it('For Invalid GET Method URL', async () => {
		const res = await request(app)
			.get(`/api/wrongurl`)
		expect(!res.success);
		expect(404);
	});

	it('For Invalid POST Method URL', async () => {
		const res = await request(app)
			.post(`/api/wrongurl`)
		expect(!res.success);
		expect(404);
	});

	it('For Invalid PUT Method URL', async () => {
		const res = await request(app)
			.put(`/api/wrongurl`)
		expect(!res.success);
		expect(404);
	});

	it('For Invalid DELETE Method URL', async () => {
		const res = await request(app)
			.delete(`/api/wrongurl`)
		expect(!res.success);
		expect(404);
	});
});

describe("Sticky Notes", () => {
    it('Create a new Sticky Notes', async () => {
		const res = await request(app)
			.post(`/stickyNotes/create`)
            .send({
                ...createTestData
            })
			.set({
				'Accept': 'application/json'
			})
		expect(res.body)
		expect(res.statusCode).toEqual(200);
	})

    it('Update a new Sticky Notes', async () => {
		const res = await request(app)
			.post(`/stickyNotes/update/new`)
            .send({
                ...updateTestData
            })
			.set({
				'Accept': 'application/json'
			})
		expect(res.body)
		expect(res.statusCode).toEqual(200);
	})

    it('Update a new Sticky Notes', async () => {
		const res = await request(app)
			.post(`/stickyNotes/update/title`)
            .send({
                ...updateTestData
            })
			.set({
				'Accept': 'application/json'
			})
		expect(res.body)
		expect(res.statusCode).toEqual(400);
	})

    it('Get Notes Detail by Title', async () => {
		const res = await request(app)
			.get(`/stickyNotes/getNotesDetails/new`)
			.set({
				'Accept': 'application/json'
			})
		expect(res.body)
		expect(res.statusCode).toEqual(200);
	})

    it('Get Notes List', async () => {
		const res = await request(app)
			.get(`/stickyNotes/getAllNotes`)
			.set({
				'Accept': 'application/json'
			})
		expect(res.body)
		expect(res.statusCode).toEqual(200);
	})

    it('Delete Notes by Title', async () => {
		const res = await request(app)
			.delete(`/stickyNotes/delete/new`)
			.set({
				'Accept': 'application/json'
			})
		expect(res.body)
		expect(res.statusCode).toEqual(200);
	})

    it('Get Notes Detail by Title after deleting', async () => {
		const res = await request(app)
			.get(`/stickyNotes/getNotesDetails/new`)
			.set({
				'Accept': 'application/json'
			})
		expect(res.statusCode).toEqual(400);
	})

    it('Get Notes List after deleting', async () => {
		const res = await request(app)
			.get(`/stickyNotes/getAllNotes`)
			.set({
				'Accept': 'application/json'
			})
		expect(res.statusCode).toEqual(400);
	})
});

afterAll(async() => {
	mongoose.connection.close()
    await delay(500);
});
const request = require('supertest');
const server = require('../index.js');
const Todo = require('../src/models/ToDo.js');
const User = require('../src/models/User.js');
const mongoose = require('mongoose');
const { closeDb } = require("../db.js");

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

process.env.NODE_ENV = "test";

// Mock User data for testing
const mockUser = {
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'testpassword',
    mobileNumber: '1234567890'
};

describe('To do task api endpoints', () => {
    let token;
    let userId;
    let todoId;

    beforeAll(async () => {
        // Sign up the user
        const signUpRes = await request(server)
            .post('/api/v1/user/signup')
            .send(mockUser);
        userId = signUpRes.body.data._id;
        token = signUpRes.body.token;
    });

    afterAll(async () => {
        await User.findByIdAndDelete(userId);
        await closeDb();
        await server.close();
        mongoose.connection.close();
    });

    // Check test case for create todo task for a user
    it('should create a todo task', async () => {
        const mockCreateTodo = {
            "title": "Buy stocks",
            "description": "Buy Nvidea, apple, google",
            "dueDate": "2024-05-15",
            "priority": "low",
            "status": "pending"
        }

        const res = await request(server)
            .post('/api/v1/todos')
            .set('Authorization', `Bearer ${token}`)
            .send(mockCreateTodo);

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Todo created successfully');
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.title).toEqual(mockCreateTodo.title);

        todoId = res.body.data._id;
    });

    // check test case for get todo task for a user
    it('should get a todo task', async () => {
        const res = await request(server)
            .get(`/api/v1/todos`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.data[0]).toHaveProperty('_id');
        expect(res.body.data[0]._id).toEqual(todoId);
    });

    // check test case for update todo task for a user
    it('should update a todo task', async () => {
        const mockUpdateTodo = {
            "title": "Sell stocks",
            "description": "Sell Nvidea, apple, google",
            "dueDate": "2024-05-20",
            "priority": "high",
            "status": "completed"
        }

        const res = await request(server)
            .put(`/api/v1/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(mockUpdateTodo);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Todo updated successfully');
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data._id).toEqual(todoId);
        expect(res.body.data.title).toEqual(mockUpdateTodo.title);
    });

    // check test case for delete todo task for a user
    it('should delete a todo task', async () => {
        const res = await request(server)
            .delete(`/api/v1/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Todo deleted successfully');
    });
});

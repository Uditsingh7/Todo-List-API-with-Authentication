const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo-List-API-with-Authentication',
            description: "API endpoints for a todo list with authentication documented on swagger",
            contact: {
                name: "Uditsingh Thakur",
                email: "uditsingh777.ut@gmail.com",
                url: "https://github.com/Uditsingh7/Todo-List-API-with-Authentication/"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3001/",
                description: "Local server"
            },
            {
                url: "https://todo-wand-api-fbe7cc6946ca.herokuapp.com/",
                description: "Live server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                TodoInput: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        dueDate: { type: 'string', format: 'date' },
                        priority: { type: 'string', enum: ['low', 'medium', 'high'] },
                        status: { type: 'string', enum: ['pending', 'completed'] },
                    },
                    required: ['title', 'description', 'dueDate'],
                },
            },
        },

    },
    // Our routes path
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    console.log("Swagger setup executed successfully.");
    console.log("APIs loaded from:", options.apis);
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;

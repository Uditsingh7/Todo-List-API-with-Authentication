const zod = require("zod");
const Todo = require("../models/ToDo");

const todoInputSchema = zod.object({
    title: zod.string().min(1).max(255),
    description: zod.string(),
    dueDate: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    priority: zod.enum(['low', 'medium', 'high']).optional(),
    status: zod.enum(['pending', 'completed']).optional(),
});

const todoListQuerySchema = zod.object({
    page: zod.number().min(1).optional(),
    limit: zod.number().min(1).max(100).optional(),
    sort: zod.string().optional(),
    order: zod.enum(['asc', 'desc']).optional(),
});

const todoUpdateSchema = zod.object({
    title: zod.string().min(1).max(255).optional(),
    description: zod.string().optional(),
    dueDate: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), // Validate as string in YYYY-MM-DD format
    priority: zod.enum(['low', 'medium', 'high']).optional(),
    status: zod.enum(['pending', 'completed']).optional(),
}).partial();

// Create a new todo 
const createTodo = async (req, res) => {
    try {
        const { success, error } = todoInputSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs",
                errors: error.formErrors.fieldErrors,
            });
        }

        const todo = await Todo.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message",
        });
    }
};

// Get all todos specific to a user
const getTodos = async (req, res) => {
    try {
        console.log("userid: ", req.user.id);
        const { success, error } = todoListQuerySchema.safeParse(req.query);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid query parameters",
                errors: error.formErrors.fieldErrors,
            });
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        // Sorting and Ordering
        const sortField = req.query.sort || 'createdAt';
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        const todos = await Todo.find({ user: req.user.id }).
            skip(skip).limit(limit).sort({ [sortField]: sortOrder });

        const totalTodoCount = await Todo.countDocuments({ user: req.user.id });

        res.status(200).json({
            success: true,
            message: "Todos retrieved successfully",
            pagination: {
                totalTodoCount,
                totalPages: Math.ceil(totalTodoCount / limit),
                currentPage: page,
                hasNextPage: page < Math.ceil(totalTodoCount / limit),
                hasPrevPage: page > 1
            },
            data: todos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message",
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Validate if id is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Todo ID is required",
            });
        }

        // Find the todo by id and user
        const todo = await Todo.findOne({ _id: id, user: userId });

        // If todo is not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        // Validate and update the todo
        const { success, data, error } = todoUpdateSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid update data",
                errors: error.formErrors.fieldErrors,
            });
        }

        // Update the todo
        Object.assign(todo, data);
        await todo.save();

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message",
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Validate if id is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Todo ID is required",
            });
        }

        // Find the todo by id and user
        const todo = await Todo.findOne({ _id: id, user: userId });

        // If todo is not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        // Delete the todo
        await Todo.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message",
        });
    }
};


module.exports = { createTodo, getTodos, updateTodo, deleteTodo }; 

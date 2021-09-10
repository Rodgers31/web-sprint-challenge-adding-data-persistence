// build your `/api/tasks` router here

const router = require('express').Router();
const Task = require('./model');

router.get('/', async (req, res, next) => {
	try {
		const tasks = await Task.getAllTasks();
		const allTasks = tasks.map((e) => {
			return {
				task_id: e.task_id,
				task_description: e.task_description,
				task_notes: e.task_notes,
				task_completed: e.task_completed === 0 ? false : true,
				project_name: e.project_name,
				project_description: e.project_description,
			};
		});
		res.json(allTasks);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	const tasks = req.body;

	try {
		if (!tasks.task_description || !tasks.project_id) {
			res.status(400).json({
				message: 'You are missing a required field',
			});
		}
		const newTask = await Task.createNewTask(tasks);
		const createdTask = {
			task_id: newTask[0].task_id,
			task_description: newTask[0].task_description,
			task_notes: newTask[0].task_notes,
			task_completed: newTask[0].task_completed === 0 ? false : true,
			project_id: newTask[0].project_id,
		};
		res.status(201).json(createdTask);
	} catch (err) {
		next(err);
	}
});

module.exports = router;

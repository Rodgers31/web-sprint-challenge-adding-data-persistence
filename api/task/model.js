// build your `Task` model here
const db = require('../../data/dbConfig');

const getAllTasks = () => {
	return db('tasks as ta')
		.leftJoin('projects as o', 'ta.project_id', 'o.project_id')
		.select(
			'task_id',
			'task_description',
			'task_notes',
			'task_completed',
			'project_name',
			'project_description'
		);
};

const createNewTask = async (task) => {
	const newTask = await db('tasks').insert(task, 'id');
	return await db('tasks as ta')
		.leftJoin('projects as o', 'ta.project_id', 'o.project_id')
		.where('ta.task_id', newTask)
		.select(
			'task_id',
			'task_description',
			'task_notes',
			'task_completed',
			'o.project_id'
		);
};

module.exports = {
	getAllTasks,
	createNewTask,
};

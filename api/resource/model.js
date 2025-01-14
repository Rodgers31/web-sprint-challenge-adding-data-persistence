// build your `Resource` model here
const db = require('../../data/dbConfig');
function getAllResources() {
	return db('resources');
}
const getById = (id) => {
	return db('resources')
		.where('resource_id', id)
		.select('resource_name')
		.first();
};

async function createResource(resource) {
	return db('resources')
		.insert(resource)
		.then((id) => {
			return getById(id[0]);
		});
}

module.exports = {
	getAllResources,
	createResource,
};

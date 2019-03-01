import { faker } from 'ember-cli-mirage';

export default function() {
	this.passthrough();
	this.urlPrefix = 'https://api.github.com';    // make this `http://localhost:8080`, for example, if your API is on a different server

	this.get('/repos/:repo/commits/:ref/status', () => {
		const statuses = [
			{ sha: 'foobar', state: 'error' },
			{ sha: 'foobar1', state: 'pending' },
			{ sha: 'foobar2', state: 'failure' },
			{ sha: 'foobar3', state: 'success' }
		];

		return statuses[Math.floor(Math.random()*statuses.length)];
	});

	this.get('/repos/:repo/branches/', (schema, request) => {
		return schema.githubBranches.all();
	});
}

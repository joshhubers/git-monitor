import { faker } from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

   this.urlPrefix = 'https://api.github.com';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

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

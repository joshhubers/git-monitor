import GithubAdapter from 'ember-data-github/adapters/github';

export default GithubAdapter.extend({
  urlForQueryRecord(query) {
    const repo = query.repo;
    const ref = query.ref;

    delete query.repo;
    delete query.ref;

    return `${this.get('host')}/repos/${repo}/commits/${ref}/status`;
  },
});

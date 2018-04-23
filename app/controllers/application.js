import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  gitInfo: null,
  githubSession: service(),
  store: service(),
  foo: null,

  init() {
    this.get('githubSession').set('githubAccessToken', '');

    this.get('store').query('github-branch', { repo: 'OAISD/inqwizit-uae-web-app' } ).then((branches) => { debugger; });
      

    this.set('gitInfo', [
      { name: 'test-branch-error', status: 'error' },
      { name: 'test-branch-failure', status: 'failure' },
      { name: 'test-branch-pending', status: 'pending' },
      { name: 'test-branch-success', status: 'success' },
    ]);
  },
});

import Controller from '@ember/controller';

export default Controller.extend({
  gitInfo: null,

  init() {
    this.set('gitInfo', [
      { name: 'test-branch-error', status: 'error' },
      { name: 'test-branch-failure', status: 'failure' },
      { name: 'test-branch-pending', status: 'pending' },
      { name: 'test-branch-success', status: 'success' },
    ]);
  },
});

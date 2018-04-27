import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  githubSession: service(),
  store: service(),
  foo: null,
  gitInfo: null,
  monitorRepo: 'my-repo',
  token: '',

  init() {
    this.set('gitInfo', []);
    this.get('githubSession').set('githubAccessToken', this.get('token'));

    this.get('store').query('github-branch', { repo: this.get('monitorRepo') } ).then(branches => { 
      this.buildBranches(branches);
    });
  },

  buildBranches(branches) {
    branches.forEach(b => {
      const branchSha = b.commit.sha;

      this.get('store').queryRecord('github-state', { repo: this.get('monitorRepo'), ref: branchSha}).then(gitState => {
        const branchState = { name: b.name, status: gitState.state };
        this.get('gitInfo').pushObject(branchState);
      });
    });
  },
});

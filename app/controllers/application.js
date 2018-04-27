import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  githubSession: service(),
  store: service(),
  foo: null,
  gitInfo: null,
  monitorRepo: '',
  token: '',

  init() {
    this.set('gitInfo', []);
    this.get('githubSession').set('githubAccessToken', token);

    this.get('store').query('github-branch', { repo: monitorRepo } ).then(branches => { 
      branches.forEach(b => {
        const branchSha = b.commit.sha;

        this.get('store').queryRecord('github-state', { repo: monitorRepo, ref: branchSha}).then(gitState => {
          const branchState = { name: b.name, status: gitState.state };
          this.get('gitInfo').pushObject(branchState);
        });
      });
    });
  },
});

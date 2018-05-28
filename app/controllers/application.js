import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  githubSession: service(),
  store: service(),
  gitInfo: null,
  monitorRepo: 'my-repo',
  token: '',

  init() {
    this.set('gitInfo', []);
    get(this, 'githubSession').set('githubAccessToken', this.get('token'));

    this.fetchAndBuildBranches();
    this.poll();
  },

  poll() {
    Ember.run.later(this, 
      function() { 
        this.fetchAndBuildBranches();
        this.poll();
      }, 10000);
  },

  fetchAndBuildBranches() {
    get(this, 'store').query('github-branch', { repo: this.get('monitorRepo') }, { reload : true } ).then(branches => { 
      this.buildBranches(branches);
    });
  },

  buildBranches(branches) {
    branches.forEach(b => {
      const branchSha = b.commit.sha;

      get(this, 'store').queryRecord('github-state', { repo: this.get('monitorRepo'), ref: branchSha}).then(gitState => {
        const branchState = { name: b.name, status: gitState.state };

        const existing = get(this, 'gitInfo').find(gi => gi.name === branchState.name);
        if(existing) {
          this.set('existing', 'status', get(branchState, 'status'));
        } else {
          get(this, 'gitInfo').pushObject(branchState);
        }

      });
    });
  },
});

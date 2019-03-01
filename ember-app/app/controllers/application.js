import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Controller.extend({
  githubSession: service(),
  store: service(),
  gitInfo: null,
  monitorRepo: 'OAISD/inqwizit-reporting',
  token: 'de50b3d0ed59c74bcb8a74c3f819a4ab4d3f230a',

  branches: computed('gitInfo.@each.status', function() {
    return this.get('gitInfo').map(g => {
      return {
        status: g.status,
        name: g.name
      };
    });
  }),

  init() {
    this._super(...arguments);
    this.set('gitInfo', []);
    get(this, 'githubSession').set('githubAccessToken', this.get('token'));

    this.setConfig();
    this.fetchAndBuildBranches();
    this.poll();
  },

	setConfig() {
    fetch('http://localhost:3420')
      .then(response => response.json())
      .then(config => this.set('monitorRepo', config.repoUrl));
	},

  poll() {
    later(this, 
      function() { 
        this.setConfig();
        this.fetchAndBuildBranches();
        this.poll();
      }, 10000);
  },

  fetchAndBuildBranches() {
    get(this, 'store').query('github-branch', { repo: this.get('monitorRepo') }, { reload : true } ).then(branches => { 

      const info = get(this, 'gitInfo');

      const branchesToRemove = info.filter(branch => branches.mapBy('name').indexOf(branch.name) === -1);

      if(branchesToRemove.length > 0) {
        set(this, 'gitInfo', info.filter(branch => branchesToRemove.mapBy('name').indexOf(branch.name) === -1));
      }

      this.buildBranches(branches);
    });
  },

  buildBranches(branches) {
    branches.forEach(b => {
      const branchSha = b.commit.sha;

      get(this, 'store').queryRecord('github-state', { repo: this.get('monitorRepo'), ref: branchSha}, { reload : true }).then(gitState => {
        const branchState = { name: b.name, status: gitState.state };

        const existing = get(this, 'gitInfo').find(gi => gi.name === branchState.name);


        if(existing) {
          set(existing, 'status', get(branchState, 'status'));
        } else {
          get(this, 'gitInfo').pushObject(branchState);
        }

      });
    });
  },
});

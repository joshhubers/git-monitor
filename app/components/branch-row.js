import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  //valid options are error, failure, pending, success
  branch: null,
  classNames: ['branch-row'],
  classNameBindings: ['rowStatus'],

  rowStatus: computed('branch', function() {
    return `branch-row--${this.get('branch.status')}`;
  }),
});

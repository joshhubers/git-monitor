import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    resourceHash.id = resourceHash.sha;

    return this._super(modelClass, resourceHash, prop);
  }
});

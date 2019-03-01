import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  state() {
    return faker.list.random("error", "failure", "pending", "success");
  },

  sha() {
    return faker.random.uuid();
  },
});

const assert = require('assert');
const User = require('../models/User/user_model');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    jason = new User({ firstName: 'jason', email: 'jason@gmail.com' });
    jim = new User({ firstName: 'jim', email: 'jim@gmail.com' });
    joe = new User({ firstName: 'joe', email: 'joe@gmail.com' });
    jordan = new User({ firstName: 'jordan', email: 'jordan@gmail.com' });

    Promise.all([jason.save(), jim.save(), joe.save(), jordan.save()])
      .then(() => done());
  });

  it('finds all players with name Joe', (done) => {
    User.find({ firstName: 'joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('finds a player with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.firstName === 'joe');
        done();
      });
  });

  it('can skip and limit the players result set', (done) => {
    User.find({})
      .sort({ firstName: 1 }) // alphabetical
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length == 2);
        assert(users[0].firstName == 'jim');
        done();
      })
  });
});

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

const checkAutorization = () => {
  if (!Meteor.userId()) {
    alert ('You are not authorized')
    throw new Meteor.Error('not-authorized');
  } 
}


if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert' (text) {
    checkAutorization();
    check(text, String);
    Tasks.insert ({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username  
    })
  },
  'tasks.remove' (taskId) {
    checkAutorization();
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    (Meteor.user().username === task.username || Meteor.user().username === 'Admin')   
      ? Tasks.remove(taskId) 
      : alert ('You can\'t remove someone else\'s task');
  },
  'tasks.setChecked'(taskId, setChecked) {
    console.log (Meteor.user().username);
    checkAutorization();
    check(taskId, String);
    check(setChecked, Boolean);
    const task = Tasks.findOne(taskId);
    (Meteor.user().username === task.username || Meteor.user().username === 'Admin' ) 
      ? Tasks.update(taskId, { $set: {checked: setChecked} })
      : alert ('You can\'t operate with someone else\'s task');
  }
});
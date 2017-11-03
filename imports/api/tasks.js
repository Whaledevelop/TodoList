import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

console.log (Meteor);

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
    check(text, String);
    checkAutorization();
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
    (task.owner === Meteor.userId())   
      ? Tasks.remove(taskId) 
      : alert ('You can\'t remove someone else\'s task');
  },
  'tasks.setChecked'(taskId, setChecked) {
    checkAutorization();
    check(taskId, String);
    check(setChecked, Boolean);
    const task = Tasks.findOne(taskId);
    (task.owner === Meteor.userId()) 
      ? Tasks.update(taskId, { $set: {checked: setChecked} })
      : alert ('You can\'t operate with someone else\'s task');
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    checkAutorization();
    check(taskId, String);
    check(setToPrivate, Boolean);
    Tasks.update(taskId, { $set: {private: setToPrivate} })
  }
});
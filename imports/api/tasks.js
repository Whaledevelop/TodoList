import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', () => Tasks.find());
}

Meteor.methods({
  'tasks.insert' (text, dueDate) {
    if (!Meteor.userId()) {
      alert ('You are not authorized')
    } else {
      check(text, String);
      check(dueDate, String);
      Tasks.insert ({
        text,
        createdAt: new Date(),
        dueDate: dueDate,
        owner: Meteor.userId(),
        username: Meteor.user().username  
      })
    }   
  },
  'tasks.remove' (taskId) {
    if (!Meteor.userId()) {
      alert ('You are not authorized')
    } else {
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    (Meteor.user().username === task.username || Meteor.user().username === 'Admin')   
      ? Tasks.remove(taskId) 
      : alert ('You can\'t remove someone else\'s task');
    }
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    Tasks.update(taskId, { $set: {checked: setChecked} })
  }
});
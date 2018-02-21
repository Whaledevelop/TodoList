import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.isServer ? Meteor.publish('tasks', () => Tasks.find()) : null

Meteor.methods({
  'tasks.insert' (text, dueDate) {
    check(text, String);
    check(dueDate, String);
    Tasks.insert ({
      text,
      createdAt: new Date(),
      dueDate: dueDate,
      owner: Meteor.userId(),
      username: Meteor.user().username  
    }) 
  },
  'tasks.remove' (taskId) {
    check(taskId, String);
    Tasks.remove(taskId) 
  },
  'tasks.setDone'(taskId, setDone) {
    check(taskId, String);
    check(setDone, Boolean);
    Tasks.update(taskId, { $set: {done: setDone} })
  }
});
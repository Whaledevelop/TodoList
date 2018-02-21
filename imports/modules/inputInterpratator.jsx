import moment from 'moment'
import _ from 'lodash'

import {timeInterpratator} from './interpratators/timeInterpratator'
import {dateInterpratator} from './interpratators/dateInterpratator'

export const inputInterpratator = (text) => {
  const textArray = text.toLowerCase().split(' ').filter(item=> item !== '')
  console.log (textArray)
  const {time, numbers} = timeInterpratator(textArray)
  const {date, codeWord} = dateInterpratator(textArray)
  if (time === undefined & date === undefined) {
    return {
      info: 'Укажите срок выполнения задачи'
    }
  } else {
    if (time !== undefined & date === undefined) {
      date = moment().format('YYYY-MM-DD');
    } else if (time === undefined & date !== undefined) {
      time = '23:59';
    } 
    const timePunctuation = textArray.find(item => {
      return item === 'в' || item === 'на'
    })
    let infoForDueDate = `${numbers}, ${codeWord}, ${timePunctuation}`.split(', ');
    infoForDueDate = infoForDueDate.filter(info => info !== 'undefined');
    //const taskText = _.difference(infoForDueDate, textArray)
    let taskText = [];
    for (let i=0; i < textArray.length; i++) {
      if (infoForDueDate.indexOf(textArray[i]) === -1) {
        taskText.push(textArray[i])
      }
    }
    if (infoForDueDate.length === textArray.length) {
      return {
        info: 'Добавьте какую-нибудь информацию о задаче кроме времени выполнения'
      } 
    } else {
      return {
        taskText: taskText.join(' '),
        dueDate: `${date}T${time}`,
        info: 'Нажмите enter'
      }
    }  
  }
}
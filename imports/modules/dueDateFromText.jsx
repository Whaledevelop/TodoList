import moment from 'moment'

import {timeInterpratator} from './interpratators/timeInterpratator'
import {dateInterpratator} from './interpratators/dateInterpratator'

export const dueDateFromText = (text) => {
  const textObj = text.toLowerCase().split(' ').filter(item=> item !== '')
  const {time, numbers} = timeInterpratator(textObj)
  const {date, codeWord} = dateInterpratator(textObj)
  if (time === undefined & date === undefined) {
    return {
      dueDate: '',
      info: 'Укажите срок выполнения задачи'
    }
  } else {
    let counterOfWordsForDueDate = 0
    if (time !== undefined & date === undefined) {
      date = moment().format('YYYY-MM-DD');
      counterOfWordsForDueDate = 1
    } else if (time === undefined & date !== undefined) {
      time = '23:59';
      counterOfWordsForDueDate = 1
    } else if (time === undefined & date === undefined) {
      counterOfWordsForDueDate = 2
    }
    const timePunctuation = textObj.find(item => {
      return item === 'в' || item === 'на'
    })
    let infoForDueDate = `${numbers}, ${codeWord}, ${timePunctuation}`.split(', ');
    infoForDueDate = infoForDueDate.filter(info => info !== 'undefined');
    let taskText = [];
    for (let i=0; i < textObj.length; i++) {
      if (infoForDueDate.indexOf(textObj[i]) === -1) {
        taskText.push(textObj[i])
      }
    }
    if (infoForDueDate.length === textObj.length) {
      return {
        taskText: taskText.join(' '),
        dueDate: '',
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
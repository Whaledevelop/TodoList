import moment from 'moment'

export const dateInterpratator = (textObj) => {  
  const codeWord = textObj.find(word => {
    return word === 'завтра' || word === 'сегодня'
  })
  const date = undefined;
  if (codeWord === 'завтра') {
    return {
      date: moment().add(1,'d').format('YYYY-MM-DD'),
      codeWord: codeWord
    }
  } else if (codeWord === 'сегодня') {
    return {
      date: moment().format('YYYY-MM-DD'),
      codeWord: codeWord
    }
  } else {
    return {
      date: undefined,
      codeWord: undefined
    }
  }
}
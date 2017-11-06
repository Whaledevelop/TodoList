export const timeInterpratator = (textObj) => {
  const numberOrNot = (item) => {
    const parsedItem = parseInt(item, 10);
    return !isNaN(parsedItem) ? true : false;
  }
  const numbers = textObj.find(item => {
      return numberOrNot(item)  
  })
  if (numbers !== undefined) {
    const byColon = numbers.split(':');
    if (byColon.length === 2) {
      if (byColon[0].length <= 2 & byColon[0] < 24 & byColon[0] >= 0
        & byColon[1].length === 2 & byColon[1] < 60 & byColon[1] >= 0) {
        if (byColon[0].length === 1) {
          byColon[0] = `0${byColon[0]}`
        }
        return {
          time: `${byColon[0]}:${byColon[1]}`,
          numbers: numbers
        } 
      }
    }
  }
  return {
    time: undefined,
    numbers: undefined
  }
}
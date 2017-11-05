export const firstLetterUpperCase = (name) => {     
  let lowName = name.toLowerCase()
  let firstLetter = ''
  firstLetter = lowName[0].toUpperCase()
  let cutName = lowName.slice(1, lowName.length)
  name = firstLetter + cutName 
  return name  
}
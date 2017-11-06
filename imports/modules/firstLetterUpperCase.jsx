export const firstLetterUpperCase = (name) => {     
  let lowName = name.toLowerCase()
  const firstLetter = lowName[0].toUpperCase()
  let cutName = lowName.slice(1, lowName.length)
  return (firstLetter + cutName)
}
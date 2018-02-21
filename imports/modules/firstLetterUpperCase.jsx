export const firstLetterUpperCase = (name) => {     
  if (name) {
    let lowName = name.toLowerCase()
    const firstLetter = lowName[0].toUpperCase()
    let cutName = lowName.slice(1, lowName.length)
    return (firstLetter + cutName)
  } else return name
}
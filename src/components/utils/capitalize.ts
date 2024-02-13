export const capitalizeWords = (str: string) => {
  const words = str.split(' ')
  return words.map((word: string) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join(' ');
}
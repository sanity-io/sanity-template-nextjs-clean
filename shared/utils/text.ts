export const capitalizeEachWord = (str: string) => str.split(' ').map(word => {
    if (word.length === 0) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Ensure rest of word is lowercase
  }).join(' ');


  export const snakeCaseToTitleCase = (str: string) => str ? capitalizeEachWord(str.replace(/_/g, ' ')) : ''
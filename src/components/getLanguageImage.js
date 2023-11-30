// Function to get the image based on the language
function getLanguageImage(arr, language) {
  const matchingLanguage = arr.find((lang) => lang.name === language);
  return matchingLanguage ? matchingLanguage.img : '';
}

export default getLanguageImage;

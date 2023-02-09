import { WORDS, PUNCTUATION } from './words'

/* Generate an Integer within specified range */
const randomInt: (min:number,max:number) => number = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Generate random chinese characters of specified length 
 * @param {number} length - Length of the string to be generated
*/ 
const generateText: (length: number) => string = (length) => {
  if (typeof length !== 'number') {
    throw new Error('Invalid argument: length must be a number');
  }
  let str = '';

  for (let i = 1; i <= length; i++) {
    const wordIndex = randomInt(0, WORDS.length - 1);
    str += WORDS[wordIndex];
  }
  return str;
};

/**
 * Generate random chinese paragraph of specified length 
 * @param {number} desiredLength - Length of the string to be generated
*/ 
const generateParagraph: (desiredLength:number) => string = (desiredLength) => {
  if (typeof desiredLength !== 'number') {
    throw new Error('Invalid argument: desiredLength must be a number');
  }
  // Minus 1 to leave room for full stop at the end of paragraph
  desiredLength--;

  let paragraph = '';

  const minSentenceLength = 3;
  const maxSentenceLength = 20;

  while (paragraph.length < desiredLength) { 
    const punctuationIndex = randomInt(0, PUNCTUATION.length - 1);
    const punctuation = PUNCTUATION[punctuationIndex]; // random punctuation

    // Append punctuation, insert punctuation only when paragraph is not empty or not at the end
    if (paragraph.length > 0 && desiredLength - paragraph.length > minSentenceLength ) {
      paragraph += punctuation;

      // Generate words inside brackets
      if (punctuation === '「') {
        const bracketWordLength = randomInt(1, 10);
        paragraph += generateText(bracketWordLength);
        paragraph += '」';
      } 
    }
  
    // Prevent sentence length exceeds
    const remainingLength = desiredLength - paragraph.length;
    const randomMax = remainingLength < maxSentenceLength ? remainingLength : maxSentenceLength;

    // Generate Paragraph
    if (randomMax > minSentenceLength) {
      const sentenceLength = randomInt(minSentenceLength, randomMax);
      paragraph += generateText(sentenceLength);
    } else { // Fill remaining to match paragraph length
      paragraph += generateText(randomMax);
    }
  }

  paragraph += '。';

  return paragraph;
};

/**
 * Generate random chinese article of specified length 
 * @param {number} desiredLength - Length of the string to be generated
*/ 
const genrateArticle: (desiredLength:number) => string[] = (desiredLength) => {
  if (typeof desiredLength !== 'number') {
    throw new Error('Invalid argument: desiredLength must be a number');
  }
  const minParagraphLength = 50;
  const maxParagraphLength = 100;

  let paragraphContents:string[] = [];
  let currentArticleLength = 0;

  while (currentArticleLength < desiredLength) {
    // Prevent paragraph length exceeds
    const remainingLength = desiredLength - currentArticleLength;
    const randomMax = remainingLength < maxParagraphLength ? remainingLength : maxParagraphLength;
    let paragraphLength = randomMax > minParagraphLength ? randomInt(minParagraphLength, randomMax) : randomMax;
    
    // Prevent short paragraph at the end, include next paragraph in to current paragraph when next remaining length < 10
    const nextRandomMax = remainingLength - paragraphLength ;
    if (nextRandomMax < 10) {
      paragraphLength += nextRandomMax;
    }

    // Generate paragraph and store into array
    let paragraph = '';
    paragraph = generateParagraph(paragraphLength); 
    paragraphContents.push(paragraph);
    currentArticleLength += paragraph.length;
  } 

  return paragraphContents;
}

export { generateText, generateParagraph, genrateArticle };
import { REGEXP } from 'constants/index';

const now = new Date();
const min = 1895;
const max = now.getFullYear();

export const isDataValid = (data) => {
  if (!data.title
      || !data.releaseYear
      || !data.format
      || (!!data.stars && !REGEXP.stars.test(data.stars))
     ) {
    return false;
  }

  return true;
}

export const getInvalidData = (data) => {
  const result = {};

  if (!data.title) {
    result.title = 'This field is required';
  }

  if (!data.releaseYear) {
    result.releaseYear = 'This field is required';
  } else if (data.releaseYear < min) {
    result.releaseYear = 'Should be more then 1894';
  } else if (data.releaseYear > max) {
    result.releaseYear = 'Should be less then today';
  }

  if (!data.format) {
    result.format = 'This field is required';
  }

  if (!!data.stars && !REGEXP.stars.test(data.stars)) {
    result.stars = 'Should contains only letters, apostrophes, spaces, comas, dots, dashes';
  }

  return result;
};

/** @module wordsFilter */
import { CategoryMemberObject } from '@/types';

/**
 * Pick only words start with given letter.
 * @param {Array} data An array of objects with words.
 * @param {string} letter A letter to pick words that start with.
 * @returns {Array} Filtered array.
*/
export default function (
  data: CategoryMemberObject[],
  letter: string,
): CategoryMemberObject[] {
  return data.reduce((result: CategoryMemberObject[], dataItem) => {
    const { title } = dataItem;
    if (title.startsWith(letter) || title.toLowerCase().startsWith(letter)) {
      result.push(dataItem);
    }
    return result;
  }, []);
}

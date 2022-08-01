import { CategoryMemberObject } from '@/types';

export default function (
  data: CategoryMemberObject[],
  letter: string,
): CategoryMemberObject[] {
  let result = [];
  for (let dataItem of data) {
    const { title } = dataItem;
    if (title.startsWith(letter) ||
      title.toLowerCase().startsWith(letter)) {
      result.push(dataItem);
    }
  }
  return result;
}

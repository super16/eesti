import { CategoryMemberObject } from '@/types';

export default function (
  data: CategoryMemberObject[],
  letter: string,
): CategoryMemberObject[] {
  return data.reduce((result: CategoryMemberObject[], dataItem) => {
    const { title } = dataItem;
    if (title.startsWith(letter) || title.toLowerCase().startsWith(letter)) {
      result.push(dataItem);
    }
    return result
  }, [])
}

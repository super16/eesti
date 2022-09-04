export interface CategoryMemberObject {
  ns: number,
  pageid: number,
  title: string,
}

export interface ContinueObject {
  cmcontinue: string,
  continue: string
}

export interface ParseParams {
  action: 'parse',
  disabletoc: true,
  format: 'json',
  origin: '*',
  page?: string,
  pageid?: string,
  prop?: string,
  section?: string,
}

export interface QueryParams {
  action: 'query',
  cmlimit: 499,
  cmsort: 'sortkey',
  cmstartsortkeyprefix?: string,
  cmtitle: 'Category:Estonian_lemmas',
  format: 'json',
  list: 'categorymembers',
  origin: '*',
}

export interface ResponseObject {
  batchcomplete: string,
  continue: ContinueObject,
  query: CategoryMemberObject[],
}

export interface SectionObject {
  anchor: string,
  byteoffset: number,
  fromtitle: string,
  level: string,
  line: string,
  index: string,
  number: string,
  toclevel: number,
}

export interface StoreState {
  articleText: string | null,
  currentLetter: string,
  currentWord: string,
  showInfo: boolean,
  words: CategoryMemberObject[] | [];
}


import axios from 'axios';
import { defineStore } from 'pinia';

import wordsFilter from '@/utils/wordsFilter';
import domCleaner from '@/utils/domCleaner';
import {
  ParseParams,
  QueryParams,
  SectionObject,
  StoreState,
} from '@/types';

const queryParams: QueryParams = {
  action: 'query',
  cmlimit: 499,
  cmsort: 'sortkey',
  cmtitle: 'Category:Estonian_lemmas',
  format: 'json',
  list: 'categorymembers',
  origin: '*',
};

const parseParams: ParseParams = {
  action: 'parse',
  disabletoc: true,
  format: 'json',
  origin: '*',
};

export const mainStore = defineStore('main', {
  state: (): StoreState => {
    return {
      articleText: null,
      currentLetter: 'a',
      currentWord: '',
      words: [],
    };
  },
  actions: {
    getWords(letter: string): void {
      const params: QueryParams = {
        cmstartsortkeyprefix: letter,
        ...queryParams,
      };
      axios.get('', { params }).then((response) => {
        const { data } = response;
        this.words = wordsFilter(
          data.query.categorymembers,
          letter,
        );
      });
    },
    getArticle(
      section: string, page: string, pageid: string,
    ): void {
      const params: ParseParams = {
        section, 
        ...parseParams,
      };
      pageid ? params.pageid = pageid : params.page = page;
      axios.get('', { params }).then((response) => {
        const { data } = response;
        this.articleText = domCleaner(data.parse.text['*']);
      });
    },
    getSection(page: string, pageid: string): void {
      this.articleText = null;
      const params: ParseParams = {
        prop: 'sections',
        ...parseParams,
      };
      pageid ? params.pageid = pageid : params.page = page;
      axios.get('', { params }).then((response) => {
        const { data } = response;
        const estonianSection: SectionObject = data.parse.sections.find(
          (sec: SectionObject) => sec.anchor === 'Estonian',
        );
        this.getArticle(estonianSection.index, page, pageid);
      });
    },
  },
});

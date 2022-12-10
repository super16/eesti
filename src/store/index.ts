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
      currentPageId: null,
      currentWord: '',
      showInfo: false,
      words: [],
    };
  },
  actions: {
    async getWords(letter: string): Promise<void> {
      const params: QueryParams = {
        cmstartsortkeyprefix: letter,
        ...queryParams,
      };
      let response = await axios.get('', { params });
      let data = response.data;
      let categoryMembers = data.query.categorymembers;
      this.words = wordsFilter(categoryMembers, letter);
      let lastElement = categoryMembers[categoryMembers.length - 1];
      while (data && lastElement?.title.startsWith(letter)) {
        params.cmcontinue = data.continue.cmcontinue;
        response = await axios.get('', { params });
        data = response.data;
        categoryMembers = data.query.categorymembers;
        this.words = [
          ...this.words,
          ...wordsFilter(categoryMembers, letter),
        ];
        lastElement = categoryMembers[categoryMembers.length - 1];
      }
    },
    getArticle(
      section: string, page: string, pageid: number | null,
    ): void {
      const params: ParseParams = {
        section, 
        ...parseParams,
      };
      if (pageid) {
        params.pageid = pageid;
      } else {
        params.page = page;
      }
      axios.get('', { params }).then((response) => {
        const { data } = response;
        this.articleText = domCleaner(data.parse.text['*']);
      });
    },
    getSection(page: string, pageid: number | null): void {
      this.articleText = null;
      const params: ParseParams = {
        prop: 'sections',
        ...parseParams,
      };
      if (pageid) {
        params.pageid = pageid;
      } else {
        params.page = page;
      }
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

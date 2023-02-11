import axios from 'axios';
import { defineStore } from 'pinia';

import wordsFilter from '@/utils/wordsFilter';
import domCleaner from '@/utils/domCleaner';
import {
  CategoryMemberObject,
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
      definitionLoading: false,
      showInfo: false,
      words: [],
      wordsLoading: false,
    };
  },
  actions: {
    /**
     * Add words from request to menu of words array.
     * @param {Array} filteredWords Array of filtered words.
    */
    addWords(filteredWords: CategoryMemberObject[]): void {
      filteredWords.forEach((fWord: CategoryMemberObject) => {
        window.requestAnimationFrame(() => {
          this.words.push(fWord);
        });
      });
    },

    /**
     * Get list of words with given letter from API
     * and save to store.
     * @param {Array} letter The letter with which the words begin.
    */
    async getWords(letter: string): Promise<void> {
      this.wordsLoading = true;

      const params: QueryParams = {
        cmstartsortkeyprefix: letter,
        ...queryParams,
      };

      let response = await axios.get('', { params });
      let { data } = response;
      let categoryMembers = data.query.categorymembers;
      this.words = [];

      this.addWords(wordsFilter(categoryMembers, letter));
      let lastElement = categoryMembers[categoryMembers.length - 1];

      while (data && lastElement?.title.startsWith(letter)) {
        params.cmcontinue = data.continue.cmcontinue;

        response = await axios.get('', { params });

        data = response.data;
        categoryMembers = data.query.categorymembers;
        this.addWords(wordsFilter(categoryMembers, letter));
        lastElement = categoryMembers[categoryMembers.length - 1];
      }
      this.wordsLoading = false;
    },

    /**
     * Get article of given word and save to store.
     * @param {string} section Section index defining Estonian.
     * @param {string} page Page of article.
     * @param {string} pageid Page id of article.
    */
    async getArticle(
      section: string, page: string, pageid: number | null,
    ): Promise<void> {
      const params: ParseParams = {
        section, 
        ...parseParams,
      };

      if (pageid) {
        params.pageid = pageid;
      } else {
        params.page = page;
      }

      const response = await axios.get('', { params });
      const { data } = response;
      this.articleText = domCleaner(data.parse.text['*']);
      this.definitionLoading = false;
    },

    /**
     * Get sections of article to find Estonian part
     * and afterwards to get the content.
     * @param {string} page Page of article.
     * @param {string} pageid Page id of article.
    */
    async getSection(page: string, pageid: number | null): Promise<void> {
      this.definitionLoading = true;
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

      const response = await axios.get('', { params });
      const { data } = response;
      const estonianSection: SectionObject = data.parse.sections.find(
        (sec: SectionObject) => sec.anchor === 'Estonian',
      );
      this.getArticle(estonianSection.index, page, pageid);
    },
  },
});

import axios from 'axios';
import { setActivePinia, createPinia } from 'pinia';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  SpyInstance,
  vi,
} from 'vitest';

import wordsFilter from '@/utils/wordsFilter';
import { mainStore } from '@/store';

describe('mainStore', () => {
  setActivePinia(createPinia())
  const store = mainStore();

  const wordsResponse = {
    data: {
      query: {
        categorymembers: [
          { pageid: 106923, ns: 0, title: "a" },
          { pageid: 66, ns: 0, title: "A" },
          { pageid: 17051, ns: 0, title: "aa" },
          { pageid: 8670, ns: 0, title: "b" },
        ],
      },
    },
  }

  const articleResponse = {
    data: {
      parse: {
        title: 'a',
        pageid: 106923,
        revid: 71248708,
        text: {
          '*': `<div class=\"mw-parser-output\">\n<h2><span 
          class=\"mw-headline\" id=\"Estonian\">Estonian</span><span 
          class=\"mw-editsection\"><span class=\"mw-editsection-bracket\">
          [</span><a href=\"/w/index.php?title=a&amp;action=edit&amp;section=1\" 
          title=\"Edit section: Estonian\">edit</a><span class=\"mw-editsection-bracket\">]
          </span></span></h2>\n<h3><span class=\"mw-headline\" id=\"Pronunciation\">
          Pronunciation</span><span class=\"mw-editsection\"><span class=\"mw-editsection-bracket\">
          [</span><a href=\"/w/index.p…port (%,ms,calls,template)\n100.00% 111.888 1 
          -total\n 57.30% 64.110 1 Template:abbreviation_of\n 56.03% 62.696 1 
          Template:no_deprecated_lang_param_usage\n 14.45% 16.166 1 Template:IPA-lite\n 12.30% 13.763 3 
          Template:head-lite\n 10.86% 12.150 3 Template:head-lite/core\n 8.89% 9.951 8 
          Template:langname-lite\n 7.60% 8.502 1 Template:pedia\n 6.50% 7.269 1 
          Template:Latn-def-lite\n 4.99% 5.582 1 Template:Latn-def-lite/core\n-->\n</div>`
        }
      }
    }
  }

  const sectionsResponse = {
    data: {
      parse: {
        title: "a",
        pageid:	106923,
        sections: [
          {
            toclevel: 1,
            level: "2",
            anchor: "Egyptian",
            index: "228",
          },
          {
            toclevel: 1,
            level: "2",
            anchor: "Estonian",
            index: "242",
          },
          {
            toclevel: 1,
            level: "2",
            anchor: "Finnish",
            index: "259",
          },
        ]
      },
    },
  }

  let requestAnimationFrameSpy: SpyInstance<[callback: FrameRequestCallback], number>;

  beforeEach(() => {
    let time = 0;
    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback): number => {
        callback(time+=1000000);
        return 0;
      });
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  it('should have correct initial store values', () => {
    expect(store.articleText).toBe(null);
    expect(store.currentLetter).toBe('a');
    expect(store.currentPageId).toBe(null);
    expect(store.currentWord).toBe('');
    expect(store.definitionLoading).toBe(false);
    expect(store.showInfo).toBe(false);
    expect(store.words).toStrictEqual([]);
    expect(store.wordsLoading).toBe(false);
  });

  it('addWords action should adding words to store', () => {
    expect(store.addWords(wordsFilter(
      wordsResponse.data.query.categorymembers, 'a',
    )));
    expect(store.words.length).toBe(3);
  })

  it('getWords should get words from API response', async () => {
    const spy = vi.spyOn(axios, 'get').mockImplementation(async () => wordsResponse);
    await store.getWords('a');
    await expect(spy).toHaveBeenCalled();
    await expect(spy).toHaveReturnedWith(wordsResponse);
    await expect(store.words.length).toBe(3);
  });

  it('getSection should get Estonian section for article from API response', async () => {
    const spy = vi.spyOn(axios, 'get')
      .mockImplementationOnce(async () => sectionsResponse)
      .mockImplementationOnce(async () => articleResponse);
    await store.getSection('a', 106923);
    await expect(spy).toHaveBeenCalled();
    await expect(spy).toHaveReturnedWith(sectionsResponse);
    await expect(spy).toHaveReturnedWith(articleResponse);
  });

  it('getArticle should get article text from API response', async () => {
    const spy = vi.spyOn(axios, 'get').mockImplementation(async () => articleResponse);
    await store.getArticle("242", 'a', 106923);
    await expect(spy).toHaveBeenCalled();
    await expect(spy).toHaveReturnedWith(articleResponse);
  });
});

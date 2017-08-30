import { NgrxFromScratchPage } from './app.po';

describe('ngrx-from-scratch App', () => {
  let page: NgrxFromScratchPage;

  beforeEach(() => {
    page = new NgrxFromScratchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

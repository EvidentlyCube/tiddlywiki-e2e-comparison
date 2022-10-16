import { TiddlyUI } from "../helpers/TiddlyUI";

describe('General tests', () => {
  beforeEach(() => {
    TiddlyUI.init();
  })

  it('Can create a new tiddler, edit its contents and then delete it', () => {
    const TITLE = "Test title";
    const TAG1 = "Tag/Newsletter";
    const TAG2 = "Tag/Test";
    const TAG3 = "Tag/Edited";
    const TEXT_1 = "This is the test contents of the tiddler. Soup is {{!!soup}} and juice is {{!!juice}}.";
    const TEXT_2 = "More testing. Soup is {{!!soup}} and juice is {{!!juice}}. Hunger is {{!!hunger}}";
    const FIELD_1_NAME = "soup";
    const FIELD_1_VALUE_1 = "warm";
    const FIELD_1_VALUE_2 = "lukewarm";
    const FIELD_2_NAME = "juice";
    const FIELD_2_VALUE_1 = "orange";
    const FIELD_2_VALUE_2 = "no more";
    const FIELD_3_NAME = "hunger";
    const FIELD_3_VALUE = "rising";

    const tiddler = TiddlyUI.clickNewTiddler()
        .setTitle(TITLE)
        .addTag(TAG1)
        .addTag(TAG2)
        .setText(TEXT_1)
        .addField(FIELD_1_NAME,FIELD_1_VALUE_1)
        .addField(FIELD_2_NAME,FIELD_2_VALUE_1)
      .save()
        .shouldTitle('contain', TITLE)
        .shouldTags('contain', TAG1)
        .shouldTags('contain', TAG2)
        .shouldText('contain', TEXT_1.replace("{{!!soup}}", FIELD_1_VALUE_1).replace("{{!!juice}}", FIELD_2_VALUE_1))
      .clickEdit()
        .addTag(TAG3)
        .setText(TEXT_2)
        .setField(FIELD_1_NAME, FIELD_1_VALUE_2)
        .setField(FIELD_2_NAME, FIELD_2_VALUE_2)
        .addField(FIELD_3_NAME, FIELD_3_VALUE)
      .save()
        .shouldTags('contain', TAG1)
        .shouldTags('contain', TAG2)
        .shouldTags('contain', TAG3)
        .shouldText('contain', TEXT_2.replace("{{!!soup}}", FIELD_1_VALUE_2).replace("{{!!juice}}", FIELD_2_VALUE_2).replace("{{!!hunger}}", FIELD_3_VALUE));

    TiddlyUI.search(TITLE);
    TiddlyUI.withinSearchList(() => {
      cy.get('p').should('contain', TITLE);
    });

    tiddler.clickDelete();

    TiddlyUI.search(TITLE);
    TiddlyUI.withinSearchList(() => {
      cy.get('p').should('not.contain', TITLE);
    });
  });
})
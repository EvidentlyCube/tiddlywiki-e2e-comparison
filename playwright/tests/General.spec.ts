import { test, expect } from '@playwright/test';
import { Tiddly } from '../helpers/Tiddly';

test.describe('General tests', () => {

  test('Can create a new tiddler, edit its contents and then delete it', async ({page}) => {
    const tw = new Tiddly(page);
    await tw.init()

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

    let editor = await tw.newTiddlerButton.click()
    await editor.titleInput.type(TITLE);
    await editor.tagNameInput.type(TAG1);
    await editor.addTagButton.click();
    await editor.tagNameInput.type(TAG2);
    await editor.addTagButton.click();
    await editor.textInput.type(TEXT_1);
    await editor.newFieldNameInput.type(FIELD_1_NAME);
    await editor.newFieldValueInput.type(FIELD_1_VALUE_1);
    await editor.newFieldAddButton.click();
    await editor.newFieldNameInput.type(FIELD_2_NAME);
    await editor.newFieldValueInput.type(FIELD_2_VALUE_1);
    await editor.newFieldAddButton.click();

    let viewer = await editor.saveChangesButton.click();
    expect(await viewer.getTitle()).toEqual(TITLE);
    expect(await viewer.getTags()).toHaveLength(2);
    expect(await viewer.getTags()).toContain(TAG1);
    expect(await viewer.getTags()).toContain(TAG2);
    expect(await viewer.getText()).toEqual(TEXT_1.replace("{{!!soup}}", FIELD_1_VALUE_1).replace("{{!!juice}}", FIELD_2_VALUE_1));

    editor = await viewer.editButton.click();
    await editor.tagNameInput.type(TAG3);
    await editor.addTagButton.click();
    await editor.textInput.clearAndType(TEXT_2);
    await editor.getFieldValueInput(FIELD_1_NAME).clearAndType(FIELD_1_VALUE_2);
    await editor.getFieldValueInput(FIELD_2_NAME).clearAndType(FIELD_2_VALUE_2);
    await editor.newFieldNameInput.type(FIELD_3_NAME);
    await editor.newFieldValueInput.type(FIELD_3_VALUE);
    await editor.newFieldAddButton.click();

    viewer = await editor.saveChangesButton.click();
    expect(await viewer.getTitle()).toEqual(TITLE);
    expect(await viewer.getTags()).toHaveLength(3);
    expect(await viewer.getTags()).toContain(TAG1);
    expect(await viewer.getTags()).toContain(TAG2);
    expect(await viewer.getTags()).toContain(TAG3);
    expect(await viewer.getText()).toEqual(TEXT_2.replace("{{!!soup}}", FIELD_1_VALUE_2).replace("{{!!juice}}", FIELD_2_VALUE_2).replace("{{!!hunger}}", FIELD_3_VALUE));

    await viewer.expandButton.click();
    await viewer.deleteButton.click();

    await tw.search.input.type(TITLE);
    expect(await tw.search.getResultCount()).toEqual(0);
  });
})
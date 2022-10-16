import { expect, test } from '@playwright/test';
import { Tiddly } from '../../helpers/Tiddly';

import * as fs from 'fs';

test.describe('Widget/Select', () => {

  test('Select updates field when changing option', async ({page}) => {
    const tw = new Tiddly(page);
    await tw.init()

    const title = await tw.fixtures.loadTiddler('widgets/select/dynamic-class.tid');
    const viewer = await tw.openTiddler(title);

    const $field = viewer.locatorBody('.field-value');
    const $select = viewer.locatorBody('select');

    await expect($field).toBeEmpty();

    await $select.selectOption('cls-1');
    await expect($field).toHaveText('cls-1');

    await $select.selectOption('cls-2');
    await expect($field).toHaveText('cls-2');

    await $select.selectOption('');
    await expect($field).toBeEmpty();
  });


  test('Select with a dynamic class updates the class when needed', async ({page}) => {
    const tw = new Tiddly(page);
    await tw.init()

    const title = await tw.fixtures.loadTiddler('widgets/select/dynamic-class.tid');
    const viewer = await tw.openTiddler(title);
    const $select = viewer.locatorBody('select');

    await $select.selectOption("cls-1")
    await expect($select).toHaveClass('cls-1');
    await expect($select).not.toHaveClass('cls-2');

    await $select.selectOption("cls-2")
    await expect($select).not.toHaveClass('cls-1');
    await expect($select).toHaveClass('cls-2');

    await $select.selectOption('');
    await expect($select).not.toHaveClass('cls-1');
    await expect($select).not.toHaveClass('cls-2');
  });
})
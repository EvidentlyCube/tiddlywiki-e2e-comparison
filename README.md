# TiddlyWiki 5 end to end test suite comparison

This repo contains the same set of end to end tests written in two testing libraries: [Cypress](https://www.cypress.io/) and [Playwright](https://playwright.dev/) using similar paradigms.

# How to use:

This test suite requires an empty edition of TiddlyWiki 5 running. You can use https://tiddlywiki.com/empty.html but it's likely to fail some tests because it's not the most cutting edge version.

## Get TW Empty edition

1. Clone TW from Github or download the source code -- https://github.com/Jermolene/TiddlyWiki5
2. TW has no external dependencies.
3. In TW directory run `node tiddlywiki.js editions/empty --listen` start the empty edition, by default it'll be accessible on URL http://localhost:8080

## Run test suite

1. Clone the repository
2. Run `npm ci` to install dependencies
3. Copy `config/config.example.ts` and name the copy `config/config.ts`
4. Change the default configuration if needed
5. Run `npm run test`

# Differences

Cypress and Playwright are very different beasts. The former feels best suited for testing things where you have all data beforehand, the latter is much more flexible but creates a small `await` hell.

## Cypress:

 * Leans on a global `cy` object which requires less passing things around
 * Is very unfriendly for the Page Object pattern - you almost need to hack your way around how its written to achieve any semblance of the pattern. It's meant to use [App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)
 * Seems very opinionated
 * Its TypeScript declarations are difficult to replicate in your code

## Playwright

 * Feels very familiar if you have Selenium experience
 * Lends itself really well for Page Object pattern
 * Requires writing loads of `awaits` everywhere
 * Very flexible, allows you to create your own paradigm

## Which is better for Tiddlywiki?

 * Because of my Selenium experience I much more prefer Playwright. I don't like the idea of App Actions for a few reasons that are not important here, but to the extent you need to play with TiddlyWiki's internals you can do it just as well in Playwright.
    * Also Cypress's power in working with app internals only works for modern SPAs and feels completely useless for anything more traditional, like a PHP website where all the internals are stored on the server side.
 * I like the idea of Page Objects and writing tests from the perspective of how user interacts with the site, which can then be wrapped with operations to reduce the repetition
   * No operations are currently in the repo, but loads of `General.spec.ts` could be rewritten into a few simple operations - CreateTiddlerOperation, EditTiddlerOperation, DeleteTiddlerOperation.
 * I like writing in TypeScript and Playwright feels better in that regard.
# TiddlyWiki 5 end to end test suite

An unofficial end to end test suite for TiddlyWiki 5 written in Cypress.

# How to use:

This test suite requires an empty edition of TiddlyWiki 5 running. You can use https://tiddlywiki.com/empty.html but it's likely to fail some tests because it's not the most cutting edge version.

## Get TW Empty edition

1. Clone TW from Github or download the source code -- https://github.com/Jermolene/TiddlyWiki5
2. TW has no external dependencies.
3. In TW directory run `node tiddlywiki.js editions/empty --listen` start the empty edition, by default it'll be accessible on URL http://localhost:8080

## Run this test suite

1. Clone the repository
2. Run `npm ci` to install dependencies
3. Copy `config/config.example.ts` and name the copy `config/config.ts`
4. Change the default configuration if needed
5. Run `npm run test`
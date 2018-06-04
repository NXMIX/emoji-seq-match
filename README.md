# @nxmix/emoji-seq-match
[![Build Status](https://travis-ci.org/NXMIX/emoji-seq-match.svg?branch=master)](https://travis-ci.org/NXMIX/emoji-seq-match)
[![Coverage Status](https://coveralls.io/repos/github/NXMIX/emoji-seq-match/badge.svg)](https://coveralls.io/github/NXMIX/emoji-seq-match)
[![npm](https://img.shields.io/npm/v/@nxmix/emoji-seq-match.svg?maxAge=1000)](https://www.npmjs.com/package/@nxmix/emoji-seq-match/)

> Match Emoji combinations according to unicode emoji specification

## Why 

Different Emoji character combinations may visually produce different widths, for examples:

```
👶 + 🏼 => 👶🏼  // Base emoji with skin-tone modifier
👨 + 👩 + 👧 + 👦  => 👨‍👩‍👧‍👦  // Emoji characters joined with zero-witdh joiner (\u0200d)
```

[Emoji Sequences, v11.0](http://unicode.org/emoji/charts/emoji-sequences.html) defines these combinations.

The reason for creating this module is that I need to get the visual width of a string in terminal application to calculate the cursor's movement distance. To achieve this, I have to first create a method to find out if a string insludes a specification-defined Emoji combination.

Please noe that different terminal apps have different levels of implementation of the specification, including even the latest [macOS Terminal](https://en.wikipedia.org/wiki/Terminal_(macOS)).

## Usage

### Install

`npm i @nxmix/emoji-seq-match --save`

[Typescript](https://www.typescriptlang.org) definition file is already included.

### EXAMPLES

```js
const getMatchedLength = require('@nxmix/emoji-seq-match').default;

getMatchedLength('👶🏼');
//=> 2

getMatchedLength('🐶🏼'); // puppy does not have skin tone combination" 
//=> 0

getMatchedLength("👶🏽👩‍👩‍👦‍👦", 2); // from a 'start' postion to match
//=> 7, 'start' is counted by character not visual width

getMatchedLength(['👶', '🏼']); // also accepts an array of strings
// => 2
```

Using ES2015w Modules:

```ts
import getMatchedLength from '@nxmix/emoji-seq-match';

getMatchedLength('👶🏼');
//=> 2
```

## Tool

Running `npm run parse-spec` will download the specification files from 
http://unicode.org/Public/emoji/11.0/ and place the converted json files in the `./emoji-sequences` directory.

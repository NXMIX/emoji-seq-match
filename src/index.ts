import * as emojiSequences from "../emoji-sequences/emoji-sequences.json";
import * as emojiVariationSequences from "../emoji-sequences/emoji-variation-sequences.json";
import * as emojiZwjSequences from "../emoji-sequences/emoji-zwj-sequences.json";

// The max length of emoji sequences comes from `emoji-zwj-sequences.json`
// 1F468 200D 2764 FE0F 200D 1F48B 200D 1F468: 👨‍❤️‍💋‍👨
const MAX_LENGTH = 8;

const getMatchedLength = (str: string[] | string, start: number = 0) => {
  if (start < 0) {
    throw new Error("start must be greater than or equal to 0");
  }
  const arr = Array.isArray(str) ? str : [...str];
  const codes: string[] = [];

  if (start >= arr.length) {
    return 0;
  }
  const length = Math.min(MAX_LENGTH, arr.length - start);

  for (let i = start; i < start + length; i++) {
    codes.push(arr[i].codePointAt(0)!.toString(16));
  }

  for (let i = length; i > 1; i--) {
    const key = codes.slice(0, i).join(" ");
    if (emojiZwjSequences[key] || emojiVariationSequences[key] || emojiSequences[key]) {
      return i;
    }
  }
  return 0;
};

export default getMatchedLength;

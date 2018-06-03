interface EmojiSeq {
  [codes: string]: {
    content: string;
    type: string;
    name: string;
  };
}

declare module "*.json" {
  const value: EmojiSeq;
  export = value;
}

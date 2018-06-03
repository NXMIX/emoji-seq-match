import m from "../src";

/**
 * Match Emoji
 */
describe("Match string", () => {
  it("keycaps", () => {
    expect(m("#️⃣")).toBe(3);
  });

  it("flags", () => {
    expect(m("🇨🇳")).toBe(2);
  });

  it("with skin tone modifier", () => {
    // based on [Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale)
    expect(m("👶🏼")).toBe(2);
  });

  it("family: man (zwj) woman (zwj) girl (zwj) boy", () => {
    // zwj((\u200d)) means Zero Width Joiner
    expect(m("👨‍👩‍👧‍👦")).toBe(7);
  });

  it("family: man (zwj) woman (zwj) girl (zwj) boy", () => {
    // zwj((\u200d)) means Zero Width Joiner
    expect(m("👨‍👩‍👧‍👦", 2)).toBe(5);
  });

  it("puppy does not have skin tone problem", () => {
    expect(m("🐶🏼", 2)).toBe(0);
  });

  it("start from non-zero position", () => {
    // zwj((\u200d)) means Zero Width Joiner
    expect(m("👶🏽👩‍👩‍👦‍👦", 2)).toBe(7);
  });

  it("empty string", () => {
    expect(m("")).toBe(0);
  });

  it("start position is greater than or equal to the string length", () => {
    expect(m("", 1)).toBe(0);
  });

  it("start is less than 0", () => {
    expect(() => m("", -1)).toThrowError();
  });
});

describe("Match string array", () => {
  it("keycaps", () => {
    expect(m([..."#️⃣"])).toBe(3);
  });

  it("flags", () => {
    expect(m([..."🇨🇳"])).toBe(2);
  });

  it("with skin tone modifier", () => {
    // based on [Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale)
    expect(m([..."👶🏼"])).toBe(2);
  });

  it("family: man (zwj) woman (zwj) girl (zwj) boy", () => {
    // zwj((\u200d)) means Zero Width Joiner
    expect(m([..."👨‍👩‍👧‍👦"])).toBe(7);
  });

  it("puppy does not have skin tone problem", () => {
    expect(m([..."🐶🏼"])).toBe(0);
  });

  it("start from non-zero position", () => {
    // zwj((\u200d)) means Zero Width Joiner
    expect(m([..."👶🏽👩‍👩‍👦‍👦"], 2)).toBe(7);
  });

  it("empty string array", () => {
    expect(m([])).toBe(0);
  });
});

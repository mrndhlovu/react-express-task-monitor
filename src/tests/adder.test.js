import adder from "../client/js/adder";

describe("Adder", () => {
  test("adds two numbers", () => {
    expect(adder(5, 3)).toEqual(8);
  });
});

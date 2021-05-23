/**
 * @jest-environment jsdom
 */
import { pushToHistory } from "../scripts/router.js";

describe("test pushToHistory", () => {
  test("Settings Case", () => {
    history = pushToHistory("settings");
    expect(history.length).toBe(2);
    expect(history.state.page).toBe("settings");
  });

  test("entry", () => {
    history = pushToHistory("entry", 1);
    expect(history.length).toBe(3);
    expect(history.state.page).toBe("entry1");
  });

  test("default", () => {
    history = pushToHistory("", "");
    expect(history.length).toBe(4);
    expect(history.state.page).toBe(undefined);
  });
});

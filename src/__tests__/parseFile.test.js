import { cleanup } from "react-testing-library";
import { getFileContent } from "../modules/parseFile";

afterAll(cleanup);

describe("fetFileContent tests", () => {
  let file = new File(["test file"], test.txt);
  let expectedOutput = "test file";

  test("parses route correctly", () => {
    return getFileContent(file, (result) => {
      expect(result).toEqual(expectedOutput);
    });
  });
});
import { logger } from "../../src/log/logger";

describe("Logger module test suite", () => {
  test("call logger", () => {
    logger.info("mock test");
  });
});

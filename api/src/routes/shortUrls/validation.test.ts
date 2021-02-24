import { Request, Response, NextFunction } from "express";
import { validatePostParams } from "./validation";

const mockRequest = () => {
  const req = {} as Request;
  req.body = {};
  return req;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test("POST parameters: url is missing", () => {
  const req = mockRequest();
  testInvalidUrl(req);
});

test("POST parameters: url is empty string", () => {
  const req = mockRequest();
  req.body = { url: "" };
  testInvalidUrl(req);
});

function testInvalidUrl(req: Request) {
  const res = mockResponse();
  const next = jest.fn() as NextFunction;

  const returnedRes = validatePostParams(req, res, next);

  expect(returnedRes).not.toBeUndefined();
  expect(returnedRes!.status).toBeCalledWith(400);
  expect(res.json).toBeCalledWith({
    error: "Invalid or missing parameters: url",
  });
  expect(next).not.toHaveBeenCalled();
}

test("POST parameters: url is OK", () => {
  const req = mockRequest();
  req.body = { url: "https://asd.com" };
  const res = mockResponse();
  const next = jest.fn() as NextFunction;

  const returnedRes = validatePostParams(req, res, next);

  expect(returnedRes).toBeUndefined();
  expect(next).toHaveBeenCalled();
});

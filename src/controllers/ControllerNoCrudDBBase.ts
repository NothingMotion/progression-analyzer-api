import { Request, Response } from "express";

abstract class ControllerNoCrudDBBase<T> {
  constructor() {}

  async get(req: Request, res: Response): Promise<void> {}
  async post(req: Request, res: Response): Promise<void> {}
  async put(req: Request, res: Response): Promise<void> {}
  async delete(req: Request, res: Response): Promise<void> {}
}

export { ControllerNoCrudDBBase };

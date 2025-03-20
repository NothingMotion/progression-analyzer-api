import { Request, Response } from "express";
import { ICrudDB } from "../types/ICrudDB";
import Logger from "../lib/Logger";
abstract class ControllerBase<T> {
  constructor(protected crudDB: ICrudDB<T>) {}

  protected sendSuccessResponse(
    res: Response,
    data: T | T[] | undefined,
    statusCode: number = 200,
  ): void {
    Logger.log(
      `${new Date().toISOString()} - API Response:[${statusCode}] ${JSON.stringify(data)}`,
    );
    res.status(statusCode).json(data);
  }

  protected sendErrorResponse(
    res: Response,
    error: Error,
    statusCode: number = 500,
  ): void {
    Logger.error(
      `${new Date().toISOString()} - API Error:[${statusCode}] ${error.message}`,
    );
    res.status(statusCode).json({ message: error.message });
  }
  protected isMatch(data: any): data is T {
    return typeof data === "object" && data !== null && "id" in data;
  }
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      if (this.isMatch(data)) {
        const newData = await this.crudDB.create(data);
        this.sendSuccessResponse(res, newData, 201);
      } else {
        this.sendErrorResponse(res, new Error("Invalid data"), 400);
      }
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.crudDB.read({ id } as T);
      this.sendSuccessResponse(res, data);
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.crudDB.readAll();
      this.sendSuccessResponse(res, data as unknown as T[]);
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedData = await this.crudDB.update(id, data);
      this.sendSuccessResponse(res, updatedData);
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }

  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      if (this.isMatch(data)) {
        const updatedData = await this.crudDB.update(id, data);
        this.sendSuccessResponse(res, updatedData);
      } else {
        this.sendErrorResponse(res, new Error("Invalid data"), 400);
      }
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.crudDB.delete(id);
      this.sendSuccessResponse(res, undefined, 204);
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }
}

export { ControllerBase };

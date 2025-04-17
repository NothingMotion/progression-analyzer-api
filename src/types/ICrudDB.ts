import { FilterQuery, QueryOptions } from "mongoose";

interface ICrudDB<T> {
  create(data: T): Promise<T>;
  read(data: T): Promise<T>;
  readByQuery(query: FilterQuery<T>): Promise<T[]>;
  readAll(): Promise<T[]>;
  update<ID = string | number>(id: ID, data: T): Promise<T>;
  updateByQuery(query: FilterQuery<T>, data: T): Promise<T>;
  updateOneByQuery(
    query: FilterQuery<T>,
    data: T,
    options?: QueryOptions<T>,
  ): Promise<T>;
  delete<ID = string | number>(id: ID): Promise<T>;
  deleteByQuery(query: FilterQuery<T>): Promise<T>;
  deleteByOne(query: FilterQuery<T>): Promise<T>;
}

export { ICrudDB };

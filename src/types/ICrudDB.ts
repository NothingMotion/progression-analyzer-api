interface ICrudDB<T> {
  create(data: T): Promise<T>;
  read(data: T): Promise<T>;
  readByQuery(query: object): Promise<T[]>;
  readAll(): Promise<T[]>;
  update<ID = string | number>(id: ID, data: T): Promise<T>;
  delete<ID = string | number>(id: ID): Promise<T>;
  deleteByQuery(query: object): Promise<T>;
  deleteByOne(query: object): Promise<T>;
}

export { ICrudDB };

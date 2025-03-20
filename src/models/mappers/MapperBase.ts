abstract class MapperBase<T, R> {
  abstract map(data: T, ...args: any[]): R;
}

export { MapperBase };

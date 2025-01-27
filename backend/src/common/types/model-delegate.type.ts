export type ModelDelegate<T> = {
  findUnique: (args: { where: T }) => Promise<unknown>;
};

/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
interface IStringDictionary {
  [index: string]: string | number;
}
interface IPagination {
  page: number;
  limit: number;
  orderBy: string;
}

export { IStringDictionary, IPagination };

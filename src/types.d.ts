type ObjectKeys<Obj> = Obj extends object
  ? (keyof Obj)[]
  : Obj extends number
  ? []
  : Obj extends Array<any> | string
  ? string[]
  : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

type Unpacked<T> = T extends (infer U)[] ? U : T;

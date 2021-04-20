type ObjectKeys<Obj> = Obj extends object
  ? (keyof Obj)[]
  : Obj extends number
  ? []
  : Obj extends Array<any> | string
  ? string[]
  : never;

/** Object.keys now infers the union types from the object rather than `string[] */
interface ObjectConstructor {
  keys<ObjectType>(o: ObjectType): ObjectKeys<ObjectType>;
}

/** localstorage.getItem<Type>('') return the `Type` rather than string */
interface Storage {
  getItem<T extends string>(key: string): T | null;
}

/** Retrieves element type from an array */
type Unpacked<ArrayLike> = ArrayLike extends (infer RootType)[] ? RootType : ArrayLike;

/** Retrieves Root type from a promise or a function returning a promise */
type Unpromisify<PromiseLike> = PromiseLike extends Promise<infer RootType>
  ? RootType
  : PromiseLike;

/** Override to use the beautiful `class` instead of `className` when preact and @types/react are both in the soup */
declare namespace React {
  interface HTMLAttributes<T> {
    class?: string;
  }
}

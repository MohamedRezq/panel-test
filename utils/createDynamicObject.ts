export const createDynamicObject = (keys: any, values: any) => {
  const object: any = {};
  for (let i = 0; i < keys.length; i++) {
    object[keys[i]] = values[i];
  }
  return object;
};

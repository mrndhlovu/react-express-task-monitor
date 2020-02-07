export const filterObject = (data, allowed) => {
  const filtered = Object.keys(data)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
};

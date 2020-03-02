export const filterObject = (data, allowed) => {
  const filtered = Object.keys(data)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
};

export const getLocation = () => window.location;

export const checkDuplicate = (collection, item) => collection.includes(item);

export const resetForm = id => document.getElementById(id).reset();

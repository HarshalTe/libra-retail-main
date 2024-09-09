/* eslint-disable eqeqeq */
export const arrayFilterWithId = (array, id) => {
  return array.filter((item) => item.id == id);
};

export const arrayFilterByKey = (array, key, value) => {
  return array.filter((item) => item[key] == value);
};
export const arrayFilterNotByKey = (array, key, value) => {
  return array.filter((item) => item[key] !== value);
};

export const arrayTotalWithField = (array, field) => {
  return array.reduce((acc, item) => {
    return acc + Number(item[field]);
  }, 0);
};

export const exceptWithValue = (array, excluded, value) => {
  const output = [];
  for (let e of array) {
    if (!excluded.includes(e[value])) output.push(e);
  }
  return output;
};

export const except = (array, excluded) => {
  const output = [];
  for (let e of array) {
    if (!excluded.includes(e)) output.push(e);
  }
  return output;
};

export const includeWithValue = (array, excluded, value) => {
  const output = [];
  for (let e of array) {
    if (excluded.includes(e[value])) output.push(e);
  }
  return output;
};

export const includesArray = (array, excluded) => {
  const output = [];
  for (let e of array) {
    if (excluded.includes(e)) output.push(e);
  }
  return output;
};

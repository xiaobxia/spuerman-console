const arrayUtil = {
  findItem(array, keyName, keyValue) {
    return array.find((item) => {
      return item[keyName] === keyValue;
    });
  },
  removeItem(array, keyName, keyValue) {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (item[keyName] === keyValue) {
        array.splice(i, 1);
        break;
      }
    }
  }

};

export default arrayUtil;

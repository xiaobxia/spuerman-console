
const arrayUtil = {

  /**
   * 查找对象
   * @param array
   * @param keyName
   * @param keyValue
   * @returns {*}
   */
  findItem(array, keyName, keyValue) {
    return array.find((item) => {
      return item[keyName] === keyValue;
    });
  },
  /**
   * 移除元素
   * @param array
   * @param keyName
   * @param keyValue
   */
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

module.exports = arrayUtil;

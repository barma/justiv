'use strict';

import _indexOf from 'lodash/indexOf';

export default {
  pushOrRemoveItem
};

/**
 * @param {Array} source
 * @param {String} item
 * */
function pushOrRemoveItem(source, item) {
  let arrayCopy = source.slice(0);

  let index = _indexOf(arrayCopy, item);

  if(index === -1) {
    arrayCopy.push(item);
  } else {
    arrayCopy.splice(index, 1);
  }

  return arrayCopy;
}

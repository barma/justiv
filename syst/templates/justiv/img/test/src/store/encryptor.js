'use strict';

import createEncryptor from 'redux-persist-transform-encrypt';
import {secret} from '../constants';

export default createEncryptor({
  secretKey: secret
});

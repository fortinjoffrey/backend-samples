import {Validator} from 'express-json-validator-middleware';
import addFormats from 'ajv-formats';

const validator = new Validator({
  coerceTypes: true,
});

addFormats(validator.ajv);

export {validator};

import Ajv from "ajv";
import { get } from "lodash";
import { object } from "dot-object";

export const validator = (values, schema) => {
  let errors = {};
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(values);

  if (!valid) {
    validate.errors.forEach((error) => {
      const arr = error.schemaPath.slice(2).split("/");

      errors[error.dataPath.slice(1)] = get(
        schema,
        `${arr.slice(0, -1).join(".")}.message.${arr[arr.length - 1]}`,
        error.message
      );
    });

    return object(errors);
  }
};

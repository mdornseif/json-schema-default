![NPM License](https://img.shields.io/npm/l/json-schema-default)
[![NPM Version](https://img.shields.io/npm/v/json-schema-default)](https://www.npmjs.com/package/json-schema-default)
[![NPM Types](https://img.shields.ionpm/types/json-schema-default)](https://www.npmjs.com/package/json-schema-default)
[![Last Commit](https://img.shields.io/github/last-commit/mdornseif/json-schema-default)](https://github.com/mdornseif/json-schema-default)


# json-schema-default

Generate an Object based on default values inside a [JSON-Schema](https://json-schema.org).

This is ideal to get a template, e.g. with form placehholders based on a schema.

[json-schema-empty](https://www.npmjs.com/package/json-schema-empty) is different in that it closely observes the `required` properties and only adds them, inventing new values along the way should there be no default values.

json-schema-default on the other hand copies default values not caring if they are required or not.
The resulting object can be used stand alone or merged with existing data to make sure, all defaults are filled:

```js
import { jsonDefault } from 'json-schema-default';
import merge from 'lodash.merge';

const finalData = merge({}, jsonDefault(schema), inputData);
```

If you want to ensure that string properties without a default get represented eith `""` instead of `null` use [json-schema-empty-strings](https://www.npmjs.com/package/json-schema-empty-strings/):

```js
import { jsonEmptyStrings } from 'json-schema-empty-strings';
import { jsonDefault } from 'json-schema-default';
import merge from 'lodash.merge';

const finalData = merge(
  {},
  jsonEmptyStrings(schema),
  jsonDefault(schema),
  inputData
);
```

# See also

- [json-schema-empty-strings](https://github.com/romeovs/json-schema-empty-strings)
- [empty-schema](https://github.com/slurmulon/empty-schema)
- [json-schema-empty](https://github.com/romeovs/json-schema-empty)
- [json-schema-empty-strings](https://www.npmjs.com/package/json-schema-empty-strings/)
- [json-schema-default](https://www.npmjs.com/package/json-schema-default)
- [json-schema-fill-defaults](https://www.npmjs.com/package/json-schema-fill-defaults)
- [json-from-default-schema](https://www.npmjs.com/package/json-from-default-schema)
- [@nodecg/json-schema-defaults](https://www.npmjs.com/package/@nodecg/json-schema-defaults)
- [json-schema-default-instance](https://www.npmjs.com/package/json-schema-default-instance)
- [minimal-schema](https://github.com/tyv/minimal-schema)
- [AJV](https://ajv.js.org/guide/modifying-data.html#assigning-defaults)

// Created in 2021-09-25 by Maximillian Dornseif
// Copyright Dr. Maximillian Dornseif 2021

import { JSONSchema7 } from 'json-schema';
import traverse from 'json-schema-traverse';

/** Returns an Object containing all defaults from a schema
 * */
export function jsonDefault(schema: JSONSchema7): unknown {
  const ret = {};
  traverse(
    schema,
    {},
    (
      sch,
      jsonPtr,
      _root,
      parentJsonPtr,
      _parentKeyword,
      _parentSchema,
      indexProperty
    ) => {
      if (jsonPtr.startsWith('/properties/')) {
        let destination = ret;
        if (parentJsonPtr) {
          // um Nesting korrekt abzubilden müssten wir jsonPtr auseindander pflücken
          for (const subSch of parentJsonPtr
            .replace(/\/properties/g, '')
            .split('/')) {
            if (subSch === '') {
              continue;
            }
            destination[subSch] = destination?.[subSch] || {};
            destination = destination[subSch];
          }
        }
        if (sch.default !== undefined) {
          if (indexProperty !== undefined) {
            destination[indexProperty] = sch.default;
          }
        }
      }
    }
  );
  return ret;
}

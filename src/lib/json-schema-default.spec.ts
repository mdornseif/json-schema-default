/*
 * json-schema-default.test.ts
 *
 * Created by Dr. Maximillian Dornseif 2021-10-24 in huWaWi3 22.0.0
 * Copyright (c) 2021, 2024 Dr. Maximillian Dornseif
 */

import {test, expect} from 'vitest';
import { JSONSchema7 } from 'json-schema';

import { jsonDefault } from './json-schema-default';

const myschema7: JSONSchema7 = {
  $id: 'https://example.com/schemata/H3Test7',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Testdaten',
  type: 'object',
  required: ['s1'],
  properties: {
    s1: {
      title: 's1',
      type: 'string',
      default: 'foo',
    },
    s2: {
      title: 's2',
      type: 'string',
      default: '',
    },
    s3: {
      title: 's3',
      type: 'string',
    },
    sub: {
      type: 'object',
      required: ['s1'],
      properties: {
        s1: {
          title: 's1',
          type: 'string',
          default: 'bar',
        },
      },
    },
  },
};
test('handles num', () => {
  const def = jsonDefault(myschema7)
  expect(def).toMatchInlineSnapshot(`
    {
      "s1": "foo",
      "s2": "",
      "sub": {
        "s1": "bar",
      },
    }
  `)
});


const myschema2019_minimal =  {
  "$id":"https://www.hudora.de/schemata/foo.schema.json",
  "$schema":"https://json-schema.org/draft/2019-09/schema",
  "type":"object",
  "title":"EDI-Beleg-Transport-Konfiguration",
  "required":["proBeleg"],
  "additionalProperties":false,
  "properties":{
    "proBeleg":{
      "type":"array",
      "items":{
        "type":"object",
        "required":["name","filter"],
        "additionalProperties":false,
        "properties":{
          "name":{
            type: 'string',
            default: 'foo',
          },
          "filter":{
            "type":"object",
            "additionalProperties":false,
            "properties":{
              "kunden":{
                "type":"array",
                "items":{
                  "title":"Kunden№",
                  "type":"string"}
                },
                "belegarten":{
                  "type":"array",
                  "items":{
                    "title":"Belegart",
                    "type":"string"
                  }
                },
                "paths":{
                  "type":"array",
                  "items":{
                    "type":"string",
                    "examples":[
                      "$.leistungen.positionen[*].logistik.[?(@.volumen > 10)]",
                      "$.leistungen.positionen[*].logistik.[?(@.sperrgut == true)]",
                      "$[?(@.kundennr in ['SC12345', 'SC67890'])]",
                      "$[?(@.leistungen.positionen.length > 190)]"
                    ]
                  }
                }
              }
            },
          }}}}}

            
test('handles minimal schema 2019', () => {
  const def = jsonDefault(myschema2019_minimal)
  expect(def).toMatchInlineSnapshot(`
    {
      "proBeleg": {
        "items": {
          "filter": {
            "belegarten": {},
            "kunden": {},
            "paths": {},
          },
          "name": "foo",
        },
      },
    }
  `)})

const myschema2019_complex =  {
"$id":"https://www.hudora.de/schemata/foo.schema.json",
"$schema":"https://json-schema.org/draft/2019-09/schema",
"type":"object",
"title":"EDI-Beleg-Transport-Konfiguration",
"required":["proBeleg"],
"additionalProperties":false,
"properties":{
  "proBeleg":{
    "type":"array",
    "items":{
      "type":"object",
      "required":["name","filter"],
      "additionalProperties":false,
      "properties":{
        "name":{
          "examples":["SW6ORDRSP"],
          "type":"string"
        },
          "filter":{
            "type":"object",
            "additionalProperties":false,
            "properties":{
              "kunden":{
                "type":"array",
                "items":{
                  "title":"Kunden№",
                  "type":"string"}
                },
                "belegarten":{
                  "type":"array",
                  "items":{
                    "title":"Belegart",
                    "type":"string"
                  }
                },
                "paths":{
                  "type":"array",
                  "items":{
                    "type":"string",
                    "examples":[
                      "$.leistungen.positionen[*].logistik.[?(@.volumen > 10)]",
                      "$.leistungen.positionen[*].logistik.[?(@.sperrgut == true)]",
                      "$[?(@.kundennr in ['SC12345', 'SC67890'])]",
                      "$[?(@.leistungen.positionen.length > 190)]"
                    ]
                  }
                }
              }
            },
            "http":{
              "type":"object",
              "required":["url"],
              "additionalProperties":false,
              "properties":{
                "url":{
                  "type":"string",
                  "format":"uri"
                },
                "method":{
                  "type":"string",
                  "enum":[
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "PATCH"
                  ]
                },
                "headers":{
                  "type":"object",
                  "properties":{
                    "sw-access-key":{
                      "type":"string"
                    }
                  }
                },
                "ignoreErrors":{
                  "type":"boolean",
                  "default":false,
                }
              }
            },
            "csv":{
              "title":"CSV",
              "type":"object",
              "required":["iterateOn","fields"],
              "additionalProperties":false,
              "properties":{
                "iterateOn":{
                  "type":"string",
                  "examples":["$.leistungen.positionen"]},
                  "fields":{
                    "type":"array",
                    "items":{
                      "oneOf":[
                        {
                          "type":"string",
                        },{
                          "type":"object",
                          "properties":{
                            "pointer":{
                              "type":"string",
                            },
                            "static":{
                              "type":"string",
                            },
                            "timestamp":{
                              "type":"string",
                              "examples":[
                                "yyyy-LL-dd",
                                "yyyyLLddHHmmss"
                              ]
                            },
                            "output":{
                              "type":"string",
                            }
                          }
                        }
                      ]
                    }
                  },
                  "delimiter":{
                    "type":"string",
                    "default":","
                  },
                  "newline":{
                    "type":"string",
                    "default":"\\r\\n",
                  },
                  "quoteChar":{
                    "type":"string",
                    "default":"\"",
                  },
                  "escapeChar":{
                    "type":"string",
                    "default":"\"",
                  },
                  "header":{
                    "type":"boolean",
                    "default":true,
                  },
                  "escapeFormulae":{
                    "type":"boolean",
                    "default":true,
                  },
                  "quotes":{
                    "type":"boolean",
                    "default":true,
                  },
                  "output":{
                    "type":"object",
                    "additionalProperties":false,
                    "properties":{
                      "encoding":{
                        "type":"string",
                        "default":"utf8"
                      },
                      "console":{
                        "type":"boolean",
                        "default":false
                      },
                      "file":{
                        "type":"string",
                        "examples":[
                          "${belegart}-${designator}.csv"
                        ],
                      },
                      "gcs":{
                        "type":"object",
                        "properties":{
                          "bucket":{
                            "type":"string",
                            "default":"hudora-tmp-${belegart}"},
                            "name":{
                              "type":"string",
                              "examples":[
                                "/test/*/${designator}.csv"
                              ],
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    

test('handles complex schema 2019', () => {
  const def = jsonDefault(myschema2019_complex)
  expect(def).toMatchInlineSnapshot(`
    {
      "proBeleg": {
        "items": {
          "csv": {
            "delimiter": ",",
            "escapeChar": """,
            "escapeFormulae": true,
            "fields": {
              "items": {
                "oneOf": {
                  "1": {},
                },
              },
            },
            "header": true,
            "newline": "\\r\\n",
            "output": {
              "console": false,
              "encoding": "utf8",
              "gcs": {
                "bucket": "hudora-tmp-\${belegart}",
              },
            },
            "quoteChar": """,
            "quotes": true,
          },
          "filter": {
            "belegarten": {},
            "kunden": {},
            "paths": {},
          },
          "http": {
            "headers": {},
            "ignoreErrors": false,
          },
        },
      },
    }
  `)
});

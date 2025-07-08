import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

// Allowed status values

const coordinatesSearchParams = {
  page: parseAsInteger.withDefault(0),
  search: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
  category: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(["approved","rejected","pending_approval",""])
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

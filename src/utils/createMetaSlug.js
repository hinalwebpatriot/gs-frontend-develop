const createMetaSlug = (base, params) =>
  `${base.toLowerCase()}${params ? "-" + params.toLowerCase() : ""}`;

export default createMetaSlug;

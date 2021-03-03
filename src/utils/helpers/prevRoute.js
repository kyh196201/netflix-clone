import * as storage from "@/utils/helpers/storage.js";

/**
 *
 * @param {object} route : vue route object
 */
function setPrevRoute(route) {
  const { query, path, params } = route;

  const prevRoute = {
    path: path,
    query: query,
    params: params,
  };

  storage.setItem("prevRoute", prevRoute);
}

function getPrevRoute() {
  const route = storage.getItem("prevRoute");
  return route ? JSON.parse(route) : null;
}

export { setPrevRoute, getPrevRoute };

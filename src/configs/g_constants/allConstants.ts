export enum AbilityNames {
  ACL_PAGE = "acl-page",
  ROLE_PAGE = "role-page",
  ROLEOPTION_PAGE = "roleoption-page",

}

export enum ApiStatus {
  STATUS_100 = 100, // informational
  STATUS_200 = 200, // successful response
  STATUS_400 = 400, // bad request client error
  STATUS_401 = 401, // unauthenticated
  STATUS_402 = 402, // Store In-Action
  STATUS_404 = 404, // not found
  STATUS_406 = 406, // not found
  STATUS_409 = 409, // conflict
  STATUS_500 = 500, // server error responses
  STATUS_403 = 403, // Forbidden accesstoken expire
}

export const MONTHS: string[] = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

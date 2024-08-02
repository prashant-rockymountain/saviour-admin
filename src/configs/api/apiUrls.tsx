const baseurl =
  process.env.NODE_ENV !== "development"
    ? "http://localhost:13006/api/"
    : "https://saviour-backend.loopretail.tngwebsolutions.com/api/";

export const ApiUrl = {
  BASE_URL: baseurl,
  IMAGE_BASE_URL: "https://storage.googleapis.com/saviour-visa/",
  DELETE_GOOGLE_IMAGE_URL:"/upload/delete?url=",
  UPLOAD_IMAGE_URL:"upload/files",
  LOGIN_URL: "super-admin/login",
  ADD_COUNTRY_URL: "country/add",
  GET_COUNTRY_LIST_URL: "country/get-all",
  ADD_ROLE_OPTION_URL: "role-options/add",
  EDIT_ROLE_OPTION_URL: "role-options/edit/",
  ROLE_OPTION_URL: "role-options/get",
  UPDATE_COUNTRY_URL: "country/edit/",
  ADD_CITIES_URL: "city/add",
  ADD_COURSES_URL: "courses/add",
  EDIT_COURSES_URL: "courses/edit/",
  UPDATE_CITIES_URL: "city/edit/",
  GET_CITIES_LIST_URL: "city/get",
  GET_COURSES_LIST: "courses/get",
  GET_GRADUATION_LIST: "graduation/get-all",
  GET_ROLE_OPTION_URL: "role-options/get",
  ADD_ROLE_URL: "role/add",
  ADD_GRADUATION_URL: "graduation/add",
  EDIT_GRADUATION_URL: "graduation/edit/",
  EDIT_ROLE_URL: "role/edit/",
  GET_ROLE_URL: "role/get",
  ADD_ADMIN_URL: "admin/add-agency",
  UPDATE_ADMIN_URL: "admin/edit-agency/",
  GET_ADMIN_LIST_URL: "admin/get-all-agency",
  CHECK_VALID_TOKEN: "super-admin/check-token-validity",
  GET_CAMPUS_LIST_URL: "campus/get",
  EDIT_CAMPUS_URL: "campus/edit/",
  ADD_CAMPUS_URL: "campus/add",
  GET_UNIVERSITY_LIST_URL: "university/get-all-university",
  GET_UNIVERSITY_URL: "university/get-university/:",
  ADD_UNIVERSITY_URL: "university/add",
  EDIT_UNIVERSITY_URL: "university/edit/",
  ADD_STAFF_MEMBER_URL: "staff-members/add",
  EDIT_STAFF_MEMBER_URL: "staff-members/edit-staff-member/",
  GET_STAFF_MEMBER_URL: "staff-members/get-all-members",
};
export const graphqlQuerys = {
  ADMIN_GET_QUERY: `query{ping}`,
};

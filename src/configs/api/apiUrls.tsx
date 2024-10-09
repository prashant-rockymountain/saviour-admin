const baseurl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:13006/api/"
    : "https://saviour-backend.loopretail.tngwebsolutions.com/api/";

export const ApiUrl = {
  EL_BASE_URL:
    "https://f70d21ec3dcb476bbd8a178309209d8e.us-central1.gcp.cloud.es.io:443/universities/_search",
  BASE_URL: baseurl,
  IMAGE_BASE_URL: "https://storage.googleapis.com/saviour-visa/",
  DELETE_GOOGLE_IMAGE_URL: "/upload/delete?url=",
  UPLOAD_IMAGE_URL: "upload/files",
  LOGIN_URL: "admin/login",
  ADD_COUNTRY_URL: "country/add",
  GET_COUNTRY_LIST_URL: "country/get-all",
  ADD_ROLE_OPTION_URL: "agency-role-options/add",
  EDIT_ROLE_OPTION_URL: "agency-role-options/edit/",
  ROLE_OPTION_URL: "role-options/get",
  UPDATE_COUNTRY_URL: "country/edit/",
  ADD_CITIES_URL: "city/add",
  ADD_COURSES_URL: "courses/add",
  EDIT_COURSES_URL: "courses/edit/",
  UPDATE_CITIES_URL: "city/edit/",
  GET_CITIES_LIST_URL: "city/get",
  GET_COURSES_LIST: "courses/get",
  GET_GRADUATION_LIST: "graduation/get-all",
  GET_ROLE_OPTION_URL: "agency-role-options/get",
  ADD_ROLE_URL: "agency-role/add",
  ADD_GRADUATION_URL: "graduation/add",
  EDIT_GRADUATION_URL: "graduation/edit/",
  EDIT_ROLE_URL: "agency-role/edit/",
  GET_ROLE_URL: "agency-role/get-all",
  ADD_ADMIN_URL: "admin/add-agency",
  UPDATE_ADMIN_URL: "admin/edit-agency/",
  GET_ADMIN_LIST_URL: "admin/get-all-agency",
  CHECK_VALID_TOKEN: "super-admin/check-token-validity",
  GET_CAMPUS_LIST_URL: "campus/get",
  EDIT_CAMPUS_URL: "campus/edit/",
  ADD_CAMPUS_URL: "campus/add",
  GET_UNIVERSITY_LIST_URL: "admin/university/all",
  GET_UNIVERSITY_URL: "university/get-university/:",
  ADD_UNIVERSITY_URL: "university/add",
  EDIT_UNIVERSITY_URL: "university/edit/",
  ADD_STAFF_MEMBER_URL: "admin/staff/add",
  EDIT_STAFF_MEMBER_URL: "admin/staff/edit/",
  GET_STAFF_MEMBER_URL: "admin/staff/get",
  GET_FILTERED_LOCATION: "admin/location/all",
  ADD_STUDENT_URL: "admin/student/add",
  EDIT_STUDENT_URL: "admin/student/edit/",
  GET_ALL_STUDENT_URL: "admin/student/all",
  GET_ALL_STREAMS_URL: "admin/graduation/stream/all",
  GET_ALL_APPLICATION_URL: "admin/student/applications/all",
  GRADUATION_LIST_URL: "admin/graduation/list",
  CAPMUS_NAME_URL: "admin/campus-name/all",
  CAMPUS_FILTER_LIST: "admin/campus-name/list",
  ELASTIC_TEST: "university/get-test",
  ADD_APPLICATION_URL: "admin/student/applications/add",
  GET_COUNTRY_URL: "admin/location/countries",
  GET_STUDY_AREA:"graduation/study-area/get?is_active=true",
  GET_STATE_URL: "admin/location/states",
  GET_CITIES_URL: "admin/location/cities",
  GET_INQUERY_PROFILE_URL: "admin/student/applications/profile/",
  GET_FILTERED_COURSES:"admin/university/list-all-courses",
  ADMIN_UNIVERSITY_PROFILE_URL: "admin/university/university-profile/",
  ADMIN_UNIVERSITY_COURSE_URL: "admin/university/detail",
  APPLICATION_PROFILE_URL:
    "/admin/student/applications/application-profile/",
};
export const graphqlQuerys = {
  ADMIN_GET_QUERY: `query{ping}`,
};

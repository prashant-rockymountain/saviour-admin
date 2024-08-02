// ** Type import
import { AbilityNames } from "src/configs/g_constants/allConstants";
import { HorizontalNavItemsType } from "../../g_types/types";

const navigation = (): HorizontalNavItemsType => {
  const shortcontent = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "tabler:layout-dashboard",
      subject: AbilityNames.DASHBOARD_PAGE,
    },

    {
      path: "/admin",
      action: "read",
      subject: AbilityNames.ADMIN_PAGE,
      title: "Admin (Agency)",
      icon: "tabler:user",
    },

    {
      action: "read",
      subject: AbilityNames.ROLE_PAGE,
      title: "Role",
      icon: "tabler:users-plus",
      children: [
        {
          path: "/role",
          action: "read",
          subject: AbilityNames.ROLE_PAGE,
          title: "Role",
        },
        {
          path: "/tile-options",
          action: "read",
          subject: AbilityNames.ROLEOPTION_PAGE,
          title: "Role Options",
        },
      ],
    },
    {
      path: "/campusName",
      action: "read",
      subject: AbilityNames.CAMPUS_PAGE,
      title: "Campus Name",
      icon: "tabler:buildings",
    },
    {
      action: "read",
      subject: AbilityNames.LOCATION_PAGE,
      title: "Locations",
      icon: "tabler:map-2",
      children: [
        {
          path: "/country",
          action: "read",
          subject: AbilityNames.COUNTRY_PAGE,
          title: "Add Country/States",
        },
        {
          path: "/cities",
          action: "read",
          subject: AbilityNames.STATES_PAGE,
          title: "Add Cities",
        },
      ],
    },
    {
      path: "/university",
      action: "read",
      subject: AbilityNames.UNIVERSITY_PAGE,
      title: "University",
      icon: "tabler:building-community",
    },

    {
      path: "/staff-member",
      action: "read",
      subject: AbilityNames.STAFF_MEMBER,
      title: "Staff Member",
      icon: "tabler:checkup-list",
    },
    {
      path: "/courses",
      action: "read",
      subject: AbilityNames.COURSES_PAGE,
      title: "Courses",
      icon: "tabler:certificate",
    },
    {
      path: "/graduation",
      action: "read",
      subject: AbilityNames.GRADUATION_PAGE,
      title: "Graduation",
      icon: "tabler:school",
    },
    {
      path: "/all-applications",
      action: "read",
      subject: AbilityNames.ALLAPPLICATIONS_PAGE,
      title: "All Applications",
      icon: "tabler:checklist",
    },
  ];

  return shortcontent;
};

export default navigation;

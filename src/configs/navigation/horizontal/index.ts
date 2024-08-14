// ** Type import
import { AbilityNames } from "src/configs/g_constants/allConstants";
import { HorizontalNavItemsType } from "../../g_types/types";

const navigation = (): HorizontalNavItemsType => {
  const shortcontent = [
    {
      title: 'Dashboard',
      path: '/home',
      icon: 'tabler:smart-home',
    },

    {
      title: 'Course Finder',
      path: '/course-finder',
      action: 'read',
      subject: 'course finder',
      icon: 'tabler:shield',
    },
    {
      title: 'All Institutes',
      action: 'read',
      subject: 'all institutes',
      path: '/all-institutes',                      
      icon: 'tabler:share',
    },


    {
      title: 'All Application',
      action: 'read',
      subject: 'all application',
      path: '/all-application',
      icon: 'tabler:certificate',
    },
    {
      path: "/staff-member",
      action: "read",
      subject: 'staff member',
      title: "Staff Member",
      icon: "tabler:checkup-list",
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
  ]

  
  return shortcontent;
};

export default navigation;

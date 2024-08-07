import { AbilityNames } from "src/configs/g_constants/allConstants";
import { VerticalNavItemsType } from "../../g_types/types";


const navigation = (): VerticalNavItemsType => {

  const shortcontent = [
    {
      title: 'Dashboard',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Partnered Institute',
      path: '/partnered-institute',
      icon: 'tabler:mail',
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
      title: 'Profile Assesment',
      action: 'read',
      subject: 'profile assesment',
      path: '/profile-assesment',
      icon: 'tabler:user-circle',
    },
    {
      title: 'All Inquiries',
      action: 'read',
      subject: 'all inquiries',
      path: '/all-inquiries',
      icon: 'tabler:mood-look-up',
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

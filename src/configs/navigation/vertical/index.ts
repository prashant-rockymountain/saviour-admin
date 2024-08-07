import { AbilityNames } from "src/configs/g_constants/allConstants";
import { VerticalNavItemsType } from "../../g_types/types";


const navigation = (): VerticalNavItemsType => {

  const shortcontent = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Partnered Institute',
      path: '/partnered_institute',
      icon: 'tabler:mail',
    },
    {
      title: 'Course Finder',
      path: '/course_finder',
      action: 'read',
      subject: 'course finder',
      icon: 'tabler:shield',
    },
    {
      title: 'All Institutes',
      action: 'read',
      subject: 'all institutes',
      path: '/all_institutes',                      
      icon: 'tabler:share',
    },
    {
      title: 'Profile Assesment',
      action: 'read',
      subject: 'profile assesment',
      path: '/profile_assesment',
      icon: 'tabler:user-circle',
    },
    {
      title: 'All Inquiries',
      action: 'read',
      subject: 'all inquiries',
      path: '/all_inquiries',
      icon: 'tabler:mood-look-up',
    },
    {
      title: 'All Application',
      action: 'read',
      subject: 'all application',
      path: '/all_application',
      icon: 'tabler:certificate',
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

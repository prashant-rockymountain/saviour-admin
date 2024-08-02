import { Theme, SxProps, PaletteMode } from "@mui/material";
import { AppBarProps } from "@mui/material/AppBar";
import { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";
import type { FC, ReactElement, ReactNode } from "react";
import type {
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";
import { Direction } from "@mui/material";

//============================== theme setting types ===================================//

export type Settings = {
  skin: Skin;
  mode: Mode;
  appBar?: AppBar;
  footer?: Footer;
  navHidden?: boolean; // navigation menu
  appBarBlur: boolean;
  direction: Direction;
  navCollapsed: boolean;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  layout?: "vertical" | "horizontal";
  lastLayout?: "vertical" | "horizontal";
  verticalNavToggleType: VerticalNavToggle;
  toastPosition?:
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
};

export type PageSpecificSettings = {
  skin?: Skin;
  mode?: Mode;
  appBar?: AppBar;
  footer?: Footer;
  navHidden?: boolean; // navigation menu
  appBarBlur?: boolean;
  direction?: Direction;
  navCollapsed?: boolean;
  themeColor?: ThemeColor;
  contentWidth?: ContentWidth;
  layout?: "vertical" | "horizontal";
  lastLayout?: "vertical" | "horizontal";
  verticalNavToggleType?: VerticalNavToggle;
  toastPosition?:
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
};
export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

export interface SettingsProviderProps {
  children: ReactNode;
  pageSettings?: PageSpecificSettings | void;
}

// ===============================next APP props types ========================//

export interface AclGuardProps {
  children: ReactNode;
  aclAbilities: ACLObj;
}

export type Actions = "manage" | "create" | "read" | "update" | "delete";

export interface ACLObj {
  action: Actions;
  subject: string;
}

export type NextPage<P = {}, IP = P> = NextComponentType<
  NextPageContext,
  IP,
  P
> & {
  acl?: ACLObj;
  setConfig?: () => void;
  contentHeightFixed?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

//=================================== layout types ===========================//

export type Layout = "vertical" | "horizontal" | "blank" | "blankWithAppBar";

export type Skin = "default" | "bordered";

export type Mode = PaletteMode | "semi-dark";

export type ContentWidth = "full" | "boxed";

export type AppBar = "fixed" | "static" | "hidden";

export type Footer = "fixed" | "static" | "hidden";

export type ThemeColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

export type VerticalNavToggle = "accordion" | "collapse";

export type HorizontalMenuToggle = "hover" | "click";

export type BlankLayoutProps = {
  children: ReactNode;
};

export type BlankLayoutWithAppBarProps = {
  children: ReactNode;
};

export type NavSectionTitle = {
  action?: string;
  subject?: string;
  sectionTitle: string;
};

export type NavGroup = {
  icon?: string;
  title: string;
  action?: string;
  subject?: string;
  badgeContent?: string;
  children?: (NavGroup | NavLink)[];
  badgeColor?:
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";
};

export type NavLink = {
  icon?: string;
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
  badgeColor?:
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";
};

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];
export type HorizontalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];

export type FooterProps = {
  sx?: SxProps<Theme>;
  content?: (props?: any) => ReactNode;
};

export type VerticalLayoutProps = {
  appBar?: {
    componentProps?: AppBarProps;
    content?: (props?: any) => ReactNode;
  };
  navMenu: {
    lockedIcon?: ReactNode;
    unlockedIcon?: ReactNode;
    navItems?: VerticalNavItemsType;
    content?: (props?: any) => ReactNode;
    branding?: (props?: any) => ReactNode;
    afterContent?: (props?: any) => ReactNode;
    beforeContent?: (props?: any) => ReactNode;
    componentProps?: Omit<SwipeableDrawerProps, "open" | "onOpen" | "onClose">;
  };
};

export type HorizontalLayoutProps = {
  appBar?: {
    componentProps?: AppBarProps;
    content?: (props?: any) => ReactNode;
    branding?: (props?: any) => ReactNode;
  };
  navMenu?: {
    sx?: SxProps<Theme>;
    navItems?: HorizontalNavItemsType;
    content?: (props?: any) => ReactNode;
  };
};

export type LayoutProps = {
  hidden: boolean;
  settings: Settings;
  children: ReactNode;
  footerProps?: FooterProps;
  contentHeightFixed?: boolean;
  scrollToTop?: (props?: any) => ReactNode;
  saveSettings: (values: Settings) => void;
  verticalLayoutProps: VerticalLayoutProps;
  horizontalLayoutProps?: HorizontalLayoutProps;
};

//===================== BreadCrumb types ======================= =//

export interface Links {
  title: string;
  path?: string;
}

// ==================== Authcontext types =========================== //

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  username: string;
  password: string;
};

export type UserDataType = {
  id: string;
  role: Record<string, any>;
  email: string;
  name: string;
  phone: string;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
  btnLoader: boolean;
};

//============================== table component types=============================//

interface extendstableTypes {
  clickbutton?: (data: string) => void;
  isLoading: boolean;
}

export interface tableTypes extends extendstableTypes {
  row: FC<rowType>;
  data: Record<string, any>[];
  headData: tableHeadings[];
  open?: any;
}

export interface rowType extends extendstableTypes {
  row: Record<string, any>;
  index: number;
  serialNumber: number;
  open?: any;
}

export interface Campustypes extends rowType {
  clickbutton: (data: string) => void;
}

export interface tableHeadings {
  label: string;
  align: string;
}


// ===================univerty page type=======================//



export interface programObj {
  graduation_type: string;
  study_area: string;
  courses: Array<any> |  
    {
      name?: string;
      price?: string;
      course_id?: string | Record<string,any>;
      intake?: string;
      currency?:Record<string,any>
    }[]
  ;
}
export interface programDetailstype {
  course_details: programObj[];
}

export interface universityDetailsTypes {
  name: string | any;
  university_code: string;
  rating: string;
  success_rate: string;
  location: {
    country: string;
    state: string;
    city: string;
    address: string;
    latitude: string;
    longitude: string;
  };
  university_logo: string;
  university_gallery: [string];
  is_active: boolean;
  commission: string;
  website_link: string;
  _id?: string;
  about: string;
  is_partner: boolean;
  co_open: boolean;
  onlyco_open: boolean;
  currency: {
    currType: string;
    currSymbol?: string;
  };

}


export interface universityFormTypes {
  _id?: string
  university: universityDetailsTypes;
  course_details: programObj[];
}



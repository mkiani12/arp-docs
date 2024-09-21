import DashboardIcon from "~icons/material-symbols/dashboard-outline-rounded";

import TagsIcon from "~icons/bx/bxs-component";
import CodesIcon from "~icons/material-symbols/code-blocks-outline-rounded";

import FormsIcon from "~icons/tabler/forms";
import ReportIcon from "~icons/icon-park-outline/table-report";
import ListIcon from "~icons/material-symbols/event-list-outline-rounded";

import FrontendIcon from "~icons/simple-icons/frontendmentor";
import BackendIcon from "~icons/streamline/programming-browser-build-build-website-development-window-code-programming-web-backend-browser-dev";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "خانه" },
  {
    title: "داشبورد",
    icon: DashboardIcon,
    to: "/",
  },
  { header: "فهرست ها" },
  {
    title: "تگ ها",
    icon: TagsIcon,
    to: "/menu/tags",
  },
  {
    title: "کد ها",
    icon: CodesIcon,
    to: "/menu/codes",
  },
  { header: "ساختن" },
  {
    title: "ساخت فرم",
    icon: FormsIcon,
    to: "/build/form",
  },
  {
    title: "ساخت گزارش",
    icon: ReportIcon,
    to: "/build/report",
  },
  {
    title: "ساخت لیست",
    icon: ListIcon,
    to: "/build/list",
  },
  { header: "آموزش" },
  {
    title: "مستندات آریانیک",
    icon: FrontendIcon,
    to: "/docs/frontend",
  },
  {
    title: "مستندات NodeJS",
    icon: BackendIcon,
    to: "/docs/backend",
  },
];

export default sidebarItem;

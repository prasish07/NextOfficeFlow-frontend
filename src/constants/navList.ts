import { LuLayoutDashboard } from "react-icons/lu";
import { IoPerson, IoBugOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { GoIssueReopened, GoGoal } from "react-icons/go";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { TbManualGearbox } from "react-icons/tb";
import { FaRegPaperPlane } from "react-icons/fa";
import { GrDocumentPerformance } from "react-icons/gr";
import { GrAnnounce } from "react-icons/gr";
import { BsSuitcaseLg } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

type NavItem = {
	title: string;
	icon: any;
	path: string;
	subList: {
		title: string;
		icon: any;
		path: string;
	}[];
};

export const navList: NavItem[] = [
	{
		title: "Dashboard",
		path: "/",
		subList: [],
		icon: LuLayoutDashboard,
	},
	{
		title: "Employee",
		path: "/employee",
		icon: BsSuitcaseLg,
		subList: [],
	},
	{
		title: "Projects",
		icon: GrProjects,
		path: "/project",
		subList: [],
	},
	{
		title: "Ticket",
		icon: GoIssueReopened,
		path: "/dashboard",
		subList: [
			{ title: "Backlog", icon: IoIosArrowForward, path: "/dashboard" },
			{ title: "Bugs", icon: IoIosArrowForward, path: "/dashboard" },
			{ title: "Enhancement", icon: IoIosArrowForward, path: "/dashboard" },
		],
	},
	{
		title: "Attendance",
		icon: TbReportAnalytics,
		path: "/dashboard",
		subList: [
			{
				title: "Attendance Report",
				icon: IoIosArrowForward,
				path: "/dashboard",
			},
			{ title: "My attendance", icon: IoIosArrowForward, path: "/dashboard" },
			{
				title: "Manual Attendance",
				icon: IoIosArrowForward,
				path: "/dashboard",
			},
		],
	},
	{
		title: "Calender",
		icon: SlCalender,
		path: "/dashboard",
		subList: [
			{ title: "View Calender", icon: IoIosArrowForward, path: "/dashboard" },
			{ title: "Event Actions", icon: IoIosArrowForward, path: "/dashboard" },
		],
	},
	{
		title: "Request",
		icon: FaRegPaperPlane,
		path: "/dashboard",
		subList: [],
	},
	{
		title: "Appraisal",
		icon: GrDocumentPerformance,
		path: "/dashboard",
		subList: [
			{
				title: "Apprise Employee",
				icon: IoIosArrowForward,
				path: "/dashboard",
			},
			{ title: "History", icon: IoIosArrowForward, path: "/dashboard" },
		],
	},
	{
		title: "Announcement",
		icon: GrAnnounce,
		path: "/dashboard",
		subList: [
			{
				title: "All Announcement",
				icon: IoIosArrowForward,
				path: "/dashboard",
			},
			{ title: "Manage", icon: IoIosArrowForward, path: "/dashboard" },
		],
	},
];

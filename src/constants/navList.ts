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
	role: string[];
	subList: {
		title: string;
		icon: any;
		path: string;
		role: string[];
	}[];
};

export const navList: NavItem[] = [
	{
		title: "Dashboard",
		path: "/",
		subList: [],
		icon: LuLayoutDashboard,
		role: ["all"],
	},
	{
		title: "Employee",
		path: "/employee",
		icon: BsSuitcaseLg,
		subList: [],
		role: ["HR", "admin"],
	},
	{
		title: "Projects",
		icon: GrProjects,
		path: "/project",
		subList: [],
		role: ["employee", "admin", "project manager"],
	},
	{
		title: "Ticket",
		icon: GoIssueReopened,
		path: "/ticket",
		subList: [],
		role: ["employee", "admin", "project manager"],
	},
	{
		title: "Attendance",
		icon: TbReportAnalytics,
		path: "",
		subList: [
			// {
			// 	title: "Attendance Report",
			// 	icon: IoIosArrowForward,
			// 	path: "/dashboard",
			// 	role: ["HR", "admin"],
			// },
			{
				title: "My attendance",
				icon: IoIosArrowForward,
				path: "/dashboard",
				role: ["employee", "project manager"],
			},
			{
				title: "Manual Attendance",
				icon: IoIosArrowForward,
				path: "/attendance",
				role: ["all"],
			},
		],
		role: ["HR", "admin", "admin"],
	},
	{
		title: "Calender",
		icon: SlCalender,
		path: "/calendar",
		subList: [
			// {
			// 	title: "View Calender",
			// 	icon: IoIosArrowForward,
			// 	path: "/dashboard",
			// 	role: ["all"],
			// },
			// {
			// 	title: "Event Actions",
			// 	icon: IoIosArrowForward,
			// 	path: "/dashboard",
			// 	role: ["admin", "HR"],
			// },
		],
		role: ["all"],
	},
	{
		title: "Request",
		icon: FaRegPaperPlane,
		path: "",
		subList: [
			{
				title: "Make Request",
				icon: IoIosArrowForward,
				path: "/request",
				role: ["employee", "project manager"],
			},
			{
				title: "My Request",
				icon: IoIosArrowForward,
				path: "/request/my-request",
				role: ["employee", "project manager"],
			},
			{
				title: "All Request",
				icon: IoIosArrowForward,
				path: "/request/all",
				role: ["HR", "admin"],
			},
			{
				title: "Employee Request",
				icon: IoIosArrowForward,
				path: "/request/employee",
				role: ["project manager"],
			},
		],
		role: ["all"],
	},
	{
		title: "Appraisal",
		icon: GrDocumentPerformance,
		path: "/dashboard",
		subList: [
			{
				title: "Appraisal Employee",
				icon: IoIosArrowForward,
				path: "/appraisal",
				role: ["admin", "HR"],
			},
			{
				title: "History",
				icon: IoIosArrowForward,
				path: "/appraisal/history",
				role: ["employee", "project manager"],
			},
			{
				title: "All History",
				icon: IoIosArrowForward,
				path: "/appraisal/all",
				role: ["admin", "HR"],
			},
		],
		role: ["all"],
	},
	{
		title: "Announcement",
		icon: GrAnnounce,
		path: "/dashboard",
		subList: [
			{
				title: "All Announcement",
				icon: IoIosArrowForward,
				path: "/announcement",
				role: ["all"],
			},
		],
		role: ["all"],
	},
];

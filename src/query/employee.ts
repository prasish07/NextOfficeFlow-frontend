import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import {
	TEmployeeFormSchema,
	TEmployeeFormSchema2,
} from "@/components/model/EmployeeModal";
import { token } from "@/constants/consts";

interface EmployeeProps {
	message: string;
	data: SingleEmployeeProps[];
}

interface SingleEmployeeProps {
	_id: string;
	name: string;
	position: string;
	department: string;
	team: string;
	manager: string;
	description: string;
	githubUsername: string;
	appraisalHistory: string[];
	salary: number;
	startDate: string;
	endDate: string;
	status: string;
	from: string;
	to: string;
	userId: {
		_id: string;
		email: string;
		role: string;
	};
	documents: string[];
}

interface updateEmployeeProps {
	data: any;
	employeeId: string | undefined;
}

interface EmployeeProps2 {
	message: string;
	data: SingleEmployeeProps;
}

export interface ResponseProps {
	message: string;
}

export function useGetEmployeeData() {
	return useQuery<EmployeeProps>({
		queryKey: ["employee", 1],
		queryFn: async () => {
			const { data } = await axios.get<EmployeeProps>(`${baseUrl}/employee`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function addEmployee(
	data: TEmployeeFormSchema2
): Promise<ResponseProps> {
	return axios
		.post(`${baseUrl}/employee`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function updateEmployee({
	data,
	employeeId,
}: updateEmployeeProps): Promise<ResponseProps> {
	return axios
		.patch(`${baseUrl}/employee/${employeeId}`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function deleteEmployee(
	employeeId: string | undefined
): Promise<ResponseProps> {
	return axios
		.delete(`${baseUrl}/employee/${employeeId}`, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function useGetEmployeeDataByID(id: string | undefined) {
	return useQuery<EmployeeProps2>({
		queryKey: ["employeeId", id],
		queryFn: async () => {
			const { data } = await axios.get<EmployeeProps2>(
				`${baseUrl}/employee/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token()}`,
					},
				}
			);
			return data;
		},
	});
}

export function Logout(): Promise<ResponseProps> {
	return axios
		.post(
			`${baseUrl}/user/sign-out`,
			{ action: "logout" },
			{
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			}
		)
		.then((res) => res.data);
}

export function uploadFiles(data: FormData) {
	return axios
		.post(`https://api.cloudinary.com/v1_1/dbq7xtdqg/image/upload`, data)
		.then((res) => res.data);
}

export function useGetUserInfo() {
	return useQuery({
		queryKey: ["user", 1],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/user/info`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetUserDetails({ userId }: { userId: string }) {
	return useQuery({
		queryKey: ["user details", userId],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseUrl}/user/information/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token()}`,
					},
				}
			);
			return data;
		},
	});
}

export function useGetAllEmployees(filter?: any) {
	return useQuery<EmployeeProps>({
		queryKey: ["allEmployee", 1],
		queryFn: async () => {
			const { data } = await axios.get<EmployeeProps>(
				`${baseUrl}/employee/all`,
				{
					params: filter,
					headers: {
						Authorization: `Bearer ${token()}`,
					},
				}
			);
			return data;
		},
	});
}

export function addAssignee({
	projectId,
	assigneeIds,
}: {
	projectId: string;
	assigneeIds: string[];
}): Promise<ResponseProps> {
	return axios
		.post(
			`${baseUrl}/project/${projectId}/addAssignee`,
			{ assigneeIds: assigneeIds },
			{
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			}
		)
		.then((res) => res.data);
}

export function useGetMyDetails() {
	return useQuery({
		queryKey: ["my details", 1],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/employee/me`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function sentResignation(data: any) {
	return axios
		.post(`${baseUrl}/user/resignation`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { TEmployeeFormSchema } from "@/components/model/EmployeeModal";

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
}

interface updateEmployeeProps {
	data: TEmployeeFormSchema;
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
				withCredentials: true,
			});
			return data;
		},
	});
}

export function addEmployee(data: TEmployeeFormSchema): Promise<ResponseProps> {
	return axios
		.post(`${baseUrl}/employee`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function updateEmployee({
	data,
	employeeId,
}: updateEmployeeProps): Promise<ResponseProps> {
	return axios
		.patch(`${baseUrl}/employee/${employeeId}`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function deleteEmployee(
	employeeId: string | undefined
): Promise<ResponseProps> {
	return axios
		.delete(`${baseUrl}/employee/${employeeId}`, { withCredentials: true })
		.then((res) => res.data);
}

export function useGetEmployeeDataByID(id: string | undefined) {
	return useQuery<EmployeeProps2>({
		queryKey: ["employeeId", id],
		queryFn: async () => {
			const { data } = await axios.get<EmployeeProps2>(
				`${baseUrl}/employee/${id}`,
				{
					withCredentials: true,
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
			{ withCredentials: true }
		)
		.then((res) => res.data);
}

export function uploadFiles(data: FormData) {
	return axios
		.post(`https://api.cloudinary.com/v1_1/dbq7xtdqg/image/upload`, data)
		.then((res) => res.data);
}

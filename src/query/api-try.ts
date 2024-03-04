// import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { baseUrl } from "@/constants/apis";
// import {
// 	type Hero,
// 	type Banner,
// 	type SaleData,
// 	type Sticky,
// 	type CourseInfoData,
// 	type CouponProps,
// } from "~/interfaces/sales";

// export interface getSingleDataProps {
// 	id: number | undefined;
// }

// type QueryResultInterface<T = unknown, R = string | null> = {
// 	data: T;
// 	isLoading: boolean;
// 	error: R;
// 	isError?: boolean;
// };

// const getErrorMessage = (err: Error | null) => {
// 	if (!err) return null;
// 	return err.message;
// };

// export function useGetSales(): QueryResultInterface<SaleData> {
// 	const {
// 		data = {} as SaleData,
// 		isLoading,
// 		error,
// 		isError,
// 	} = useQuery<SaleData, Error>({
// 		queryKey: ["sales", 1],
// 		queryFn: async () => {
// 			const { data } = await axios.get<SaleData>(
// 				`${baseUrl}/sales?filter[status][_eq]=published`
// 			);
// 			return data;
// 		},
// 	});

// 	return {
// 		data,
// 		isLoading,
// 		error: getErrorMessage(error),
// 		isError,
// 	};
// }

// export function useGetBanner({ id }: getSingleDataProps) {
// 	return useQuery<Banner, Error>({
// 		queryKey: ["banner", id],
// 		queryFn: async () => {
// 			const { data } = await axios.get<Banner>(
// 				`${baseUrl}/banner/${id}?fields=*.*.*&filter[status][_eq]=published`
// 			);
// 			return data;
// 		},
// 	});
// }

// export function useGetHero({ id }: getSingleDataProps) {
// 	return useQuery<Hero, Error>({
// 		queryKey: ["hero", id],
// 		queryFn: async () => {
// 			const { data } = await axios.get<Hero>(
// 				`${baseUrl}/hero/${id}?fields=*.*.*&filter[status][_eq]=published`
// 			);
// 			return data;
// 		},
// 	});
// }

// export function useGetSticky({ id }: getSingleDataProps) {
// 	return useQuery<Sticky, Error>({
// 		queryKey: ["sticky", id],
// 		queryFn: async () => {
// 			const { data } = await axios.get<Sticky>(
// 				`${baseUrl}/stickyNote/${id}?fields=*.*.*&filter[status][_eq]=published`
// 			);
// 			return data;
// 		},
// 	});
// }

// export function useGetCourseInfo({
// 	id,
// }: {
// 	id: number;
// }): QueryResultInterface<CourseInfoData> {
// 	const {
// 		data = {} as CourseInfoData,
// 		isLoading,
// 		error,
// 	} = useQuery<CourseInfoData, Error>({
// 		queryKey: ["courseInfo", id],
// 		queryFn: async () => {
// 			const { data } = await axios.get<CourseInfoData>(
// 				`${baseUrl}/courseInfo/${id}?fields=*.*.*&filter[status][_eq]=published`
// 			);
// 			return data;
// 		},
// 	});

// 	return {
// 		data,
// 		isLoading,
// 		error: getErrorMessage(error),
// 	};
// }

// export function useGetCoupon({
// 	coupon,
// }: {
// 	coupon: number;
// }): QueryResultInterface<CouponProps> {
// 	const {
// 		data = {} as CouponProps,
// 		isLoading,
// 		error,
// 	} = useQuery<CouponProps, Error>({
// 		queryKey: ["coupon", coupon],
// 		queryFn: async () => {
// 			const { data } = await axios.get<CouponProps>(
// 				`${baseUrl}/coupon/${coupon}`
// 			);
// 			return data;
// 		},
// 	});

// 	return {
// 		data,
// 		isLoading,
// 		error: getErrorMessage(error),
// 	};
// }

// export function useUpdateCourse() {
// 	return useMutation({
// 		mutationFn: (newData) => {
// 			return axios.patch("/");
// 		},
// 	});
// }

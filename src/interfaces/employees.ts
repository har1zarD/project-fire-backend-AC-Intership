import { Types } from 'mongoose';

interface GetEmployeesRes {
	id: Types.ObjectId;
	firstName: string;
	lastName: string;
	department: string;
	salary: number;
	techStack: string[];
	image?: string;
}

interface GetEmployeesQueryParams {
	firstName?: string;
}

interface GetEmployeeByIdParams {
	employeeId: string;
}

interface GetEmployeeByIdRes {
	id: Types.ObjectId;
	firstName: string;
	lastName: string;
	department: string;
	salary: number;
	techStack: string[];
	image?: string;
}

interface AddEmployeeRes {
	id: Types.ObjectId;
	firstName: string;
	lastName: string;
	department: string;
	salary: number;
	techStack: string[];
	image?: string;
}

interface AddEmployeeReq {
	userId: string;
	firstName?: string;
	lastName?: string;
	department?: string;
	salary?: number;
	techStack?: string[];
	image?: string;
}

interface RemoveEmployeeParams {
	employeeId: string;
}

interface RemoveEmployeeReq {
	userId: string;
}

export {
	GetEmployeesRes,
	GetEmployeesQueryParams,
	GetEmployeeByIdParams,
	GetEmployeeByIdRes,
	AddEmployeeRes,
	AddEmployeeReq,
	RemoveEmployeeParams,
	RemoveEmployeeReq,
};

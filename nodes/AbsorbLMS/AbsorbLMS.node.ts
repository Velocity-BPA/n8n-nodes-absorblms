/**
 * AbsorbLMS Node for n8n
 * 
 * Copyright (c) 2024 Velocity BPA
 * Licensed under the Business Source License 1.1
 * https://github.com/VelocityBPA/n8n-nodes-absorblms
 */

import { IExecuteFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeApiError,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class AbsorbLMS implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AbsorbLMS',
		name: 'absorbLMS',
		icon: 'file:absorblms.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with AbsorbLMS API',
		defaults: {
			name: 'AbsorbLMS',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'absorbLMSApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '=https://{{$credentials.companySubdomain}}.myabsorb.com/api/rest/v2',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Users',
						value: 'users',
					},
					{
						name: 'Courses',
						value: 'courses',
					},
					{
						name: 'Enrollments',
						value: 'enrollments',
					},
					{
						name: 'Departments',
						value: 'departments',
					},
					{
						name: 'Certificates',
						value: 'certificates',
					},
					{
						name: 'Lessons',
						value: 'lessons',
					},
					{
						name: 'Categories',
						value: 'categories',
					},
				],
				default: 'users',
			},

			// Users Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['users'],
					},
				},
				options: [
					{
						name: 'Get Users',
						value: 'getUsers',
						description: 'Retrieve list of users with optional filtering',
						action: 'Get users',
					},
					{
						name: 'Create User',
						value: 'createUser',
						description: 'Create a new user account',
						action: 'Create a user',
					},
					{
						name: 'Update User',
						value: 'updateUser',
						description: 'Update existing user information',
						action: 'Update a user',
					},
					{
						name: 'Get User Enrollments',
						value: 'getUserEnrollments',
						description: 'Get all enrollments for a specific user',
						action: 'Get user enrollments',
					},
					{
						name: 'Get User Certificates',
						value: 'getUserCertificates',
						description: 'Get certificates earned by a specific user',
						action: 'Get user certificates',
					},
					{
						name: 'Get Direct Reports',
						value: 'getDirectReports',
						description: 'Get direct reports for a manager user',
						action: 'Get direct reports',
					},
				],
				default: 'getUsers',
			},

			// Get Users Parameters
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getUsers'],
					},
				},
				default: 100,
				description: 'Number of users to retrieve',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getUsers'],
					},
				},
				default: 0,
				description: 'Number of users to skip',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getUsers'],
					},
				},
				default: '',
				description: 'Filter by username',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getUsers'],
					},
				},
				default: '',
				description: 'Filter by email address',
			},
			{
				displayName: 'Department ID',
				name: 'departmentId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getUsers'],
					},
				},
				default: '',
				description: 'Filter by department ID',
			},

			// Create User Parameters
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createUser'],
					},
				},
				default: '',
				description: 'Username for the new user',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createUser'],
					},
				},
				default: '',
				description: 'Password for the new user',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createUser'],
					},
				},
				default: '',
				description: 'First name of the user',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createUser'],
					},
				},
				default: '',
				description: 'Last name of the user',
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createUser'],
					},
				},
				default: '',
				description: 'Email address of the user',
			},
			{
				displayName: 'Department ID',
				name: 'departmentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createUser'],
					},
				},
				default: '',
				description: 'Department ID for the user',
			},

			// Update User Parameters
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['updateUser'],
					},
				},
				default: '',
				description: 'ID of the user to update',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['updateUser'],
					},
				},
				default: '',
				description: 'First name of the user',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['updateUser'],
					},
				},
				default: '',
				description: 'Last name of the user',
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['updateUser'],
					},
				},
				default: '',
				description: 'Email address of the user',
			},
			{
				displayName: 'Department ID',
				name: 'departmentId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['updateUser'],
					},
				},
				default: '',
				description: 'Department ID for the user',
			},

			// Get User Enrollments Parameters
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getUserEnrollments'],
					},
				},
				default: '',
				description: 'ID of the user to get enrollments for',
			},

			// Get User Certificates Parameters
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getUserCertificates'],
					},
				},
				default: '',
				description: 'ID of the user to get certificates for',
			},

			// Get Direct Reports Parameters
			{
				displayName: 'Manager User ID',
				name: 'managerId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['getDirectReports'],
					},
				},
				default: '',
				description: 'ID of the manager to get direct reports for',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'users') {
					const operation = this.getNodeParameter('operation', i) as string;
					responseData = await this.executeUsersOperations(operation, i);
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`The resource "${resource}" is not implemented yet.`
					);
				}

				returnData.push(...responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}

	async executeUsersOperations(
		this: IExecuteFunctions,
		operation: string,
		i: number,
	): Promise<INodeExecutionData[]> {
		const credentials = await this.getCredentials('absorbLMSApi');
		const companySubdomain = credentials.companySubdomain as string;
		const apiKey = credentials.apiKey as string;

		const baseURL = `https://${companySubdomain}.myabsorb.com/api/rest/v2`;
		
		let responseData: any;
		const returnData: INodeExecutionData[] = [];

		try {
			switch (operation) {
				case 'getUsers': {
					const limit = this.getNodeParameter('limit', i, 100) as number;
					const offset = this.getNodeParameter('offset', i, 0) as number;
					const username = this.getNodeParameter('username', i, '') as string;
					const email = this.getNodeParameter('email', i, '') as string;
					const departmentId = this.getNodeParameter('departmentId', i, '') as string;

					const queryParams: IDataObject = {
						limit,
						offset,
					};

					if (username) queryParams.username = username;
					if (email) queryParams.email = email;
					if (departmentId) queryParams.departmentId = departmentId;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseURL}/users`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Accept': 'application/json',
						},
						qs: queryParams,
					};

					responseData = await this.helpers.httpRequest(options);
					
					if (responseData && Array.isArray(responseData)) {
						responseData.forEach((user: any) => {
							returnData.push({
								json: user,
							});
						});
					} else {
						returnData.push({
							json: responseData,
						});
					}
					break;
				}

				case 'createUser': {
					const username = this.getNodeParameter('username', i) as string;
					const password = this.getNodeParameter('password', i) as string;
					const firstName = this.getNodeParameter('firstName', i) as string;
					const lastName = this.getNodeParameter('lastName', i) as string;
					const emailAddress = this.getNodeParameter('emailAddress', i) as string;
					const departmentId = this.getNodeParameter('departmentId', i) as string;

					const body: IDataObject = {
						username,
						password,
						firstName,
						lastName,
						emailAddress,
						departmentId,
					};

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${baseURL}/users`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body,
					};

					responseData = await this.helpers.httpRequest(options);
					
					returnData.push({
						json: responseData,
					});
					break;
				}

				case 'updateUser': {
					const userId = this.getNodeParameter('userId', i) as string;
					const firstName = this.getNodeParameter('firstName', i, '') as string;
					const lastName = this.getNodeParameter('lastName', i, '') as string;
					const emailAddress = this.getNodeParameter('emailAddress', i, '') as string;
					const departmentId = this.getNodeParameter('departmentId', i, '') as string;

					const body: IDataObject = {};
					
					if (firstName) body.firstName = firstName;
					if (lastName) body.lastName = lastName;
					if (emailAddress) body.emailAddress = emailAddress;
					if (departmentId) body.departmentId = departmentId;

					const options: IHttpRequestOptions = {
						method: 'PUT',
						url: `${baseURL}/users/${userId}`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body,
					};

					responseData = await this.helpers.httpRequest(options);
					
					returnData.push({
						json: responseData,
					});
					break;
				}

				case 'getUserEnrollments': {
					const userId = this.getNodeParameter('userId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseURL}/users/${userId}/enrollments`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Accept': 'application/json',
						},
					};

					responseData = await this.helpers.httpRequest(options);
					
					if (responseData && Array.isArray(responseData)) {
						responseData.forEach((enrollment: any) => {
							returnData.push({
								json: enrollment,
							});
						});
					} else {
						returnData.push({
							json: responseData,
						});
					}
					break;
				}

				case 'getUserCertificates': {
					const userId = this.getNodeParameter('userId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseURL}/users/${userId}/certificates`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Accept': 'application/json',
						},
					};

					responseData = await this.helpers.httpRequest(options);
					
					if (responseData && Array.isArray(responseData)) {
						responseData.forEach((certificate: any) => {
							returnData.push({
								json: certificate,
							});
						});
					} else {
						returnData.push({
							json: responseData,
						});
					}
					break;
				}

				case 'getDirectReports': {
					const managerId = this.getNodeParameter('managerId', i) as string;

					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseURL}/users/${managerId}/directReports`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Accept': 'application/json',
						},
					};

					responseData = await this.helpers.httpRequest(options);
					
					if (responseData && Array.isArray(responseData)) {
						responseData.forEach((report: any) => {
							returnData.push({
								json: report,
							});
						});
					} else {
						returnData.push({
							json: responseData,
						});
					}
					break;
				}

				default: {
					throw new NodeOperationError(
						this.getNode(),
						`The operation "${operation}" is not known!`,
					);
				}
			}
		} catch (error) {
			if (error instanceof NodeApiError) {
				throw error;
			}
			
			throw new NodeOperationError(
				this.getNode(),
				`AbsorbLMS API Error: ${error.message}`,
				{
					httpCode: error.httpCode || 'UNKNOWN',
					description: error.description,
				},
			);
		}

		return returnData;
	}
}
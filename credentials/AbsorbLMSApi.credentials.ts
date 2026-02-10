import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AbsorbLMSApi implements ICredentialType {
	name = 'absorbLMSApi';
	displayName = 'AbsorbLMS API';
	documentationUrl = 'https://support.absorblms.com/hc/en-us/articles/115005469728-Absorb-API';
	properties: INodeProperties[] = [
		{
			displayName: 'Company Subdomain',
			name: 'companySubdomain',
			type: 'string',
			required: true,
			default: '',
			placeholder: 'your-company',
			description: 'The company subdomain from your AbsorbLMS URL (e.g., "your-company" from "your-company.myabsorb.com")',
		},
		{
			displayName: 'Private Key',
			name: 'privateKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Private Key generated from the AbsorbLMS admin panel',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Private-Key': '={{$credentials.privateKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials.companySubdomain}}.myabsorb.com/api/rest/v2',
			url: '/users',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}
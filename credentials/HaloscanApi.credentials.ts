import {
	IAuthenticateGeneric,
	Icon,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest
} from 'n8n-workflow';

export class HaloscanApi implements ICredentialType {
	name = 'haloscanApi';
	displayName = 'Haloscan API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	icon: Icon = { light: 'file:../nodes/Haloscan/haloscan_bleu_square.svg', dark: 'file:../nodes/Haloscan/haloscan_bleu_square.svg' };
	documentationUrl = 'https://www.sequance.fr/documentation-api-make-haloscan/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'haloscan-api-key': '={{$credentials.apiKey}}'
			}
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.haloscan.com/api',
			url: '/user/credit',
			method: 'GET',
		},
	};
}

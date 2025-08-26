import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HaloscanApi implements ICredentialType {
	name = 'haloscanApi';
	displayName = 'Haloscan API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
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
}

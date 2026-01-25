import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Make an API request to Haloscan
 */
export async function haloscanApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('haloscanApi');

	const options: IRequestOptions = {
		method,
		headers: {
			'haloscan-api-key': credentials.apiKey as string,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		uri: `https://api.haloscan.com/api${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	if (Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.request(options);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Remove empty/null/undefined values from an object
 * This is crucial for API requests where empty values should not be sent
 */
export function removeEmptyValues(obj: IDataObject): IDataObject {
	const result: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== null && value !== undefined && value !== '') {
			if (Array.isArray(value)) {
				// Keep arrays even if empty, but filter out empty strings
				const filtered = value.filter((v) => v !== null && v !== undefined && v !== '');
				if (filtered.length > 0) {
					result[key] = filtered;
				}
			} else if (typeof value === 'object' && !Array.isArray(value)) {
				const nested = removeEmptyValues(value as IDataObject);
				if (Object.keys(nested).length > 0) {
					result[key] = nested;
				}
			} else {
				result[key] = value;
			}
		}
	}
	return result;
}

/**
 * Convert a parameter to an array if it's not already
 * Handles comma-separated strings and single values
 */
export function toArray(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.map(String).filter((v) => v !== '');
	}
	if (typeof value === 'string' && value !== '') {
		// Check if it's a JSON array string
		if (value.startsWith('[') && value.endsWith(']')) {
			try {
				const parsed = JSON.parse(value);
				if (Array.isArray(parsed)) {
					return parsed.map(String).filter((v) => v !== '');
				}
			} catch {
				// Not valid JSON, treat as single value
			}
		}
		return [value];
	}
	return [];
}

/**
 * Convert a parameter to an array of integers
 * Handles arrays, comma-separated strings, and single values
 */
export function toIntArray(value: unknown): number[] {
	const stringArray = toArray(value);
	return stringArray.map((v) => parseInt(v, 10)).filter((v) => !isNaN(v));
}

/**
 * Merge additional fields from a collection into the main body object
 */
export function mergeAdditionalFields(
	body: IDataObject,
	additionalFields: IDataObject | undefined,
): IDataObject {
	if (!additionalFields) {
		return body;
	}
	return { ...body, ...additionalFields };
}

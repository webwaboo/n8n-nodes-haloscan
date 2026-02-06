import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
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

	const options: IHttpRequestOptions = {
		method,
		headers: {
			'haloscan-api-key': credentials.apiKey as string,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		url: `https://api.haloscan.com/api${endpoint}`,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	if (Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response;
	} catch (error: unknown) {
		// Extract detailed error information from API response
		const err = error as {
			message?: string;
			statusCode?: number;
			error?: {
				message?: string;
				error?: string;
				details?: unknown;
			};
			response?: {
				body?: unknown;
			};
		};

		// Build detailed error message
		let errorMessage = 'Haloscan API Error';
		const errorDetails: IDataObject = {
			endpoint,
			method,
			requestBody: body,
		};

		if (err.statusCode) {
			errorDetails.statusCode = err.statusCode;
		}

		if (err.error) {
			if (typeof err.error === 'object') {
				errorDetails.apiError = err.error;
				errorMessage = err.error.message || err.error.error || errorMessage;
			} else {
				errorDetails.apiError = err.error;
			}
		}

		if (err.response?.body) {
			errorDetails.responseBody = err.response.body;
		}

		if (err.message) {
			errorDetails.originalMessage = err.message;
		}

		throw new NodeApiError(this.getNode(), {
			message: errorMessage,
			description: JSON.stringify(errorDetails, null, 2),
		});
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
 * Handles nested arrays, comma-separated strings, and single values
 */
export function toArray(value: unknown): string[] {
	if (Array.isArray(value)) {
		// Flatten nested arrays (e.g., [['a', 'b']] -> ['a', 'b'])
		const flattened: string[] = [];
		for (const item of value) {
			if (Array.isArray(item)) {
				// Recursively handle nested arrays
				flattened.push(...toArray(item));
			} else if (item !== null && item !== undefined && item !== '') {
				flattened.push(String(item));
			}
		}
		return flattened;
	}
	if (typeof value === 'string' && value !== '') {
		// Check if it's a JSON array string
		if (value.startsWith('[') && value.endsWith(']')) {
			try {
				const parsed = JSON.parse(value);
				if (Array.isArray(parsed)) {
					return toArray(parsed); // Recursively process parsed array
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

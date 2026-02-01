import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

import {
	haloscanApiRequest,
	removeEmptyValues,
	toArray,
	toIntArray,
	mergeAdditionalFields,
} from './GenericFunctions';

export class HaloscanV2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Haloscan',
		name: 'haloscan',
		icon: 'file:haloscan_bleu_square.svg',
		group: ['transform'],
		version: 2,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Haloscan is a powerful SEO analysis tool that provides insights into keyword rankings, domain metrics, and related searches.',
		defaults: {
			name: 'Haloscan',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'haloscanApi',
				required: true,
			},
		],
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Keyword Explorer',
						value: 'keywordExplorer',
					},
					{
						name: 'Site Explorer',
						value: 'siteExplorer',
					},
				],
				default: 'keywordExplorer',
			},

			// ==========================================
			// USER OPERATIONS
			// ==========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get User Credit',
						value: 'getUserCredit',
						action: 'Get user credit',
						description: 'Retrieves the remaining credit for the current user',
					},
				],
				default: 'getUserCredit',
			},

			// ==========================================
			// KEYWORD EXPLORER OPERATIONS
			// ==========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
					},
				},
				options: [
					{
						name: 'Compare Keywords SERP',
						value: 'compareKeywordsSERP',
						action: 'Compare keywords SERP',
						description: 'Compares SERPs for a given keyword',
					},
					{
						name: 'Find Keyword',
						value: 'findKeyword',
						action: 'Find keyword',
						description: 'Finds keywords based on a seed',
					},
					{
						name: 'Find Keyword Synonym',
						value: 'findKeywordSynonym',
						action: 'Find keyword synonym',
						description: 'Finds synonyms for a keyword',
					},
					{
						name: 'Find Keywords Match',
						value: 'findKeywordsMatch',
						action: 'Find keywords match',
						description: 'Finds a keyword or expression containing a given seed keyword',
					},
					{
						name: 'Find Related Keyword',
						value: 'findRelatedKeyword',
						action: 'Find related keyword',
						description: "Finds similar keywords or expressions, based on SERP's \"Related Searches\"",
					},
					{
						name: 'Find Similar Keyword',
						value: 'findSimilarKeyword',
						action: 'Find similar keyword',
						description: 'Finds keywords with the same categories as the seed keywords',
					},
					{
						name: 'Get Keyword Data in Bulk',
						value: 'getKeywordDataInBulk',
						action: 'Get keyword data in bulk',
						description: 'Retrieves keyword data in bulk',
					},
					{
						name: 'Get Keyword Highlight',
						value: 'getKeywordHighlight',
						action: 'Get keyword highlight',
						description: 'Identifies keywords for which the same expressions are highlighted in SERPs',
					},
					{
						name: 'Get Keyword Overview',
						value: 'getKeywordOverview',
						action: 'Get keyword overview',
						description: 'Retrieves an SEO overview for a keyword',
					},
					{
						name: 'Get Keyword Question',
						value: 'getKeywordQuestion',
						action: 'Get keyword question',
						description: 'Retrieves popular questions and PAA queries related to a keyword',
					},
					{
						name: "Get Keyword's Available Dates From SERP",
						value: 'getKeywordAvailableDatesFromSERP',
						action: 'Get keyword available dates from serp',
						description: 'Gets available dates for a keyword from SERP',
					},
					{
						name: "Get Keyword's SERP Page Evolution",
						value: 'getKeywordSERPPageEvolution',
						action: 'Get keyword serp page evolution',
						description: "Tracks a specific URL's ranking history for a given keyword between two dates",
					},
					{
						name: "Get Keyword's Site Structure",
						value: 'getKeywordSiteStructure',
						action: 'Get keyword site structure',
						description: 'Analyzes keyword relationships and groups them based on shared statistics',
					},
					{
						name: 'Scrap Keyword',
						value: 'scrapKeyword',
						action: 'Scrap keyword',
						description: 'Refreshes keyword data, including SERP, Ads metrics and All in Title when necessary',
					},
				],
				default: 'getKeywordOverview',
			},

			// ==========================================
			// SITE EXPLORER OPERATIONS
			// ==========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
					},
				},
				options: [
					{
						name: 'Compare Domain Keywords with Competitors',
						value: 'compareDomainKeywordsWithCompetitors',
						action: 'Compare domain keywords with competitors',
						description: 'Compares keyword rankings between a given website and its competitors',
					},
					{
						name: 'Get Best Keywords From Page',
						value: 'getBestKeywordsFromPage',
						action: 'Get best keywords from page',
						description: 'Retrieves the best-positioned keyword for the given pages',
					},
					{
						name: 'Get Competitor Best Pages',
						value: 'getCompetitorBestPages',
						action: 'Get competitor best pages',
						description: "Retrieves the best-performing pages of a competitor's domain",
					},
					{
						name: 'Get Competitor Keywords with the Best Position',
						value: 'getCompetitorsKeywordsBestPosition',
						action: 'Get competitor keywords with the best position',
						description: 'Get the keywords of a competitor with the best positions',
					},
					{
						name: 'Get Domain Categories Based on GMB Backlinks',
						value: 'getDomainCategoriesBasedOnGMBBacklinks',
						action: 'Get domain categories based on gmb backlinks',
						description: 'Retrieves the business categories associated with a given domain or URL based on GMB backlinks',
					},
					{
						name: 'Get Domain Competitors',
						value: 'getDomainCompetitors',
						action: 'Get domain competitors',
						description: 'Retrieves a list of competitor domains for a given website',
					},
					{
						name: 'Get Domain Data in Bulk',
						value: 'getDomainDataInBulk',
						action: 'Get domain data in bulk',
						description: 'Retrieves data for a list of provided domains or URLs',
					},
					{
						name: 'Get Domain GMB Backlinks Map',
						value: 'getDomainGMBBacklinksMap',
						action: 'Get domain gmb backlinks map',
						description: 'Retrieves the geographical locations of backlinks for a given domain or URL',
					},
					{
						name: 'Get Domain Overview',
						value: 'getDomainOverview',
						action: 'Get domain overview',
						description: 'Retrieves an SEO overview for a domain or URL',
					},
					{
						name: 'Get Domain Position History',
						value: 'getDomainPositionHistory',
						action: 'Get domain position history',
						description: 'Retrieves the historical ranking positions of a specified domain or URL for various keywords',
					},
					{
						name: 'Get Domain Top Pages',
						value: 'getDomainTopPages',
						action: 'Get domain top pages',
						description: 'Retrieves top-performing pages of a domain or URL',
					},
					{
						name: 'Get Expired Domains',
						value: 'getExpiredDomains',
						action: 'Get expired domains',
						description: 'Retrieves a list of (registrar free) expired domains with SEO metrics',
					},
					{
						name: 'Get GMB Backlink',
						value: 'getGMBBacklink',
						action: 'Get gmb backlink',
						description: 'Retrieves GMB backlink data for a specified domain or URL',
					},
					{
						name: 'Get History of Domain Pages',
						value: 'getHistoryOfDomainPages',
						action: 'Get history of domain pages',
						description: 'Fetches metrics for specific pages of a domain',
					},
					{
						name: 'Get Keyword Data From an URL',
						value: 'getKeywordDataFromURL',
						action: 'Get keyword data from an url',
						description: 'Retrieves keyword data for a given URL or domain',
					},
					{
						name: 'Get Ranking of Domain Keyword',
						value: 'getRankingOfDomainKeyword',
						action: 'Get ranking of domain keyword',
						description: 'Fetches a current domain rankings for a domain or URL',
					},
					{
						name: 'Get Visibility Trend of Domains',
						value: 'getVisibilityTrendOfDomains',
						action: 'Get visibility trend of domains',
						description: 'Retrieves a visibility trend data for a given list of websites or URLs',
					},
					{
						name: 'Reveal Expired Domains',
						value: 'revealExpiredDomains',
						action: 'Reveal expired domains',
						description: 'Reveals expired root domains using the provided keys retrieved from the domains/expired endpoint',
					},
				],
				default: 'getDomainOverview',
			},

			// ==========================================
			// KEYWORD EXPLORER - PARAMETERS
			// ==========================================

			// Keyword parameter (shared across multiple operations)
			{
				displayName: 'Keyword',
				description: 'Requested keyword',
				required: true,
				name: 'keyword',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: [
							'compareKeywordsSERP',
							'findKeywordSynonym',
							'findKeywordsMatch',
							'findRelatedKeyword',
							'findSimilarKeyword',
							'getKeywordHighlight',
							'getKeywordOverview',
							'getKeywordQuestion',
							'getKeywordAvailableDatesFromSERP',
							'getKeywordSERPPageEvolution',
						],
					},
				},
			},

			// Keyword for findKeyword operation (optional when keywords is provided)
			{
				displayName: 'Keyword',
				description: 'Requested keyword. Use to find a single keyword, or keywords to look for several keywords at once.',
				name: 'keyword',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findKeyword'],
					},
				},
			},

			// Keyword for Site Structure (optional)
			{
				displayName: 'Keyword',
				description: 'Requested keyword, ignored if keywords (bulk) is present',
				name: 'keyword',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},

			// Keywords array parameter (required)
			{
				displayName: 'Keywords',
				description: 'Array containing the requested keywords',
				required: true,
				name: 'keywords',
				type: 'string',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordDataInBulk', 'scrapKeyword'],
					},
				},
			},

			// Keywords for findKeyword (optional)
			{
				displayName: 'Keywords',
				description: 'Requested keywords, ignore if keyword is present. You can map an array here.',
				name: 'keywordsFindKeyword',
				type: 'string',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findKeyword'],
					},
				},
			},

			// Keyword Sources for findKeyword
			{
				displayName: 'Keyword Sources',
				description: 'Which strategies to use to find keywords from input',
				name: 'keywordsSources',
				type: 'multiOptions',
				options: [
					{ name: 'Categories', value: 'categories' },
					{ name: 'Highlights', value: 'highlights' },
					{ name: 'Match', value: 'match' },
					{ name: 'Questions', value: 'questions' },
					{ name: 'Related', value: 'related' },
					{ name: 'Serp', value: 'serp' },
				],
				default: ['serp', 'related'],
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findKeyword'],
					},
				},
			},

			// Period for Compare Keywords SERP
			{
				displayName: 'Period',
				description: "The comparison period for SERPs. If custom is used, 'first_date' and 'second_date' must be provided.",
				required: true,
				name: 'period',
				type: 'options',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{ name: '1 Month', value: '1 month' },
					{ name: '3 Months', value: '3 months' },
					{ name: '6 Months', value: '6 months' },
					{ name: '12 Months', value: '12 months' },
					{ name: 'Custom', value: 'custom' },
				],
				default: '6 months',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['compareKeywordsSERP'],
					},
				},
			},

			// First Date for Compare Keywords SERP (when period is custom)
			{
				displayName: 'First Date',
				description: "Date in YYYY-MM-DD format. Only used if period = 'custom'.",
				name: 'firstDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['compareKeywordsSERP'],
						period: ['custom'],
					},
				},
			},

			// Second Date for Compare Keywords SERP (when period is custom)
			{
				displayName: 'Second Date',
				description: "Date in YYYY-MM-DD format. Only used if period = 'custom'.",
				name: 'secondDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['compareKeywordsSERP'],
						period: ['custom'],
					},
				},
			},

			// First Date for SERP Page Evolution
			{
				displayName: 'First Date',
				description: 'Date in YYYY-MM-DD format',
				required: true,
				name: 'firstDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSERPPageEvolution'],
					},
				},
			},

			// Second Date for SERP Page Evolution
			{
				displayName: 'Second Date',
				description: 'Date in YYYY-MM-DD format',
				required: true,
				name: 'secondDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSERPPageEvolution'],
					},
				},
			},

			// URL for SERP Page Evolution
			{
				displayName: 'URL',
				required: true,
				name: 'url',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSERPPageEvolution'],
					},
				},
			},

			// Language for Keyword Overview
			{
				displayName: 'Language',
				description: "Only used in conjunction with 'categories' in 'requested_data'.",
				name: 'lang',
				type: 'options',
				options: [
					{ name: 'English', value: 'en' },
					{ name: 'French', value: 'fr' },
				],
				default: 'en',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordOverview'],
					},
				},
			},

			// Requested Data for Keyword Overview
			{
				displayName: 'Requested Data',
				description: 'Requested data for the given keyword, corresponding to the content of different sections of the haloscan overview page.',
				required: true,
				name: 'requestedData',
				type: 'multiOptions',
				options: [
					{ name: 'Categories', value: 'categories' },
					{ name: 'Keyword Match', value: 'keyword_match' },
					{ name: 'Metrics', value: 'metrics' },
					{ name: 'Related Question', value: 'related_question' },
					{ name: 'Related Search', value: 'related_search' },
					{ name: 'SERP', value: 'serp' },
					{ name: 'Similar Category', value: 'similar_category' },
					{ name: 'Similar Highlight', value: 'similar_highlight' },
					{ name: 'Similar Serp', value: 'similar_serp' },
					{ name: 'Synonyms', value: 'synonyms' },
					{ name: 'Top Sites', value: 'top_sites' },
					{ name: 'Volume History', value: 'volume_history' },
				],
				default: [],
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordOverview'],
					},
				},
			},

			// Exact Match
			{
				displayName: 'Exact Match',
				description: 'Whether to always ignore accents, punctuation, case, special characters, etc when FALSE.',
				name: 'exactMatch',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: [
							'findKeyword',
							'findKeywordSynonym',
							'findKeywordsMatch',
							'findRelatedKeyword',
							'getKeywordDataInBulk',
							'getKeywordHighlight',
							'getKeywordQuestion',
							'getKeywordSiteStructure',
						],
					},
				},
			},

			// Keep Seed for findKeyword
			{
				displayName: 'Keep Seed',
				description: "Whether to keep the input in the api's response",
				name: 'keepSeed',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findKeyword'],
					},
				},
			},

			// Keep Only PAA
			{
				displayName: 'Keep Only PAA',
				description: 'Whether to include only PAA (People Also Ask) from google in the response',
				name: 'keepOnlyPaa',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordQuestion'],
					},
				},
			},

			// Question Types
			{
				displayName: 'Question Types',
				name: 'questionTypes',
				type: 'multiOptions',
				options: [
					{ name: 'Definition', value: 'definition' },
					{ name: 'How', value: 'how' },
					{ name: 'How Expensive', value: 'how_expensive' },
					{ name: 'How Long', value: 'how_long' },
					{ name: 'How Many', value: 'how_many' },
					{ name: 'Unknown', value: 'unknown' },
					{ name: 'What', value: 'what' },
					{ name: 'When', value: 'when' },
					{ name: 'Where', value: 'where' },
					{ name: 'Who', value: 'who' },
					{ name: 'Why', value: 'why' },
					{ name: 'Yes/No', value: 'yesno' },
				],
				default: [],
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordQuestion'],
					},
				},
			},

			// Depth Min/Max for Related Keyword and Question
			{
				displayName: 'Minimum Depth',
				name: 'depthMin',
				type: 'number',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findRelatedKeyword', 'getKeywordQuestion'],
					},
				},
			},
			{
				displayName: 'Maximum Depth',
				name: 'depthMax',
				type: 'number',
				default: '',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findRelatedKeyword', 'getKeywordQuestion'],
					},
				},
			},

			// Similarity Min/Max
			{
				displayName: 'Similarity Min',
				name: 'similarityMin',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findSimilarKeyword', 'getKeywordHighlight'],
					},
				},
			},
			{
				displayName: 'Similarity Max',
				name: 'similarityMax',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['findSimilarKeyword', 'getKeywordHighlight'],
					},
				},
			},

			// Site Structure specific parameters
			{
				displayName: 'Keywords',
				description: 'Array containing the requested keywords',
				name: 'keywordsSiteStructure',
				type: 'string',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: [ 'getKeywordSiteStructure'],
					},
				},
			},
			{
				displayName: 'Mode',
				description: "Defines how groups will be made. Manual means keywords will be grouped when they share URLs. Multi means keywords will be automatically grouped hierarchically.",
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'Multi', value: 'multi' },
					{ name: 'Manual', value: 'manual' },
				],
				default: 'multi',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},
			{
				displayName: 'Granularity',
				description: 'Low granularity leads to one big group, high granularity leads to many smaller groups. Ignored if mode=\'manual\'',
				name: 'granularity',
				type: 'number',
				default: 1,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},
			{
				displayName: 'Multipartite Modes',
				description: 'Which sources of data should be used to build the multipartite graph.',
				name: 'multipartiteModes',
				type: 'multiOptions',
				options: [
					{ name: 'Categories', value: 'categories' },
					{ name: 'Highlights', value: 'highlights' },
					{ name: 'Ngram', value: 'ngram' },
					{ name: 'Related', value: 'related' },
					{ name: 'SERP', value: 'serp' },
				],
				default: [],
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},
			{
				displayName: 'Neighbours Sources',
				description: 'Which strategies should be used to find neighbours for keyword.',
				name: 'neighboursSources',
				type: 'multiOptions',
				options: [
					{ name: 'Categories', value: 'categories' },
					{ name: 'Highlights', value: 'highlights' },
					{ name: 'Ngram', value: 'ngram' },
					{ name: 'Related', value: 'related' },
					{ name: 'SERP', value: 'serp' },
				],
				default: [],
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},
			{
				displayName: 'Neighbours Sample Max Size',
				description: 'Max number of returned results. Between 10 and 2000.',
				name: 'neighboursSampleMaxSize',
				type: 'number',
				typeOptions: {
					maxValue: 2000,
					minValue: 10,
				},
				default: 1000,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},
			{
				displayName: 'Manual Common 10',
				description: 'In a manual grouping strategy, how many URLs should 2 keywords have in common in their top 10',
				name: 'manualCommon10',
				type: 'number',
				default: 2,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},
			{
				displayName: 'Manual Common 100',
				description: 'In a manual grouping strategy, how many URLs should 2 keywords have in common in their top 100',
				name: 'manualCommon100',
				type: 'number',
				default: 10,
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: ['getKeywordSiteStructure'],
					},
				},
			},

			// ==========================================
			// SITE EXPLORER - PARAMETERS
			// ==========================================

			// Input (single domain/URL)
			{
				displayName: 'Input',
				description: 'Requested URL or domain',
				name: 'input',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: [
							'compareDomainKeywordsWithCompetitors',
							'getCompetitorBestPages',
							'getDomainCategoriesBasedOnGMBBacklinks',
							'getDomainCompetitors',
							'getDomainGMBBacklinksMap',
							'getDomainOverview',
							'getDomainPositionHistory',
							'getDomainTopPages',
							'getGMBBacklink',
							'getHistoryOfDomainPages',
							'getKeywordDataFromURL',
							'getRankingOfDomainKeyword',
						],
					},
				},
			},

			// Inputs (array of domains/URLs)
			{
				displayName: 'Inputs',
				description: 'Array containing the requested URLs or domains',
				name: 'inputs',
				type: 'string',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getDomainDataInBulk', 'getBestKeywordsFromPage', 'getVisibilityTrendOfDomains'],
					},
				},
			},

			// Competitors
			{
				displayName: 'Competitors',
				description: 'List of competitor domains or root domains',
				name: 'competitors',
				type: 'string',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: [
							'compareDomainKeywordsWithCompetitors',
							'getCompetitorBestPages',
							'getCompetitorsKeywordsBestPosition',
						],
					},
				},
			},

			// Keywords for Site Explorer operations
			{
				displayName: 'Keywords',
				description: 'List of keywords to look for',
				name: 'keywords',
				type: 'string',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getCompetitorsKeywordsBestPosition', 'getKeywordDataFromURL'],
					},
				},
			},

			// Root Domain Keys for Reveal Expired Domains
			{
				displayName: 'Root Domain Keys',
				description: "List of root_domain_key fields from items in the domains/expired endpoint which you want to reveal.",
				name: 'rootDomainKeys',
				type: 'string',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['revealExpiredDomains'],
					},
				},
			},

			// Keyword for Expired Domains
			{
				displayName: 'Keyword',
				description: 'Filter expired domains by keyword',
				name: 'keyword',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getExpiredDomains'],
					},
				},
			},

			// Date From/To for domain history operations
			{
				displayName: 'Date From',
				description: 'Date in YYYY-MM-DD format',
				name: 'dateFrom',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getDomainPositionHistory', 'getHistoryOfDomainPages'],
					},
				},
			},
			{
				displayName: 'Date To',
				description: 'Date in YYYY-MM-DD format',
				name: 'dateTo',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getDomainPositionHistory', 'getHistoryOfDomainPages'],
					},
				},
			},

			// Mode for Site Explorer operations
			{
				displayName: 'Mode',
				description: 'Search mode (domain, root_domain, or url)',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'Domain', value: 'domain' },
					{ name: 'Root Domain', value: 'root_domain' },
					{ name: 'URL', value: 'url' },
				],
				default: 'domain',
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: [
							'compareDomainKeywordsWithCompetitors',
							'getCompetitorBestPages',
							'getCompetitorsKeywordsBestPosition',
							'getDomainCategoriesBasedOnGMBBacklinks',
							'getDomainCompetitors',
							'getDomainDataInBulk',
							'getDomainGMBBacklinksMap',
							'getDomainOverview',
							'getDomainPositionHistory',
							'getDomainTopPages',
							'getGMBBacklink',
							'getHistoryOfDomainPages',
							'getKeywordDataFromURL',
							'getRankingOfDomainKeyword',
							'getVisibilityTrendOfDomains',
						],
					},
				},
			},

			// Requested Data for Domain Overview
			{
				displayName: 'Requested Data',
				description: 'Requested data for the given URL or domain.',
				name: 'requestedData',
				type: 'multiOptions',
				options: [
					{ name: 'Best Keywords', value: 'best_keywords' },
					{ name: 'Best Pages', value: 'best_pages' },
					{ name: 'Categories', value: 'categories' },
					{ name: 'GMB Backlinks', value: 'gmb_backlinks' },
					{ name: 'Metrics', value: 'metrics' },
					{ name: 'Positions and Pages History', value: 'positions_and_pages_history' },
					{ name: 'Positions Breakdown', value: 'positions_breakdown' },
					{ name: 'Positions Breakdown History', value: 'positions_breakdown_history' },
					{ name: 'Traffic Value', value: 'traffic_value' },
					{ name: 'Visibility Index History', value: 'visibility_index_history' },
				],
				default: [],
				required: true,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getDomainOverview'],
					},
				},
			},

			// Language for Domain Overview
			{
				displayName: 'Language',
				description: "Only used in conjunction with 'categories' in 'requested_data'.",
				name: 'lang',
				type: 'options',
				options: [
					{ name: 'English', value: 'en' },
					{ name: 'French', value: 'fr' },
				],
				default: 'en',
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getDomainOverview'],
					},
				},
			},

			// Strategy for Best Keywords From Page
			{
				displayName: 'Strategy',
				description: 'Whether to return all positioned keywords, only active ones or only lost ones',
				name: 'strategy',
				type: 'options',
				options: [
					{ name: 'Both Active & Lost Keywords', value: 'both' },
					{ name: 'Only Active Keywords', value: 'only_active' },
					{ name: 'Only Lost Keywords', value: 'only_lost' },
				],
				default: 'both',
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getBestKeywordsFromPage', 'getCompetitorBestPages'],
					},
				},
			},

			// Boolean filters for Compare Domain Keywords
			{
				displayName: 'Missing',
				description: 'Include positions where the search input is not positioned, but at least one competitor is',
				name: 'missing',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['compareDomainKeywordsWithCompetitors'],
					},
				},
			},
			{
				displayName: 'Besting',
				description: 'Include positions where the search input is positioned better than at least one competitor',
				name: 'besting',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['compareDomainKeywordsWithCompetitors'],
					},
				},
			},
			{
				displayName: 'Bested',
				description: 'Include positions where the search input is positioned, but at least one competitor is better',
				name: 'bested',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['compareDomainKeywordsWithCompetitors'],
					},
				},
			},
			{
				displayName: 'Exclusive',
				description: 'Include positions where only the search input is positioned, and none of the competitors',
				name: 'exclusive',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['compareDomainKeywordsWithCompetitors'],
					},
				},
			},

			// Accepted Types for Compare Domain Keywords
			{
				displayName: 'Accepted Types',
				description: 'Filter by comparison type',
				name: 'acceptedTypes',
				type: 'multiOptions',
				options: [
					{ name: 'Auto', value: 'auto' },
					{ name: 'Bested', value: 'bested' },
					{ name: 'Besting', value: 'besting' },
					{ name: 'Exclusive', value: 'exclusive' },
					{ name: 'Missing', value: 'missing' },
					{ name: 'Mixed', value: 'mixed' },
				],
				default: ['auto'],
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['compareDomainKeywordsWithCompetitors'],
					},
				},
			},

			// Type for Visibility Trend
			{
				displayName: 'Type',
				description: 'Type of visibility trend',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Positions Breakdown', value: 'positions_breakdown' },
					{ name: 'Visibility Index', value: 'visibility_index' },
				],
				default: 'visibility_index',
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
						operation: ['getVisibilityTrendOfDomains'],
					},
				},
			},

			// ==========================================
			// SHARED PAGINATION PARAMETERS
			// ==========================================

			// Order By (varies by operation)
			{
				displayName: 'Order By',
				description: 'Field used for sorting results',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'Default', value: 'default' },
					{ name: 'Allintitle', value: 'allintitle' },
					{ name: 'Competition', value: 'competition' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'Keyword', value: 'keyword' },
					{ name: 'KGR', value: 'kgr' },
					{ name: 'Volume', value: 'volume' },
				],
				default: 'default',
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: [
							'findKeyword',
							'findKeywordSynonym',
							'findKeywordsMatch',
							'findRelatedKeyword',
							'findSimilarKeyword',
							'getKeywordDataInBulk',
							'getKeywordHighlight',
							'getKeywordQuestion',
						],
					},
				},
			},

			// Order (asc/desc)
			{
				displayName: 'Order',
				description: 'Sort order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				displayOptions: {
					show: {
						resource: ['keywordExplorer', 'siteExplorer'],
					},
				},
			},

			// Line Count
			{
				displayName: 'Line Count',
				description: 'Number of results to return',
				name: 'lineCount',
				type: 'number',
				default: 100,
				displayOptions: {
					show: {
						resource: ['keywordExplorer', 'siteExplorer'],
					},
				},
			},

			// Page
			{
				displayName: 'Page',
				description: 'Page number for pagination',
				name: 'page',
				type: 'number',
				default: 1,
				displayOptions: {
					show: {
						resource: ['keywordExplorer', 'siteExplorer'],
					},
				},
			},

			// ==========================================
			// ADDITIONAL FIELDS (Collections)
			// ==========================================

			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['keywordExplorer'],
						operation: [
							'findKeyword',
							'findKeywordSynonym',
							'findKeywordsMatch',
							'findRelatedKeyword',
							'findSimilarKeyword',
							'getKeywordDataInBulk',
							'getKeywordHighlight',
							'getKeywordQuestion',
						],
					},
				},
				options: [
					{
						displayName: 'Allintitle Max',
						name: 'allintitle_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Allintitle Min',
						name: 'allintitle_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Competition Max',
						name: 'competition_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Competition Min',
						name: 'competition_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'CPC Max',
						name: 'cpc_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'CPC Min',
						name: 'cpc_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Exclude',
						name: 'exclude',
						type: 'string',
						default: '',
						description: 'Keywords to exclude from results',
					},
					{
						displayName: 'Include',
						name: 'include',
						type: 'string',
						default: '',
						description: 'Keywords to include in results',
					},
					{
						displayName: 'KGR Max',
						name: 'kgr_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'KGR Min',
						name: 'kgr_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'KVI Keep NA',
						name: 'kvi_keep_na',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'KVI Max',
						name: 'kvi_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'KVI Min',
						name: 'kvi_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Volume Max',
						name: 'volume_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Volume Min',
						name: 'volume_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Word Count Max',
						name: 'word_count_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Word Count Min',
						name: 'word_count_min',
						type: 'number',
						default: '',
					},
				],
			},

			// Additional Fields for Site Explorer operations
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['siteExplorer'],
					},
				},
				options: [
					{
						displayName: 'Allintitle Keep NA',
						name: 'allintitle_keep_na',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'Allintitle Max',
						name: 'allintitle_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Allintitle Min',
						name: 'allintitle_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Competition Keep NA',
						name: 'competition_keep_na',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'Competition Max',
						name: 'competition_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Competition Min',
						name: 'competition_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'CPC Keep NA',
						name: 'cpc_keep_na',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'CPC Max',
						name: 'cpc_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'CPC Min',
						name: 'cpc_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Keyword Exclude',
						name: 'keyword_exclude',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Keyword Include',
						name: 'keyword_include',
						type: 'string',
						default: '',
					},
					{
						displayName: 'KGR Keep NA',
						name: 'kgr_keep_na',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'KGR Max',
						name: 'kgr_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'KGR Min',
						name: 'kgr_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'KVI Keep NA',
						name: 'kvi_keep_na',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'KVI Max',
						name: 'kvi_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'KVI Min',
						name: 'kvi_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Order',
						name: 'order',
						type: 'options',
						options: [
							{ name: 'Ascending', value: 'asc' },
							{ name: 'Descending', value: 'desc' },
						],
						default: 'desc',
					},
					{
						displayName: 'Position Max',
						name: 'position_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Position Min',
						name: 'position_min',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Volume Keep NA',
						name: 'volume_keep_na',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'Volume Max',
						name: 'volume_max',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Volume Min',
						name: 'volume_min',
						type: 'number',
						default: '',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[];

				// ==========================================
				// USER RESOURCE
				// ==========================================
				if (resource === 'user') {
					if (operation === 'getUserCredit') {
						responseData = await haloscanApiRequest.call(this, 'GET', '/user/credit');
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, { itemIndex: i });
					}
				}

				// ==========================================
				// KEYWORD EXPLORER RESOURCE
				// ==========================================
				else if (resource === 'keywordExplorer') {
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

					if (operation === 'compareKeywordsSERP') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const period = this.getNodeParameter('period', i) as string;

						const body: IDataObject = {
							keyword,
							period,
						};

						if (period === 'custom') {
							body.first_date = this.getNodeParameter('firstDate', i) as string;
							body.second_date = this.getNodeParameter('secondDate', i) as string;
						}

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/serp/compare',
							removeEmptyValues(body),
						);
					} else if (operation === 'findKeyword') {
						const keyword = this.getNodeParameter('keyword', i, '') as string;
						const keywordsFindKeyword = this.getNodeParameter('keywordsFindKeyword', i, []) as string | string[];
						const keywordsSources = this.getNodeParameter('keywordsSources', i, []) as string[];
						const keepSeed = this.getNodeParameter('keepSeed', i, true) as boolean;
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keep_seed: keepSeed,
							exact_match: exactMatch,
							lineCount,
							page,
							order,
							order_by: orderBy,
							keywords_sources: keywordsSources,
						};

						if (keyword) {
							body.keyword = keyword;
						}
						// Convert keywords to array - handles both single values and mapped arrays
						const keywordsArray = toArray(keywordsFindKeyword);
						if (keywordsArray.length > 0) {
							body.keywords = keywordsArray;
						}

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/find',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'findKeywordSynonym') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keyword,
							exact_match: exactMatch,
							lineCount,
							page,
							order,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/synonyms',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'findKeywordsMatch') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keyword,
							exact_match: exactMatch,
							lineCount,
							page,
							order,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/match',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'findRelatedKeyword') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const depthMin = this.getNodeParameter('depthMin', i, '') as number | string;
						const depthMax = this.getNodeParameter('depthMax', i, '') as number | string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keyword,
							exact_match: exactMatch,
							depth_min: depthMin,
							depth_max: depthMax,
							lineCount,
							page,
							order,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/related',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'findSimilarKeyword') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const similarityMin = this.getNodeParameter('similarityMin', i, 0) as number;
						const similarityMax = this.getNodeParameter('similarityMax', i, 100) as number;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keyword,
							similarity_min: similarityMin,
							similarity_max: similarityMax,
							lineCount,
							page,
							order,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/similar',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getKeywordDataInBulk') {
						const keywords = this.getNodeParameter('keywords', i) as string | string[];
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'keep') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keywords: toArray(keywords),
							exact_match: exactMatch,
							lineCount,
							page,
							order,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/bulk',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getKeywordHighlight') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const similarityMin = this.getNodeParameter('similarityMin', i, 0) as number;
						const similarityMax = this.getNodeParameter('similarityMax', i, 100) as number;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keyword,
							exact_match: exactMatch,
							similarity_min: similarityMin,
							similarity_max: similarityMax,
							lineCount,
							page,
							order,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/highlights',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getKeywordOverview') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const requestedData = this.getNodeParameter('requestedData', i, []) as string[];
						const lang = this.getNodeParameter('lang', i, 'en') as string;

						const body: IDataObject = {
							keyword,
							requested_data: requestedData,
							lang,
						};

						// FIX: The original v1 had a bug with missing leading slash
						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/overview',
							removeEmptyValues(body),
						);
					} else if (operation === 'getKeywordQuestion') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const keepOnlyPaa = this.getNodeParameter('keepOnlyPaa', i, true) as boolean;
						const questionTypes = this.getNodeParameter('questionTypes', i, []) as string[];
						const depthMin = this.getNodeParameter('depthMin', i, '') as number | string;
						const depthMax = this.getNodeParameter('depthMax', i, '') as number | string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;
						const order = this.getNodeParameter('order', i, 'desc') as string;

						const body: IDataObject = {
							keyword,
							exact_match: exactMatch,
							keep_only_paa: keepOnlyPaa,
							question_types: questionTypes,
							depth_min: depthMin,
							depth_max: depthMax,
							lineCount,
							page,
							order,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/questions',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getKeywordAvailableDatesFromSERP') {
						const keyword = this.getNodeParameter('keyword', i) as string;

						const body: IDataObject = {
							keyword,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/serp/availableDates',
							body,
						);
					} else if (operation === 'getKeywordSERPPageEvolution') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const firstDate = this.getNodeParameter('firstDate', i) as string;
						const secondDate = this.getNodeParameter('secondDate', i) as string;
						const url = this.getNodeParameter('url', i) as string;

						const body: IDataObject = {
							keyword,
							first_date: firstDate,
							second_date: secondDate,
							url,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/serp/pageEvolution',
							removeEmptyValues(body),
						);
					} else if (operation === 'getKeywordSiteStructure') {
						const keyword = this.getNodeParameter('keyword', i, '') as string;
						const keywordsSiteStructure = this.getNodeParameter('keywordsSiteStructure', i, []) as string | string[];
						const exactMatch = this.getNodeParameter('exactMatch', i, true) as boolean;
						const mode = this.getNodeParameter('mode', i, 'multi') as string;
						const granularity = this.getNodeParameter('granularity', i, 1) as number;
						const multipartiteModes = this.getNodeParameter('multipartiteModes', i, []) as string[];
						const neighboursSources = this.getNodeParameter('neighboursSources', i, []) as string[];
						const neighboursSampleMaxSize = this.getNodeParameter('neighboursSampleMaxSize', i, 1000) as number;
						const manualCommon10 = this.getNodeParameter('manualCommon10', i, 2) as number;
						const manualCommon100 = this.getNodeParameter('manualCommon100', i, 10) as number;

						const body: IDataObject = {
							exact_match: exactMatch,
							mode,
							granularity,
							multipartite_modes: multipartiteModes,
							neighbours_sources: neighboursSources,
							neighbours_sample_max_size: neighboursSampleMaxSize,
							manual_common_10: manualCommon10,
							manual_common_100: manualCommon100,
						};

						// Always send keywords as array - API requires array format
						const keywordsArray = toArray(keywordsSiteStructure);
						if (keywordsArray.length > 0) {
							body.keywords = keywordsArray;
						} else if (keyword) {
							// Wrap single keyword in array
							body.keyword = keyword;
						}

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/siteStructure',
							removeEmptyValues(body),
						);
					} else if (operation === 'scrapKeyword') {
						const keywords = this.getNodeParameter('keywords', i) as string | string[];

						const body: IDataObject = {
							keywords: toArray(keywords),
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/keywords/scrap',
							body,
						);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, { itemIndex: i });
					}
				}

				// ==========================================
				// SITE EXPLORER RESOURCE
				// ==========================================
				else if (resource === 'siteExplorer') {
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
					const mode = this.getNodeParameter('mode', i, 'domain') as string;

					if (operation === 'compareDomainKeywordsWithCompetitors') {
						const input = this.getNodeParameter('input', i) as string;
						const competitors = this.getNodeParameter('competitors', i, []) as string | string[];
						const missing = this.getNodeParameter('missing', i, false) as boolean;
						const besting = this.getNodeParameter('besting', i, false) as boolean;
						const bested = this.getNodeParameter('bested', i, false) as boolean;
						const exclusive = this.getNodeParameter('exclusive', i, false) as boolean;
						const acceptedTypes = this.getNodeParameter('acceptedTypes', i, ['auto']) as string[];
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;

						const body: IDataObject = {
							input,
							competitors: toArray(competitors),
							mode,
							missing,
							besting,
							bested,
							exclusive,
							acceptedTypes,
							lineCount,
							page,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/siteCompetitors/keywordsDiff',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getBestKeywordsFromPage') {
						const inputs = this.getNodeParameter('inputs', i) as string | string[];
						const strategy = this.getNodeParameter('strategy', i, 'both') as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;

						const body: IDataObject = {
							input: toArray(inputs),
							strategy,
							lineCount,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/pageBestKeywords',
							removeEmptyValues(body),
						);
					} else if (operation === 'getCompetitorBestPages') {
						const input = this.getNodeParameter('input', i) as string;
						const competitors = this.getNodeParameter('competitors', i, []) as string | string[];
						const strategy = this.getNodeParameter('strategy', i, 'both') as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							input,
							competitors: toArray(competitors),
							mode,
							strategy,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/siteCompetitors/bestPages',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getCompetitorsKeywordsBestPosition') {
						const competitors = this.getNodeParameter('competitors', i, []) as string | string[];
						const keywords = this.getNodeParameter('keywords', i, []) as string | string[];
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							competitors: toArray(competitors),
							keywords: toArray(keywords),
							mode,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/siteCompetitors/keywordsBestPos',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getDomainCategoriesBasedOnGMBBacklinks') {
						const input = this.getNodeParameter('input', i) as string;

						const body: IDataObject = {
							input,
							mode,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/gmbBacklinks/categories',
							body,
						);
					} else if (operation === 'getDomainCompetitors') {
						const input = this.getNodeParameter('input', i) as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;

						const body: IDataObject = {
							input,
							mode,
							lineCount,
							page,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/siteCompetitors',
							body,
						);
					} else if (operation === 'getDomainDataInBulk') {
						const inputs = this.getNodeParameter('inputs', i) as string | string[];
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							inputs: toArray(inputs),
							mode,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/bulk',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getDomainGMBBacklinksMap') {
						const input = this.getNodeParameter('input', i) as string;

						const body: IDataObject = {
							input,
							mode,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/gmbBacklinks/map',
							body,
						);
					} else if (operation === 'getDomainOverview') {
						const input = this.getNodeParameter('input', i) as string;
						const requestedData = this.getNodeParameter('requestedData', i, []) as string[];
						const lang = this.getNodeParameter('lang', i, 'en') as string;

						const body: IDataObject = {
							input,
							mode,
							requested_data: requestedData,
							lang,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/overview',
							removeEmptyValues(body),
						);
					} else if (operation === 'getDomainPositionHistory') {
						const input = this.getNodeParameter('input', i) as string;
						const dateFrom = this.getNodeParameter('dateFrom', i) as string;
						const dateTo = this.getNodeParameter('dateTo', i) as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							input,
							mode,
							date_from: dateFrom,
							date_to: dateTo,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/history',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getDomainTopPages') {
						const input = this.getNodeParameter('input', i) as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							input,
							mode,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/topPages',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getExpiredDomains') {
						const keyword = this.getNodeParameter('keyword', i, '') as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							lineCount,
							page,
							order_by: orderBy,
						};

						if (keyword) {
							body.keyword = keyword;
						}

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/expired',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getGMBBacklink') {
						const input = this.getNodeParameter('input', i) as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							input,
							mode,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/gmbBacklinks',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getHistoryOfDomainPages') {
						const input = this.getNodeParameter('input', i) as string;
						const dateFrom = this.getNodeParameter('dateFrom', i) as string;
						const dateTo = this.getNodeParameter('dateTo', i) as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							input,
							mode,
							date_from: dateFrom,
							date_to: dateTo,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/pagesHistory',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getKeywordDataFromURL') {
						const input = this.getNodeParameter('input', i) as string;
						const keywords = this.getNodeParameter('keywords', i, []) as string | string[];
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							input,
							keywords: toArray(keywords),
							mode,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/keywords',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getRankingOfDomainKeyword') {
						const input = this.getNodeParameter('input', i) as string;
						const lineCount = this.getNodeParameter('lineCount', i, 100) as number;
						const page = this.getNodeParameter('page', i, 1) as number;
						const orderBy = this.getNodeParameter('orderBy', i, 'default') as string;

						const body: IDataObject = {
							input,
							mode,
							lineCount,
							page,
							order_by: orderBy,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/positions',
							removeEmptyValues(mergeAdditionalFields(body, additionalFields)),
						);
					} else if (operation === 'getVisibilityTrendOfDomains') {
						const inputs = this.getNodeParameter('inputs', i) as string | string[];
						const type = this.getNodeParameter('type', i, 'visibility_index') as string;

						const body: IDataObject = {
							input: toArray(inputs),
							mode,
							type,
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/history/visibilityTrends',
							body,
						);
					} else if (operation === 'revealExpiredDomains') {
						const rootDomainKeys = this.getNodeParameter('rootDomainKeys', i) as string | string[];

						// FIX: Properly convert to integer array instead of calling .toInt() on string
						const body: IDataObject = {
							root_domain_keys: toIntArray(rootDomainKeys),
						};

						responseData = await haloscanApiRequest.call(
							this,
							'POST',
							'/domains/expired/reveal',
							body,
						);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, { itemIndex: i });
					}
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`, { itemIndex: i });
				}

				// Handle response data
				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map((item) => ({ json: item })));
				} else {
					returnData.push({ json: responseData });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

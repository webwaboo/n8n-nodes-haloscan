import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Haloscan implements INodeType {
	description: INodeTypeDescription = { // Basic node details will go here
		//name displayed under the node
		displayName: 'Haloscan',
		//name of node for the system
		name: 'haloscan',
		//path to the icon
		icon: 'file:Haloscan_logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		//description of the node
		description: 'Haloscan is a powerful SEO analysis tool that provides insights into keyword rankings, domain metrics, and related searches.',
		//default name, just a the same as in displayName
		defaults: {
			name: 'Haloscan',
		},
		inputs: ['main'],
		outputs: ['main'],
		//name your credentials "mynodenameApi"
		credentials: [
			{
				name: 'haloscanApi',
				required: true,
			},
		],
		requestDefaults: {
			//put your base url here
			baseURL: 'https://api.haloscan.com/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
},
		properties: [ //resource and operation will go here
		// Resources will go here, 1 group = 1 resource
		{
			displayName: 'Resource',
			name: 'resource',
			//type if the type of UI element to display, here we choose for a dropdown
			type: 'options',
			noDataExpression: true,
			// in the dropdown, we put name of the different options/resources
			options: [
				{
					//name displayed in dropdown
					name: 'User',
					//name for the system
					value: 'user',
				},
				{
					//name displayed in dropdown
					name: 'Keyword Explorer',
					//name for the system
					value: 'keywordExplorer',
				},
				{
					//name displayed in dropdown
					name: 'Site Explorer',
					//name for the system
					value: 'siteExplorer',
				},
			],
			//default option displayed
			default: 'keywordExplorer',
		},

		// All operations for <User>
		{
			displayName: 'Operation',
			name: 'operation',
			// Display the operations in a dropdown
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					// select the resource corresponding to the endpoint
					resource: [
						'user',
					],
				},
			},
			options: [
				// Operation : GetaUserCredit
				{
					name: 'Get User Credit',
					value: 'GetUserCredit',
					action: 'Get user credit',
					description: 'Retrieves the remaining credit for the current user',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/user/credit',
						},
					},
				},
			],
			//default option displayed
			default: 'GetUserCredit',
		},

		// All operations for <keywordExplorer>
		{
			displayName: 'Operation',
			name: 'operation',
			// Display the operations in a dropdown
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					// select the resource corresponding to the endpoint
					resource: [
						'keywordExplorer',
					],
				},
			},
			options: [
				// Operation : CompareKeywordsSERP
				{
					name: 'Compare Keywords SERP',
					value: 'CompareKeywordsSERP',
					action: 'Compare keywords SERP',
					description: 'Compares SERPs for a given keyword',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/serp/compare',
							body: {

							}
						},
					},
				},
				// Operation : FindKeyword
				{
					name: 'Find Keyword',
					value: 'FindKeyword',
					action: 'Find keyword',
					description: 'Finds keywords based on a seed',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/find',
							body: {

							}
						},
					},
				},
				// Operation : FindKeywordSynonym
				{
					name: 'Find Keyword Synonym',
					value: 'FindaKeywordSynonym',
					action: 'Find keyword synonym',
					description: 'Finds synonyms for a keyword',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/synonyms',
							body: {

							}
						},
					},
				},
				// Operation : FindKeywordsMatch
				{
					name: 'Find Keywords Match',
					value: 'FindKeywordsMatch',
					action: 'Find keywords match',
					description: 'Finds a keyword or expression containing a given seed keyword',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/match',
							body: {
								keyword: '={{$parameter.host}}',
								lineCount: '={{$parameter.nameProject}}',
								page: '={{$parameter.page}}',
								order_by: '={{$parameter.order_by}}',
								order: '={{$parameter.order}}',
								exact_match: '={{$parameter.exact_match}}',
								volume_min: '={{$parameter.volume_min}}',
								volume_max: '={{$parameter.volume_max}}',
								cpc_min: '={{$parameter.cpc_min}}',
								cpc_max: '={{$parameter.cpc_max}}',
								competition_min: '={{$parameter.competition_min}}',
								competition_max: '={{$parameter.competition_max}}',
								kgr_min: '={{$parameter.kgr_min}}',
								kgr_max: '={{$parameter.kgr_max}}',
								kvi_min: '={{$parameter.kvi_min}}',
								kvi_max: '={{$parameter.kvi_max}}',
								kvi_keep_na: '={{$parameter.kvi_keep_na}}',
								allintitle_min: '={{$parameter.allintitle_min}}',
								allintitle_max: '={{$parameter.allintitle_max}}',
								word_count_min: '={{$parameter.word_count_min}}',
								word_count_max: '={{$parameter.word_count_max}}',
								include: '={{$parameter.include}}',
								exclude: '={{$parameter.exclude}}',
							}
						},
					},
				},
				// Operation : FindRelatedKeyword
				{
					name: 'Find Related Keyword',
					value: 'FindRelatedKeyword',
					action: 'Find related keyword',
					description: 'Finds similar keywords or expressions, based on SERP\'s \"Related Searches\"',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/related',
							body: {

							}
						},
					},
				},
				// Operation : FindSimilarKeyword
				{
					name: 'Find Similar Keyword',
					value: 'FindSimilarKeyword',
					action: 'Find similar keyword',
					description: 'Finds keywords with the same categories as the seed keywords',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/similar',
							body: {

							}
						},
					},
				},
				// Operation : GetKeywordDatainBulk
				{
					name: 'Get Keyword Data in Bulk',
					value: 'GetKeywordDatainBulk',
					action: 'Get keyword data in bulk',
					description: 'Retrieves a keyword data in bulk',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/bulk',
							body: {

							}
						},
					},
				},
				// Operation : GetKeywordHighlight
				{
					name: 'Get Keyword Highlight',
					value: 'GetKeywordHighlight',
					action: 'Get keyword highlight',
					description: 'Identifies keywords for which the same expressions are highlighted in SERPs',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/highlights',
							body: {

							}
						},
					},
				},
				// Operation : GetKeywordOverview
				{
					name: 'Get Keyword Overview',
					value: 'GetKeywordOverview',
					action: 'Get keyword overview',
					description: 'Retrieves an SEO overview for a keyword',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=keywords/overview',
							body: {
								keyword: '={{$parameter.keyword}}',
								requested_data: '={{$parameter.requested_data}}',
								lang: '={{$parameter.lang}}',
							}
						},
					},
				},
				// Operation : GetKeywordQuestion
				{
					name: 'Get Keyword Question',
					value: 'GetKeywordQuestion',
					action: 'Get keyword question',
					description: 'Retrieves popular questions and PAA queries related to a keyword',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/questions',
							body: {

							}
						},
					},
				},
				// Operation : GetKeywordAvailableDatesfromSERP
				{
					name: 'Get Keyword\'s Available Dates From SERP',
					value: 'GetKeywordAvailableDatesfromSERP',
					action: 'Get keyword available dates from serp',
					description: 'Identifies keywords for which the same expressions are highlighted in SERPs',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/serp/availableDates',
							body: {

							}
						},
					},
				},
				// Operation : GetKeywordSERPPageEvolution
				{
					name: 'Get Keyword\'s SERP Page Evolution',
					value: 'GetKeywordSERPPageEvolution',
					action: 'Get keyword SERP page evolution',
					description: 'Tracks a specific URL\'s ranking history for a given keyword between two dates',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/serp/pageEvolution',
							body: {

							}
						},
					},
				},
				// Operation : GetKeywordSiteStructure
				{
					name: 'Get Keyword\'s Site Structure',
					value: 'GetKeywordSiteStructure',
					action: 'Get keyword site structure',
					description: 'Analyzes keyword relationships and groups them based on shared statistics',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/siteStructure',
							body: {

							}
						},
					},
				},
				// Operation : ScrapKeyword
				{
					name: 'Scrap Keyword',
					value: 'ScrapKeyword',
					action: 'Scrap keyword',
					description: 'Refreshes keyword data, including SERP, Ads metrics and All in Title when necessary',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/scrap',
							body: {

							}
						},
					},
				},

			],
			//default option displayed
			default: 'GetKeywordOverview',
		},

		// All operations for <siteExplorer>
		{
			displayName: 'Operation',
			name: 'operation',
			// Display the operations in a dropdown
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				// select the resource corresponding to the endpoint
				show: {
					resource: ['siteExplorer'],
				},
			},
			options: [
				// Operation : getPhotos
				{
					name: 'Get Photos',
					value: 'getPhotos',
					action: 'Get Mars Rover photos',
					description: 'Get photos from the Mars Rover',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
						},
					},
				},
				// Operation : generateQuestionsBasedonGuideWords
				{
					name: 'Generate Questions Based on Guide Words',
					value: 'generateQuestionsBasedonGuideWords',
					action: 'Generate questions based on guide words',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/seotxl/questions',
						},
					},
				},
			],
			default: 'get',
		},


		// parameter : first_date
		{
			displayName: 'First Date',
			description: 'Date in YYYY-MM-DD format',
			required: true,
			name: 'first_date',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSERPPageEvolution'],
				},
			},
		},
		// parameter : first_date_optional
		{
			displayName: 'First Date',
			description: 'Date in YYYY-MM-DD format. Only used if period = custom.',
			name: 'first_date_optional',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['CompareKeywordsSERP'],
				},
			},
		},
		// parameter : keyword
		{
			displayName: 'Keyword',
			description: 'Requested keyword',
			required: true,
			name: 'keyword',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'CompareKeywordsSERP',
						'FindKeywordSynonym',
						'FindKeywordsMatch',
						'FindRelatedKeyword',
						'FindSimilarKeyword',
						'GetKeywordHighlight',
						'GetKeywordOverview',
						'GetKeywordQuestion',
						'GetKeywordAvailableDatesfromSERP',
						'GetKeywordSERPPageEvolution'
					],
				},
			},
		},
		// parameter : keyword_bulk
		{
			displayName: 'Keyword',
			description: 'Requested keyword, ignored if keywords (bulk) is present',
			name: 'keyword_bulk',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : keyword_findKeyword
		{
			displayName: 'Keyword',
			description: 'Requested keyword. Use to find a single keyword, or keywords to look for several keywords at once.',
			name: 'keyword_findKeyword',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['FindKeyword'],
				},
			},
		},
		// parameter : keywords
		{
			displayName: 'Keywords',
			description: 'Array containing the requested keywords',
			required: true,
			name: 'keywords',
			type: 'string',
			default: [],
			typeOptions: {
				multipleValues: true
			},
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'GetKeywordDatainBulk',
						'ScrapKeyword',
					],
				},
			},
		},
		// parameter : keywords_findKeyword
		{
			displayName: 'Keywords',
			description: 'Requested keywords, ignore if keyword is present',
			name: 'keywords_findKeyword',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['FindKeyword'],
				},
			},
		},
		// parameter : keywords_SiteStructure
		{
			displayName: 'Keywords',
			description: 'Requested keywords in an array if requesting bulk data. Must contain at least 50 keywords.',
			name: 'keywords_SiteStructure',
			type: 'string',
			default: [],
			typeOptions: {
				multipleValues: true
			},
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : keywords_sources
		{
			displayName: 'Keyword Sources',
			description: 'Which strategies to use to find keywords from input',
			name: 'keywords_sources',
			type: 'multiOptions',
			options: [
				{ "name": "Match", "value": "match" },
				{ "name": "Serp", "value": "serp" },
				{ "name": "Related", "value": "related" },
				{ "name": "Highlights", "value": "highlights" },
				{ "name": "Categories", "value": "categories" },
				{ "name": "Questions", "value": "questions" }
			],
			default: ['serp','related'],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['FindKeyword'],
				},
			},
		},



		// Optional/additional fields will go here, always in type collection
		// you can have multiple "Additional Fields" each displayed for specific resource/operation
		/* additional fields for:
						FindKeyword
						FindKeywordSynonym
						FindKeywordsMatch
						FindRelatedKeyword
						FindSimilarKeyword
						GetKeywordDatainBulk
						GetKeywordHighlight
						GetKeywordQuestion*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindKeyword',
						'FindKeywordSynonym',
						'FindKeywordsMatch',
						'FindRelatedKeyword',
						'FindSimilarKeyword',
						'GetKeywordDatainBulk',
						'GetKeywordHighlight',
						'GetKeywordQuestion',
					],
				},
			},
			options: [
				//parameter : allintitle_max
				{
					displayName: 'Maximum Allintitle',
					name: 'allintitle_max',
					type: 'number',
					default: '',
				},
				//parameter : allintitle_min
				{
					displayName: 'Minimum Allintitle',
					name: 'allintitle_min',
					type: 'number',
					default: '',
				},
				//parameter : competition_min
				{
					displayName: 'Minimum Competition',
					description: 'Minimum competition value, between 0 and 1',
					name: 'competition_min',
					type: 'number',
					typeOptions: {
						maxValue: 1,
						minValue: 0,
					},
					default: '',
				},
				//parameter : competition_max
				{
					displayName: 'Maximum Competition',
					description: 'Maximum competition value, between 0 and 1',
					name: 'competition_max',
					type: 'number',
					typeOptions: {
						maxValue: 1,
						minValue: 0,
					},
					default: '',
				},
				//parameter : cpc_max
				{
					displayName: 'Maximum CPC',
					name: 'cpc_max',
					type: 'number',
					default: '',
				},
				//parameter : cpc_min
				{
					displayName: 'Minimum CPC',
					name: 'cpc_mmin',
					type: 'number',
					default: '',
				},
				//parameter : exclude
				{
					displayName: 'Exclude',
					name: 'exclude',
					description: 'Regular expression for keywords to be excluded',
					type: 'string',
					default: '',
				},
				//parameter : include
				{
					displayName: 'Include',
					name: 'include',
					description: 'Regular expression for keywords to be included',
					type: 'string',
					default: '',
				},
				//parameter : kgr_max
				{
					displayName: 'KGR Max',
					name: 'kgr_max',
					type: 'number',
					default: '',
				},
				//parameter : kgr_min
				{
					displayName: 'KGR Min',
					name: 'kgr_min',
					type: 'number',
					default: '',
				},
				//parameter : kvi_keep_na
				{
					displayName: 'KVI Keep NA',
					name: 'kvi_keep_na',
					type: 'boolean',
					default: true,
				},
				//parameter : kvi_max
				{
					displayName: 'KVI Max',
					name: 'kvi_max',
					type: 'number',
					default: '',
				},
				//parameter : kvi_min
				{
					displayName: 'KVI Min',
					name: 'kvi_min',
					type: 'number',
					default: '',
				},
				//parameter : PARAM
				{
					displayName: 'PARAM',
					description: 'Minimum competition value, between 0 and 1',
					name: 'param',
					type: 'number',
					default: '',
				},

			],
		},

		// additional fields for: FindaRelatedKeyword, GetaKeywordQuestion
		{
			displayName: 'Additional Fields',
			name: 'additionalFields2',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindRelatedKeyword',
						'GetKeywordQuestion'
						],
				},
			},
			options: [
				// parameter : depth_min
				{
					displayName: 'Minimum Depth',
					name: 'depth_min',
					type: 'number',
					default: '',
				},
				// parameter : depth_max
				{
					displayName: 'Maximum Depth',
					name: 'depth_max',
					type: 'number',
					default: '',
				},

			],
		},

		/* additional fields for:
						FindKeyword
						FindKeywordSynonym
						FindKeywordsMatch
						FindRelatedKeyword
						GetKeywordDatainBulk
						GetKeywordHighlight
						GetKeywordQuestion
						GetKeywordSiteStructure*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields3',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindKeyword',
						'FindKeywordSynonym',
						'FindKeywordsMatch',
						'FindRelatedKeyword',
						'GetKeywordDatainBulk',
						'GetKeywordHighlight',
						'GetKeywordQuestion',
						'GetKeywordSiteStructure',
					],
				},
			},
			options: [
				// parameter : exact_match
				{
					displayName: 'Exact Match',
					description: 'Whether always ignore accents, punctuation, case, special characters, etc when FALSE. when matching the seed keyword.',
					name: 'exact_match',
					type: 'boolean',
					default: true,
				},
			],
		},

		/* additional fields for:
			 		GetKeywordSiteStructure*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields4',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
			options: [
				//parameter : granularity
				{
					displayName: 'Granularity',
					description: 'Low granularity will lead to one big group, high granularity will lead to many smaller groups. For reference, Values used by Haloscan\'s UI values are: 0.001 (insufficient), 0.01 (very low), 0.05 (low), 0.1 (mild), 0.25 (average), 0.67 (high), 1 (very high), 10 (excessive). Ignored if mode=manual',
					name: 'granularity',
					type: 'number',
					default: 1,
				},
			],
		},

		/* additional fields for:
			GetKeywordQuestion*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields5',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordQuestion'],
				},
			},
			options: [
				//parameter : keep_only_paa
				{
					displayName: 'Keep Only PAA',
					description: 'Whether to include only PAA (People Also Ask) from google in the response',
					name: 'keep_only_paa',
					type: 'boolean',
					default: true,
				},
			],
		},


		/* additional fields for:
			 		FindKeyword*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields6',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['FindKeyword'],
				},
			},
			options: [
				//parameter : keep_seed
				{
					displayName: 'Keep Seed',
					description: 'Whether to keep the input in the api\'s response',
					name: 'keep_seed',
					type: 'boolean',
					default: true,
				},
			],
		},

		/* additional fields for:
			 		TEMPLATE*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSERPPageEvolution'],
				},
			},
			options: [
				//parameter : PARAM
				{
					displayName: 'PARAM',
					description: 'Minimum competition value, between 0 and 1',
					name: 'param',
					type: 'number',
					default: '',
				},
			],
		},

		]
	};
}

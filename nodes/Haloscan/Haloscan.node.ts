import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Haloscan implements INodeType {
	description: INodeTypeDescription = { // Basic node details will go here
		//name displayed under the node
		displayName: 'Haloscan',
		//name of node for the system
		name: 'haloscan',
		//path to the icon
		icon: 'file:haloscan_bleu.svg',
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
								keyword: '={{$parameter.keyword}}',
								period: '={{$parameter.period}}',
								first_date: '={{$parameter.first_date_compare}}',
								second_date: '={{$parameter.second_date_compare}}',
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
								allintitle_max: '={{$parameter.additionalFields_findKeyword.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields_findKeyword.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields_findKeyword.competition_max}}',
								competition_min: '={{$parameter.additionalFields_findKeyword.competition_min}}',
								cpc_max: '={{$parameter.additionalFields_findKeyword.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields_findKeyword.cpc_min}}',
								keep_seed: '={{$parameter.keep_seed}}',
								exact_match: '={{$parameter.exact_match}}',
								exclude: '={{$parameter.additionalFields_findKeyword.exclude}}',
								include: '={{$parameter.additionalFields_findKeyword.include}}',
								keyword: '={{$parameter.keyword_findKeyword}}',
								keywords: '={{$parameter.keywords_findKeyword}}',
								keywords_sources: '={{$parameter.keywords_sources}}',
								kgr_max: '={{$parameter.additionalFields_findKeyword.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields_findKeyword.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields_findKeyword.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields_findKeyword.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields_findKeyword.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.order}}',
								order_by: '={{$parameter.order_by_findKeyword}}',
								page: '={{$parameter.page}}',
								volume_min: '={{$parameter.additionalFields_findKeyword.volume_min}}',
								volume_max: '={{$parameter.additionalFields_findKeyword.volume_max}}',
							}
						},
					},
				},
				// Operation : FindKeywordSynonym
				{
					name: 'Find Keyword Synonym',
					value: 'FindKeywordSynonym',
					action: 'Find keyword synonym',
					description: 'Finds synonyms for a keyword',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/keywords/synonyms',
							body: {
								allintitle_max: '={{$parameter.additionalFields.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields.competition_max}}',
								competition_min: '={{$parameter.additionalFields.competition_min}}',
								cpc_max: '={{$parameter.additionalFields.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields.cpc_min}}',
								exact_match: '={{$parameter.exact_match}}',
								exclude: '={{$parameter.additionalFields.exclude}}',
								include: '={{$parameter.additionalFields.include}}',
								keyword: '={{$parameter.keyword}}',
								kgr_max: '={{$parameter.additionalFields.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.additionalFields.order}}',
								order_by: '={{$parameter.order_by_findSynoMatch}}',
								page: '={{$parameter.page}}',
								volume_max: '={{$parameter.additionalFields.volume_max}}',
								volume_min: '={{$parameter.additionalFields.volume_min}}',
								word_count_max: '={{$parameter.additionalFields.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields.word_count_min}}',
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
								allintitle_max: '={{$parameter.additionalFields.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields.competition_max}}',
								competition_min: '={{$parameter.additionalFields.competition_min}}',
								cpc_max: '={{$parameter.additionalFields.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields.cpc_min}}',
								exact_match: '={{$parameter.exact_match}}',
								exclude: '={{$parameter.additionalFields.exclude}}',
								include: '={{$parameter.additionalFields.include}}',
								keyword: '={{$parameter.keyword}}',
								kgr_max: '={{$parameter.additionalFields.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.additionalFields.order}}',
								order_by: '={{$parameter.order_by_findSynoMatch}}',
								page: '={{$parameter.page}}',
								volume_max: '={{$parameter.additionalFields.volume_max}}',
								volume_min: '={{$parameter.additionalFields.volume_min}}',
								word_count_max: '={{$parameter.additionalFields.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields.word_count_min}}',
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
								allintitle_max: '={{$parameter.additionalFields.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields.competition_max}}',
								competition_min: '={{$parameter.additionalFields.competition_min}}',
								cpc_max: '={{$parameter.additionalFields.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields.cpc_min}}',
								depth_max: '={{$parameter.depth_max}}',
								depth_min: '={{$parameter.depth_min}}',
								exact_match: '={{$parameter.exact_match}}',
								exclude: '={{$parameter.additionalFields.exclude}}',
								include: '={{$parameter.additionalFields.include}}',
								keyword: '={{$parameter.keyword}}',
								kgr_max: '={{$parameter.additionalFields.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.additionalFields.order}}',
								order_by: '={{$parameter.order_by_findRelated}}',
								page: '={{$parameter.page}}',
								volume_max: '={{$parameter.additionalFields.volume_max}}',
								volume_min: '={{$parameter.additionalFields.volume_min}}',
								word_count_max: '={{$parameter.additionalFields.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields.word_count_min}}',
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
								allintitle_max: '={{$parameter.additionalFields_findSimilar.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields_findSimilar.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields_findSimilar.competition_max}}',
								competition_min: '={{$parameter.additionalFields_findSimilar.competition_min}}',
								cpc_max: '={{$parameter.additionalFields_findSimilar.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields_findSimilar.cpc_min}}',
								exclude: '={{$parameter.additionalFields_findSimilar.exclude}}',
								include: '={{$parameter.additionalFields_findSimilar.include}}',
								keyword: '={{$parameter.keyword}}',
								kgr_max: '={{$parameter.additionalFields_findSimilar.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields_findSimilar.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields_findSimilar.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields_findSimilar.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields_findSimilar.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.additionalFields_findSimilar.order}}',
								order_by: '={{$parameter.order_by_findSimilar}}',
								p1_score_max: '={{$parameter.additionalFields_findSimilar.p1_score_max}}',
								p1_score_min: '={{$parameter.additionalFields_findSimilar.p1_score_min}}',
								page: '={{$parameter.page}}',
								score_max: '={{$parameter.additionalFields_findSimilar.score_max}}',
								score_min: '={{$parameter.additionalFields_findSimilar.score_min}}',
								similarity_max: '={{$parameter.similarity_max}}',
								similarity_min: '={{$parameter.similarity_min}}',
								volume_max: '={{$parameter.additionalFields_findSimilar.volume_max}}',
								volume_min: '={{$parameter.additionalFields_findSimilar.volume_min}}',
								word_count_max: '={{$parameter.additionalFields_findSimilar.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields_findSimilar.word_count_min}}',
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
								allintitle_max: '={{$parameter.additionalFields.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields.competition_max}}',
								competition_min: '={{$parameter.additionalFields.competition_min}}',
								cpc_max: '={{$parameter.additionalFields.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields.cpc_min}}',
								exact_match: '={{$parameter.exact_match}}',
								exclude: '={{$parameter.additionalFields.exclude}}',
								include: '={{$parameter.additionalFields.include}}',
								keywords: '={{$parameter.keywords}}',
								kgr_max: '={{$parameter.additionalFields.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.additionalFields.order}}',
								order_by: '={{$parameter.order_by_bulk}}',
								page: '={{$parameter.page}}',
								volume_max: '={{$parameter.additionalFields.volume_max}}',
								volume_min: '={{$parameter.additionalFields.volume_min}}',
								word_count_max: '={{$parameter.additionalFields.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields.word_count_min}}',
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
								allintitle_max: '={{$parameter.additionalFields.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields.competition_max}}',
								competition_min: '={{$parameter.additionalFields.competition_min}}',
								cpc_max: '={{$parameter.additionalFields.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields.cpc_min}}',
								exact_match: '={{$parameter.exact_match}}',
								exclude: '={{$parameter.additionalFields.exclude}}',
								include: '={{$parameter.additionalFields.include}}',
								keyword: '={{$parameter.keyword}}',
								kgr_max: '={{$parameter.additionalFields.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.additionalFields.order}}',
								order_by: '={{$parameter.order_by_highlight}}',
								page: '={{$parameter.page}}',
								similarity_max: '={{$parameter.similarity_max}}',
								similarity_min: '={{$parameter.similarity_min}}',
								volume_max: '={{$parameter.additionalFields.volume_max}}',
								volume_min: '={{$parameter.additionalFields.volume_min}}',
								word_count_max: '={{$parameter.additionalFields.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields.word_count_min}}',
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
								allintitle_max: '={{$parameter.additionalFields.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields.competition_max}}',
								competition_min: '={{$parameter.additionalFields.competition_min}}',
								cpc_max: '={{$parameter.additionalFields.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields.cpc_min}}',
								depth_max: '={{$parameter.depth_max}}',
								depth_min: '={{$parameter.depth_min}}',
								exact_match: '={{$parameter.exact_match}}',
								exclude: '={{$parameter.additionalFields.exclude}}',
								include: '={{$parameter.additionalFields.include}}',
								keep_only_paa: '={{$parameter.keep_only_paa}}',
								keyword: '={{$parameter.keyword}}',
								kgr_max: '={{$parameter.additionalFields.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								order: '={{$parameter.additionalFields.order}}',
								order_by: '={{$parameter.order_by_question}}',
								page: '={{$parameter.page}}',
								question_types: '={{$parameter.question_types}}',
								volume_max: '={{$parameter.additionalFields.volume_max}}',
								volume_min: '={{$parameter.additionalFields.volume_min}}',
								word_count_max: '={{$parameter.additionalFields.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields.word_count_min}}',
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
								keyword: '={{$parameter.keyword}}',
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
								keyword: '={{$parameter.keyword}}',
								first_date: '={{$parameter.first_date}}',
								second_date: '={{$parameter.second_date}}',
								url: '={{$parameter.url}}',

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
								keyword: '={{$parameter.keyword_siteStructure}}',
								keywords: '={{$parameter.keywords_SiteStructure}}',
								exact_match: '={{$parameter.exact_match}}',
								neighbours_sources: '={{$parameter.neighbours_sources}}',
								multipartite_modes: '={{$parameter.multipartite_modes}}',
								neighbours_sample_max_size: '={{$parameter.neighbours_sample_max_size}}',
								mode: '={{$parameter.mode}}',
								granularity: '={{$parameter.granularity}}',
								manual_common_10: '={{$parameter.manual_common_10}}',
								manual_common_100: '={{$parameter.manual_common_100}}',
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
								keywords: '={{$parameter.keywords}}',

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
				// Operation : CompareDomainKeywordswithCompetitors
				{
					name: 'Compare Domain Keywords with Competitors',
					value: 'CompareDomainKeywordswithCompetitors',
					action: 'Compare domain s keywords with competitors',
					description: 'Compares keyword rankings between a given website and its competitors',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/siteCompetitors/keywordsDiff',
							body: {
								keyword: '={{$parameter.keyword}}',
								period: '={{$parameter.period}}',
								first_date: '={{$parameter.first_date_compare}}',
								second_date: '={{$parameter.second_date_compare}}',
							},
						},
					},
				},
				// Operation : GetBestKeywordsfromPage
				{
					name: 'Get Best Keywords From Page',
					value: 'GetBestKeywordsfromPage',
					action: 'Get best keywords from page',
					description: 'Retrieves the best-positioned keyword for the given pages',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/pageBestKeywords',
						},
					},
				},
				// Operation : GetCompetitorBestPages
				{
					name: 'Get Competitor Best Pages',
					value: 'GetCompetitorBestPages',
					action: 'Get competitor best pages',
					description: 'Retrieves the best-performing pages of a competitor\'s domain',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/siteCompetitors/bestPages',
						},
					},
				},
				// Operation : GetCompetitorsKeywordsBestPosition
				{
					name: 'Get Competitor Keywords with the Best Position',
					value: 'GetCompetitorsKeywordsBestPosition',
					action: 'Get competitor keywords with the best position',
					description: 'Get the keywords of a competitor with the best positions',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/keywordsBestPos',
						},
					},
				},
				// Operation : GetDomainCategoriesbasedGMBBacklinks
				{
					name: 'Get Domain Categories Based on GMB Backlinks',
					value: 'GetDomainCategoriesbasedGMBBacklinks',
					action: 'Get competitor keywords with the best position',
					description: 'Retrieves the business categories associated with a given domain or URL based on GMB backlinks',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/gmbBacklinks/categories',
						},
					},
				},
				// Operation : GetDomainCompetitors
				{
					name: 'Get Domain Competitors',
					value: 'GetDomainCompetitors',
					action: 'Get domain s competitors',
					description: 'Retrieves a list of competitor domains for a given website',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/siteCompetitors',
						},
					},
				},
				// Operation : GetDomainDatainBulk
				{
					name: 'Get Domain Data in Bulk',
					value: 'GetDomainDatainBulk',
					action: 'Get domain s data in bulk',
					description: 'Retrieves data for a list of provided domains or URLs',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/bulk',
						},
					},
				},
				// Operation : GetDomainGMBBacklinksMap
				{
					name: 'Get Domain GMB Backlinks Map',
					value: 'GetDomainGMBBacklinksMap',
					action: 'Get domain s gmb backlinks map',
					description: 'Retrieves the geographical locations of backlinks for a given domain or URL',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/gmbBacklinks/map',
						},
					},
				},
				// Operation : GetDomainOverview
				{
					name: 'Get Domain Overview',
					value: 'GetDomainOverview',
					action: 'Get domain overview',
					description: 'Retrieves an SEO overview for a domain or URL',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/overview',
						},
					},
				},
				// Operation : GetDomainPositionHistory
				{
					name: 'Get Domain Position History',
					value: 'GetDomainPositionHistory',
					action: 'Get domain s position history',
					description: 'Retrieves the historical ranking positions of a specified domain or URL for various keywords',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/history',
						},
					},
				},
				// Operation : GetDomainTopPages
				{
					name: 'Get Domain Top Pages',
					value: 'GetDomainTopPages',
					action: 'Get domains top pages',
					description: 'Retrieves top-performing pages of a domain or URL',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/topPages',
						},
					},
				},
				// Operation : GetExpiredDomains
				{
					name: 'Get Expired Domains',
					value: 'GetExpiredDomains',
					action: 'Get expired domains',
					description: 'Retrieves a list of (registar free) expired domains with SEO metrics',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/expired',
						},
					},
				},
				// Operation : GetGMBBacklink
				{
					name: 'Get GMB Backlink',
					value: 'GetGMBBacklink',
					action: 'Get gmb backlink',
					description: 'Retrieves GMB backlink data for a specified domain or URL',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/gmbBacklinks',
						},
					},
				},
				// Operation : GetHistoryofDomainPages
				{
					name: 'Get History of Domain Pages',
					value: 'GetHistoryofDomainPages',
					action: 'Get history of domain s pages',
					description: 'Fetches metrics for specific pages of a domain',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/pagesHistory',
						},
					},
				},
				// Operation : GetKeywordDatafromURL
				{
					name: 'Get Keyword Data From an URL',
					value: 'GetKeywordDatafromURL',
					action: 'Get keyword data from an url',
					description: 'Retrieves keyword data for a given URL or domain',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/keywords',
						},
					},
				},
				// Operation : GetRankingofDomainKeyword
				{
					name: 'Get Ranking of Domain Keyword',
					value: 'GetRankingofDomainKeyword',
					action: 'Get ranking of domain s keyword',
					description: 'Fetches a current domain rankings for a domain or URL',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/positions',
						},
					},
				},
				// Operation : GetVisibilityTrendofDomains
				{
					name: 'Get Visibility Trend of Domains',
					value: 'GetVisibilityTrendofDomains',
					action: 'Get visibility trend of domains',
					description: 'Retrieves a visibility trend data for a given list of websites or URLs',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/history/visibilityTrends',
						},
					},
				},
				// Operation : RevealExpiredDomains
				{
					name: 'Reveal Expired Domains',
					value: 'RevealExpiredDomains',
					action: 'Reveal expired domains',
					description: 'Reveals expired root domains using the provided keys retrieved from the domains/expired endpoint',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/expired/reveal',
						},
					},
				},

			],
			default: 'GetDomainOverview',
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
						'GetKeywordSERPPageEvolution',
					],
				},
			},
		},
		// parameter : keyword_siteStructure
		{
			displayName: 'Keyword',
			description: 'Requested keyword, ignored if keywords (bulk) is present',
			name: 'keyword_siteStructure',
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
				{ name: "Categories", value: "categories" },
				{ name: "Highlights", value: "highlights" },
				{ name: "Match", value: "match" },
				{ name: "Questions", value: "questions" },
				{ name: "Related", value: "related" },
				{ name: "Serp", value: "serp" },
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
		// parameter : first_date_compare
		{
			displayName: 'First Date',
			description: 'Date in YYYY-MM-DD format. Only used if period = \'custom\'.',
			name: 'first_date_compare',
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
		// parameter : second_date
		{
			displayName: 'Second Date',
			description: 'Date in YYYY-MM-DD format',
			required: true,
			name: 'second_date',
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
		// parameter : second_date_compare
		{
			displayName: 'Second Date',
			description: 'Date in YYYY-MM-DD format. Only used if period = \'custom\'.',
			name: 'second_date_compare',
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
		// parameter : lang
		{
			displayName: 'Languages',
			description: 'Only used in conjunction with "categories" in \'requested_data\', the label field will be translated if a different language than english is requested. Original value is also present.',
			name: 'lang',
			type: 'options',
			options: [
				{ name: "French", value: "fr" },
				{ name: "English", value: "en" },
			],
			default: 'en',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordOverview'],
				},
			},
		},
		// parameter : lineCount
		{
			displayName: 'Line Count',
			description: 'Max number of returned results',
			name: 'lineCount',
			type: 'number',
			default: 20,
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
		},
		// parameter : granularity
		{
			displayName: 'Granularity',
			description: 'Low granularity will lead to one big group, high granularity will lead to many smaller groups. For reference, Values used by Haloscan\'s UI values are: 0.001 (insufficient), 0.01 (very low), 0.05 (low), 0.1 (mild), 0.25 (average), 0.67 (high), 1 (very high), 10 (excessive). Ignored if mode=\'manual\'',
			name: 'granularity',
			type: 'number',
			default: 1,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : manual_common_10
		{
			displayName: 'Manual Common 10',
			description: 'In a manual grouping strategy, how many URLs should 2 keywords have in common in their top 10 to be in the same group',
			name: 'manual_common_10',
			type: 'number',
			default: 2,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : manual_common_100
		{
			displayName: 'Manual Common 100',
			description: 'In a manual grouping strategy, how many URLs should 2 keywords have in common in their top 100 to be in the same group',
			name: 'manual_common_100',
			type: 'number',
			default: 10,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : mode
		{
			displayName: 'Mode',
			description: 'Defines how groups will be made. Manual means that keywords will be grouped when they share at least \'manual_common_10\' URLs in their last SERP top 10 AND at least \'manual_common_100\' URLS in their last SERP top 100. Multi means that keywords will be automatically grouped (hierarchically) depending on their proximity on several modalities specified in \'multipartite_modes\'. You can also influence the attraction force with the \'granularity\' parameter.',
			name: 'mode',
			type: 'options',
			options: [
				{name: "Multi", value: "multi"},
				{name: "Manual", value: "manual"}
			],
			default: 'multi',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : multipartite_modes
		{
			displayName: 'Multipartite Modes',
			description: 'Which sources of data should be used to build the multipartite graph. This parameter is ignored if mode≠multi.',
			name: 'multipartite_modes',
			type: 'multiOptions',
			options: [
				{name: "Categories", value: "categories"},
				{name: "Highlights", value: "highlights"},
				{name: "Ngram", value: "ngram"},
				{name: "Related", value: "related"},
				{name: "SERP", value: "serp"},
			],
			default: [],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : neighbours_sample_max_size
		{
			displayName: 'Neighbours Sample Max Size',
			description: 'Max number of returned results. Between 10 and 2000. Only used when requesting a single keyword.',
			name: 'neighbours_sample_max_size',
			type: 'number',
			typeOptions: {
						maxValue: 2000,
						minValue: 10,
					},
			default: 1000,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : neighbours_sources
		{
			displayName: 'Neighbours Sources',
			description: 'Which strategies should be used to find neighbours for keyword. (Ignored if keywords is used).',
			name: 'neighbours_sources',
			type: 'multiOptions',
			options: [
				{name: "Categories", value: "categories"},
				{name: "Highlights", value: "highlights"},
				{name: "Ngram", value: "ngram"},
				{name: "Related", value: "related"},
				{name: "SERP", value: "serp"},
			],
			default: [],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
		},
		// parameter : order_by_findKeyword
		{
			displayName: 'Order By',
			description: 'Field used for sorting results. Default sorts by descending \'modality_count\'.',
			name: 'order_by',
			type: 'options',
			options: [
				{ name: "Allintitle", value: "allintitle" },
				{ name: "Competition", value: "competition" },
				{ name: "CPC", value: "cpc" },
				{ name: "Default", value: "default" },
				{ name: "Keyword", value: "keyword" },
				{ name: "KGR", value: "kgr" },
				{ name: "Volume", value: "volume" }
			],
			default: 'default',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindKeyword',
					],
				},
			},
		},
		// parameter : order_by_findSynoMatch
		{
			displayName: 'Order By',
			description: 'Field used for sorting results. Default sorts by descending volume.',
			name: 'order_by_findSynoMatch',
			type: 'options',
			options: [
				{ name: "Allintitle", value: "allintitle" },
				{ name: "Competition", value: "competition" },
				{ name: "CPC", value: "cpc" },
				{ name: "Default", value: "default" },
				{ name: "Keyword", value: "keyword" },
				{ name: "KGR", value: "kgr" },
				{ name: "Volume", value: "volume" }
			],
			default: 'default',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindKeywordSynonym',
						'FindKeywordsMatch'
					],
				},
			},
		},
		// parameter : order_by_findRelated
		{
			displayName: 'Order By',
			description: 'Field used for sorting results. Default sorts by descending depth (absolute value).',
			name: 'order_by_findRelated',
			type: 'options',
			options: [
				{ name: "Allintitle", value: "allintitle" },
				{ name: "Competition", value: "competition" },
				{ name: "CPC", value: "cpc" },
				{ name: "Default", value: "default" },
				{ name: "Depth", value: "depth" },
				{ name: "Keyword", value: "keyword" },
				{ name: "KGR", value: "kgr" },
				{ name: "Volume", value: "volume" }
			],
			default: 'default',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindRelatedKeyword',
					],
				},
			},
		},
		// parameter : order_by_findSimilar
		{
			displayName: 'Order By',
			description: 'Field used for sorting results. Default is by descending similarity.',
			name: 'order_by_findSimilar',
			type: 'options',
			options: [
				{ name: "Allintitle", value: "allintitle" },
				{ name: "Competition", value: "competition" },
				{ name: "CPC", value: "cpc" },
				{ name: "Default", value: "default" },
				{ name: "Keyword", value: "keyword" },
				{ name: "KGR", value: "kgr" },
				{ name: "Similarity", value: "similarity" },
				{ name: "Volume", value: "volume" }
			],
			default: 'default',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindSimilarKeyword',
					],
				},
			},
		},
		// parameter : order_by_bulk
		{
			displayName: 'Order By',
			description: 'Field used for sorting results. Value "keep" preserves the original input order.',
			name: 'order_by_bulk',
			type: 'options',
			options: [
				{ name: "Allintitle", value: "allintitle" },
				{ name: "Competition", value: "competition" },
				{ name: "CPC", value: "cpc" },
				{ name: "Keep", value: "keep" },
				{ name: "Keyword", value: "keyword" },
				{ name: "KGR", value: "kgr" },
				{ name: "Volume", value: "volume" }
			],
			default: 'keep',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'GetKeywordDatainBulk',
					],
				},
			},
		},
		// parameter : order_by_highlight
		{
			displayName: 'Order By',
			description: 'Field used for sorting results. Default is by descending similarity.',
			name: 'order_by_highlight',
			type: 'options',
			options: [
				{ name: "Allintitle", value: "allintitle" },
				{ name: "Competition", value: "competition" },
				{ name: "CPC", value: "cpc" },
				{ name: "Default", value: "default" },
				{ name: "Keyword", value: "keyword" },
				{ name: "KGR", value: "kgr" },
				{ name: "Similarity", value: "similarity" },
				{ name: "Volume", value: "volume" }
			],
			default: 'default',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'GetKeywordHighlight',
					],
				},
			},
		},
		// parameter : order_by_question
		{
			displayName: 'Order By',
			description: 'Field used for sorting results. Default sorts by descending depth (absolute value).',
			name: 'order_by_highlight',
			type: 'options',
			options: [
				{ name: "Allintitle", value: "allintitle" },
				{ name: "Competition", value: "competition" },
				{ name: "CPC", value: "cpc" },
				{ name: "Default", value: "default" },
				{ name: "Depth", value: "depth" },
				{ name: "Keyword", value: "keyword" },
				{ name: "KGR", value: "kgr" },
				{ name: "Question Type", value: "question_type" },
				{ name: "Volume", value: "volume" }
			],
			default: 'default',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'GetKeywordQuestion',
					],
				},
			},
		},
		// parameter : exact_match
		{
			displayName: 'Exact Match',
			description: 'Whether always ignore accents, punctuation, case, special characters, etc when FALSE. when matching the seed keyword.',
			name: 'exact_match',
			type: 'boolean',
			default: true,
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
		},
		// parameter : keep_seed
		{
			displayName: 'Keep Seed',
			description: 'Whether to keep the input in the api\'s response',
			name: 'keep_seed',
			type: 'boolean',
			default: true,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['FindKeyword'],
				},
			},
		},
		// parameter : keep_only_paa
		{
			displayName: 'Keep Only PAA',
			description: 'Whether to include only PAA (People Also Ask) from google in the response',
			name: 'keep_only_paa',
			type: 'boolean',
			default: true,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordQuestion'],
				},
			},
		},
		// parameter : page
		{
			displayName: 'Page',
			name: 'page',
			type: 'number',
			default: 1,
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
		},
		// parameter : period
		{
			displayName: 'Period',
			description: 'The comparison period for SERPs. If custom is used, \'first_date\' and \'second_date\' must be provided and be dates where the requested keyword\'s SERP is available, which you can get by calling the keywords/serp/availableDates endpoint, or by calling this endpoint with another period first.',
			required: true,
			name: 'period',
			type: 'options',
			options: [
				{ name: "1 Month", value: "1 month" },
				{ name: "12 Months", value: "12 months" },
				{ name: "3 Months", value: "3 months" },
				{ name: "6 Months", value: "6 months" },
				{ name: "Custom", value: "custom" }
			],
			default: '6 months',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'CompareKeywordsSERP',
					],
				},
			},
		},
		// parameter : question_types
		{
			displayName: 'Question Types',
			name: 'question_types',
			type: 'multiOptions',
			options: [
				{ name: "Definition", value: "definition" },
				{ name: "How", value: "how" },
				{ name: "How Expensive", value: "how_expensive" },
				{ name: "How Long", value: "how_long" },
				{ name: "How Many", value: "how_many" },
				{ name: "Unknown", value: "unknown" },
				{ name: "What", value: "what" },
				{ name: "When", value: "when" },
				{ name: "Where", value: "where" },
				{ name: "Who", value: "who" },
				{ name: "Why", value: "why" },
				{ name: "Yes/No", value: "yesno" }
			],
			default: [],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'GetKeywordQuestion',
					],
				},
			},
		},
		// parameter : requested_data
		{
			displayName: 'Requested Data',
			description: 'Requested data for the given keyword, corresponding to the content of different sections of the haloscan overview page. Data will be sent back in a field with the same name in the response, except for the metrics that are split into \'seo_metrics\' and \'ads_metrics\' in the response.',
			required: true,
			name: 'requested_data',
			type: 'multiOptions',
			options: [
				{ name: "Categories", value: "categories" },
				{ name: "Keyword Match", value: "keyword_match" },
				{ name: "Metrics", value: "metrics" },
				{ name: "Related Question", value: "related_question" },
				{ name: "Related Search", value: "related_search" },
				{ name: "SERP", value: "serp" },
				{ name: "Similar Category", value: "similar_category" },
				{ name: "Similar Highlight", value: "similar_highlight" },
				{ name: "Similar Serp", value: "similar_serp" },
				{ name: "Synonyms", value: "synonyms" },
				{ name: "Top Sites", value: "top_sites" },
				{ name: "Volume History", value: "volume_history" }
			],
			default: [],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'GetKeywordOverview',
					],
				},
			},
		},
		// parameter : similarity_max
		{
			displayName: 'Similarity Max',
			name: 'similarity_max',
			type: 'number',
			default: null,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindSimilarKeyword',
						'GetKeywordHighlight'
					],
				},
			},
		},
		// parameter : similarity_min
		{
			displayName: 'Similarity Min',
			name: 'similarity_min',
			type: 'number',
			default: null,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindSimilarKeyword',
						'GetKeywordHighlight'
					],
				},
			},
		},
		// parameter : url
		{
			displayName: 'Url',
			required: true,
			name: 'url',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'GetKeywordSERPPageEvolution',
					],
				},
			},
		},
		// parameter : depth_min
		{
			displayName: 'Minimum Depth',
			name: 'depth_min',
			type: 'number',
			default: null,
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
		},
		// parameter : depth_max
		{
			displayName: 'Maximum Depth',
			name: 'depth_max',
			type: 'number',
			default: null,
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
		},
		// required site explorer
		  {
    displayName: "Competitors",
   description: "List of competitor domains or root domains",
   name: "competitors",
   default: [],
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetCompetitorsKeywordsBestPosition"
        ]
      }
    },
   type: "string",
   typeOptions: {
     multipleValues: true
    }
  },
  {
    displayName: "Keywords",
   description: "List of keywords to look for",
   name: "keywords",
   default: [],
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetCompetitorsKeywordsBestPosition"
        ]
      }
    },
   type: "string",
   typeOptions: {
     multipleValues: true
    }
  },
  {
    displayName: "Inputs",
   description: 'Array containing the requested URLs or domains',
   name: "inputs",
   default: [],
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetDomainDatainBulk"
        ]
      }
    },
   type: "string",
   typeOptions: {
     multipleValues: true
    }
  },
  {
    displayName: "Date From",
   description: "Date in YYYY-MM-DD format",
   name: "date_from",
   default: "",
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetDomainPositionHistory",
          "GetHistoryofDomainPages"
        ]
      }
    },
   type: "string"
  },
  {
    displayName: "Input",
   description: 'Requested URL or domain',
   name: "input",
   default: "",
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "CompareDomainKeywordswithCompetitors",
          "GetCompetitorBestPages",
          "GetDomainCategoriesbasedGMBBacklinks",
          "GetDomainCompetitors",
          "GetDomainGMBBacklinksMap",
          "GetDomainPositionHistory",
          "GetDomainTopPages",
          "GetGMBBacklink",
          "GetHistoryofDomainPages",
          "GetKeywordDatafromURL",
          "GetRankingofDomainKeyword"
        ]
      }
    },
   type: "string"
  },
  {
    displayName: "Root Domain Keys",
   description: 'List of root_domain_key fields from items in the domains/expired endpoint which you want to reveal. 1 expired domain credit will be consumed for each item in this list that you haven\'t previously revealed.',
   name: "root_domain_keys",
   default: [],
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "RevealExpiredDomains"
        ]
      }
    },
   type: "string",
   typeOptions: {
     multipleValues: true
    }
  },
  {
    displayName: "Input",
   description: 'Requested URL, domain or root domain',
   name: "input",
   default: "",
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetDomainOverview"
        ]
      }
    },
   type: "string"
  },
  {
    displayName: "Input",
   description: 'Array containing the requested URLs or domains',
   name: "input",
   default: [],
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetBestKeywordsfromPage",
          "GetVisibilityTrendofDomains"
        ]
      }
    },
   type: "string",
   typeOptions: {
     multipleValues: true
    }
  },
  {
    displayName: "Requested Data",
   description: 'Requested data for the given URL or domain, corresponding to the content of different sections of the haloscan overview page. Data will be sent back in a field with the same name in the response.',
   name: "requested_data",
   default: [],
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetDomainOverview"
        ]
      }
    },
   type: "multiOptions",
   options: [
      {
       name: "Best Keywords",
       value: "best_keywords"
      },
      {
       name: "Best Pages",
       value: "best_pages"
      },
      {
       name: "Categories",
       value: "categories"
      },
      {
       name: "GMB Backlinks",
       value: "gmb_backlinks"
      },
      {
       name: "Metrics",
       value: "metrics"
      },
      {
       name: "Positions and Pages History",
       value: "positions_and_pages_history"
      },
      {
       name: "Positions Breakdown",
       value: "positions_breakdown"
      },
      {
       name: "Positions Breakdown History",
       value: "positions_breakdown_history"
      },
      {
       name: "Traffic Value",
       value: "traffic_value"
      },
      {
       name: "Visibility Index History",
       value: "visibility_index_history"
      }
    ]
  },
  {
    displayName: "Date To",
   description: "Date in YYYY-MM-DD format",
   name: "date_to",
   default: "",
   required: true,
   displayOptions: {
     show: {
       resource: [
          "siteExplorer"
        ],
       operation: [
          "GetDomainPositionHistory",
          "GetHistoryofDomainPages"
        ]
      }
    },
   type: "string"
  },




		// parameter : acceptedTypes
		{
			displayName: 'Accepted Types',
			name: 'acceptedTypes',
			description: 'That\'s just a filter, it\'s not necessary to use it if you used the matching boolean params (using the boolean params makes it faster). The only difference is that with this, you can separate mixed keywords, where seed is better than some competitors and less good than others. Hence, bested and besting become absolute: bested by every single competitor (that is there), or besting every single competitor.',
			type: 'multiOptions',
			options:[
				{ name: "Auto", value: "auto" },
				{ name: "Bested", value: "bested" },
				{ name: "Besting", value: "besting" },
				{ name: "Exclusive", value: "exclusive" },
				{ name: "Missing", value: "missing" },
				{ name: "Mixed", value: "mixed" }
			],
			default: ['auto'],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['siteExplorer'],
					operation: [
						'CompareDomainKeywordswithCompetitors',
						],
				},
			},
		},


		// Optional/additional fields will go here, always in type collection
		// you can have multiple "Additional Fields" each displayed for specific resource/operation
		/* additional fields for:
						FindKeywordSynonym
						FindKeywordsMatch
						FindRelatedKeyword
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
						'FindKeywordSynonym',
						'FindKeywordsMatch',
						'FindRelatedKeyword',
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
					default: null,
				},
				//parameter : allintitle_min
				{
					displayName: 'Minimum Allintitle',
					name: 'allintitle_min',
					type: 'number',
					default: null,
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
					default: null,
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
					default: null,
				},
				//parameter : cpc_max
				{
					displayName: 'Maximum CPC',
					name: 'cpc_max',
					type: 'number',
					default: null,
				},
				//parameter : cpc_min
				{
					displayName: 'Minimum CPC',
					name: 'cpc_mmin',
					type: 'number',
					default: null,
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
					default: null,
				},
				//parameter : kgr_min
				{
					displayName: 'KGR Min',
					name: 'kgr_min',
					type: 'number',
					default: null,
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
					default: null,
				},
				//parameter : kvi_min
				{
					displayName: 'KVI Min',
					name: 'kvi_min',
					type: 'number',
					default: null,
				},
				//parameter : order
				{
					displayName: 'Order',
					description: 'Whether the results are sorted in ascending or descending order',
					name: 'order',
					type: 'options',
					options: [
						{name: "Ascending", value: "asc"},
						{name: "Descending", value: "desc"},
					],
					default: 'asc',
				},
				//parameter : volume_max
				{
					displayName: 'Volume Max',
					name: 'volume_max',
					type: 'number',
					default: null,
				},
				//parameter : volume_min
				{
					displayName: 'Volume Min',
					name: 'volume_min',
					type: 'number',
					default: null,
				},
				//parameter : word_count_max
				{
					displayName: 'Word Count Max',
					description: 'Max number of words making up the keyword',
					name: 'word_count_max',
					type: 'number',
					default: null,
				},
				//parameter : word_count_min
				{
					displayName: 'Word Count Min',
					description: 'Min number of words making up the keyword',
					name: 'word_count_min',
					type: 'number',
					default: null,
				},

			],
		},

		/* additional fields for:
						FindKeyword*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields_findKeyword',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindKeyword',
					],
				},
			},
			options: [
				//parameter : allintitle_max
				{
					displayName: 'Maximum Allintitle',
					name: 'allintitle_max',
					type: 'number',
					default: null,
				},
				//parameter : allintitle_min
				{
					displayName: 'Minimum Allintitle',
					name: 'allintitle_min',
					type: 'number',
					default: null,
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
					default: null,
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
					default: null,
				},
				//parameter : cpc_max
				{
					displayName: 'Maximum CPC',
					name: 'cpc_max',
					type: 'number',
					default: null,
				},
				//parameter : cpc_min
				{
					displayName: 'Minimum CPC',
					name: 'cpc_mmin',
					type: 'number',
					default: null,
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
					default: null,
				},
				//parameter : kgr_min
				{
					displayName: 'KGR Min',
					name: 'kgr_min',
					type: 'number',
					default: null,
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
					default: null,
				},
				//parameter : kvi_min
				{
					displayName: 'KVI Min',
					name: 'kvi_min',
					type: 'number',
					default: null,
				},
				//parameter : order
				{
					displayName: 'Order',
					description: 'Whether the results are sorted in ascending or descending order',
					name: 'order',
					type: 'options',
					options: [
						{name: "Ascending", value: "asc"},
						{name: "Descending", value: "desc"},
					],
					default: 'asc',
				},
				//parameter : volume_max
				{
					displayName: 'Volume Max',
					name: 'volume_max',
					type: 'number',
					default: null,
				},
				//parameter : volume_min
				{
					displayName: 'Volume Min',
					name: 'volume_min',
					type: 'number',
					default: null,
				},

			],
		},

		/* additional fields for:
						FindSimilarKeyword*/
		{
			displayName: 'Additional Fields',
			name: 'additionalFields_findSimilar',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: [
						'FindSimilarKeyword',
					],
				},
			},
				options: [
				//parameter : allintitle_max
				{
					displayName: 'Maximum Allintitle',
					name: 'allintitle_max',
					type: 'number',
					default: null,
				},
				//parameter : allintitle_min
				{
					displayName: 'Minimum Allintitle',
					name: 'allintitle_min',
					type: 'number',
					default: null,
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
					default: null,
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
					default: null,
				},
				//parameter : cpc_max
				{
					displayName: 'Maximum CPC',
					name: 'cpc_max',
					type: 'number',
					default: null,
				},
				//parameter : cpc_min
				{
					displayName: 'Minimum CPC',
					name: 'cpc_mmin',
					type: 'number',
					default: null,
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
					default: null,
				},
				//parameter : kgr_min
				{
					displayName: 'KGR Min',
					name: 'kgr_min',
					type: 'number',
					default: null,
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
					default: null,
				},
				//parameter : kvi_min
				{
					displayName: 'KVI Min',
					name: 'kvi_min',
					type: 'number',
					default: null,
				},
				//parameter : order
				{
					displayName: 'Order',
					description: 'Whether the results are sorted in ascending or descending order',
					name: 'order',
					type: 'options',
					options: [
						{name: "Ascending", value: "asc"},
						{name: "Descending", value: "desc"},
					],
					default: 'asc',
				},
				//parameter : p1_score_max
				{
					displayName: 'P1 Score Max',
					description: 'Max common top 10',
					name: 'p1_score_max',
					type: 'number',
					default: null,
				},
				//parameter : p1_score_min
				{
					displayName: 'P1 Score Min',
					description: 'Min common top 10',
					name: 'p1_score_min',
					type: 'number',
					default: null,
				},
				//parameter : score_max
				{
					displayName: 'Score Max',
					description: 'Max common top 100',
					name: 'score_max',
					type: 'number',
					default: null,
				},
				//parameter : score_min
				{
					displayName: 'Score Min',
					description: 'Min common top 100',
					name: 'score_min',
					type: 'number',
					default: null,
				},
				//parameter : volume_max
				{
					displayName: 'Volume Max',
					name: 'volume_max',
					type: 'number',
					default: null,
				},
				//parameter : volume_min
				{
					displayName: 'Volume Min',
					name: 'volume_min',
					type: 'number',
					default: null,
				},
				//parameter : word_count_max
				{
					displayName: 'Word Count Max',
					description: 'Max number of words making up the keyword',
					name: 'word_count_max',
					type: 'number',
					default: null,
				},
				//parameter : word_count_min
				{
					displayName: 'Word Count Min',
					description: 'Min number of words making up the keyword',
					name: 'word_count_min',
					type: 'number',
					default: null,
				},

			],
		},



		]
	};
}

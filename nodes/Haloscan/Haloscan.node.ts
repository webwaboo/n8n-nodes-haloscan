import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Haloscan implements INodeType {
	description: INodeTypeDescription = { // Basic node details will go here
		//name displayed under the node
		displayName: 'Haloscan',
		//name of node for the system
		name: 'haloscan',
		//path to the icon
		icon: 'file:haloscan_bleu_square.svg',
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
								//keywords: '={{$parameter.keywords}}',
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
								keyword: '={{ $parameter.keyword_siteStructure === "" ? null : $parameter.keyword_siteStructure }}',
								keywords: '={{ [].concat($parameter.keywords_siteStructure, $parameter.keywords_siteStructure2) }}',
								/*keywords: '={{$parameter.keywords_siteStructure}}',*/
								exact_match: '={{$parameter.exact_match}}',
								neighbours_sources: '={{$parameter.neighbours_sources}}',
								multipartite_modes: '={{$parameter.multipartite_modes}}',
								neighbours_sample_max_size: '={{$parameter.neighbours_sample_max_size}}',
								mode: '={{$parameter.mode_structure}}',
								granularity: '={{$parameter.granularity}}',
								manual_common_10: '={{$parameter.manual_common_10}}',
								manual_common_100: '={{$parameter.manual_common_100}}',

							},
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
					action: 'Compare domain keywords with competitors',
					description: 'Compares keyword rankings between a given website and its competitors',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/siteCompetitors/keywordsDiff',
							body: {
								bested: '={{$parameter.bested}}',
								besting: '={{$parameter.besting}}',
								competitors: '={{$parameter.competitors}}',
								exclusive: '={{$parameter.exclusive}}',
								lineCount: '={{$parameter.lineCount}}',
								missing: '={{$parameter.missing}}',
								mode: '={{$parameter.mode}}',
								page: '={{$parameter.page}}',
								input: '={{$parameter.input}}',
								acceptedTypes: '={{$parameter.acceptedTypes}}',
								allintitle_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.allintitle_keep_na}}',
								allintitle_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.allintitle_min}}',
								best_competitor_position_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_competitor_position_max}}',
								best_competitor_position_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_competitor_position_min}}',
								best_competitor_traffic_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_competitor_traffic_keep_na}}',
								best_competitor_traffic_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_competitor_traffic_max}}',
								best_competitor_traffic_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_competitor_traffic_min}}',
								best_reference_position_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_reference_position_max}}',
								best_reference_position_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_reference_position_min}}',
								best_reference_traffic_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_reference_traffic_keep_na}}',
								best_reference_traffic_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_reference_traffic_max}}',
								best_reference_traffic_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.best_reference_traffic_min}}',
								competition_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.competition_keep_na}}',
								competition_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.competition_max}}',
								competition_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.competition_min}}',
								competitors_positions_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.competitors_positions_max}}',
								competitors_positions_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.competitors_positions_min}}',
								cpc_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.cpc_keep_na}}',
								cpc_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.cpc_min}}',
								google_indexed_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.google_indexed_keep_na}}',
								google_indexed_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.google_indexed_max}}',
								google_indexed_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.google_indexed_min}}',
								keyword_exclude: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.keyword_exclude}}',
								keyword_include: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.keyword_include}}',
								keyword_word_count_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.keyword_word_count_max}}',
								keyword_word_count_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.keyword_word_count_min}}',
								kgr_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.kgr_keep_na}}',
								kgr_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.kvi_min}}',
								order_by: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.order_by}}',
								unique_competitors_count_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.unique_competitors_count_max}}',
								unique_competitors_count_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.unique_competitors_count_min}}',
								volume_keep_na: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.volume_keep_na}}',
								volume_max: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.volume_max}}',
								volume_min: '={{$parameter.additionalFields_CompareDomainKeywordswithCompetitors.volume_min}}',
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
							body: {
								lineCount: '={{$parameter.lineCount_bestkeyword}}',
								strategy: '={{$parameter.strategy}}',
								input: '={{$parameter.input_visibility_bestkeyword}}',
							},
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
							body: {
								competitors: '={{$parameter.competitors}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								order_by: '={{$parameter.order_by_competitor_keyworddata}}',
								page: '={{$parameter.page}}',
								strategy: '={{$parameter.strategy}}',
								input: '={{$parameter.input}}',
								bested_keywords_max: '={{$parameter.additionalFields_GetCompetitorBestPages.bested_keywords_max}}',
								bested_keywords_min: '={{$parameter.additionalFields_GetCompetitorBestPages.bested_keywords_min}}',
								besting_keywords_max: '={{$parameter.additionalFields_GetCompetitorBestPages.besting_keywords_max}}',
								besting_keywords_min: '={{$parameter.additionalFields_GetCompetitorBestPages.besting_keywords_min}}',
								exclusive_keywords_max: '={{$parameter.additionalFields_GetCompetitorBestPages.exclusive_keywords_max}}',
								exclusive_keywords_min: '={{$parameter.additionalFields_GetCompetitorBestPages.exclusive_keywords_min}}',
								keywords_max: '={{$parameter.additionalFields_GetCompetitorBestPages.keywords_max}}',
								keywords_min: '={{$parameter.additionalFields_GetCompetitorBestPages.keywords_min}}',
								positions_max: '={{$parameter.additionalFields_GetCompetitorBestPages.positions_max}}',
								positions_min: '={{$parameter.additionalFields_GetCompetitorBestPages.positions_min}}',
								total_traffic_keep_na: '={{$parameter.additionalFields_GetCompetitorBestPages.total_traffic_keep_na}}',
								total_traffic_max: '={{$parameter.additionalFields_GetCompetitorBestPages.total_traffic_max}}',
								total_traffic_min: '={{$parameter.additionalFields_GetCompetitorBestPages.total_traffic_min}}',
							},
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
							url: '=/domains/siteCompetitors/keywordsBestPos',
							body: {
								allintitle_keep_na: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.allintitle_keep_na}}',
								allintitle_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.allintitle_min}}',
								best_competitor_position_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.best_competitor_position_max}}',
								best_competitor_position_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.best_competitor_position_min}}',
								best_competitor_traffic_keep_na: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.best_competitor_traffic_keep_na}}',
								best_competitor_traffic_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.best_competitor_traffic_max}}',
								best_competitor_traffic_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.best_competitor_traffic_min}}',
								competition_keep_na: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.competition_keep_na}}',
								competition_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.competition_max}}',
								competition_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.competition_min}}',
								competitors: '={{$parameter.competitors_bestposition}}',
								competitors_positions_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.competitors_positions_max}}',
								competitors_positions_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.competitors_positions_min}}',
								cpc_keep_na: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.cpc_keep_na}}',
								cpc_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.cpc_min}}',
								keyword_exclude: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.keyword_exclude}}',
								keyword_include: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.keyword_include}}',
								keyword_word_count_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.keyword_word_count_max}}',
								keyword_word_count_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.keyword_word_count_min}}',
								keywords: '={{$parameter.keywords_bestposition}}',
								kgr_keep_na: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.kgr_keep_na}}',
								kgr_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode_bestposition}}',
								order_by: '={{$parameter.order_by_bestposition}}',
								page: '={{$parameter.page}}',
								unique_competitors_count_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.unique_competitors_count_max}}',
								unique_competitors_count_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.unique_competitors_count_min}}',
								volume_keep_na: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.volume_keep_na}}',
								volume_max: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.volume_max}}',
								volume_min: '={{$parameter.additionalFields_GetCompetitorsKeywordsBestPosition.volume_min}}',
							},
						},
					},
				},
				// Operation : GetDomainCategoriesbasedGMBBacklinks
				{
					name: 'Get Domain Categories Based on GMB Backlinks',
					value: 'GetDomainCategoriesbasedGMBBacklinks',
					action: 'Get domain categories based on gmb backlinks',
					description: 'Retrieves the business categories associated with a given domain or URL based on GMB backlinks',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/gmbBacklinks/categories',
							body: {
								input: '={{$parameter.input}}',
								mode: '={{$parameter.mode}}',
							},
						},
					},
				},
				// Operation : GetDomainCompetitors
				{
					name: 'Get Domain Competitors',
					value: 'GetDomainCompetitors',
					action: 'Get domain competitors',
					description: 'Retrieves a list of competitor domains for a given website',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/siteCompetitors',
							body: {
								input: '={{$parameter.input}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								page: '={{$parameter.page}}',
							},
						},
					},
				},
				// Operation : GetDomainDatainBulk
				{
					name: 'Get Domain Data in Bulk',
					value: 'GetDomainDatainBulk',
					action: 'Get domain data in bulk',
					description: 'Retrieves data for a list of provided domains or URLs',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/bulk',
							body: {
								inputs: '={{$parameter.inputs}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								order: '={{$parameter.additionalFields_GetDomainDatainBulk.order}}',
								order_by: '={{$parameter.order_by}}',
								page: '={{$parameter.page}}',
								total_top_10_max: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_10_max}}',
								total_top_10_min: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_10_min}}',
								total_top_100_max: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_100_max}}',
								total_top_100_min: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_100_min}}',
								total_top_3_max: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_3_max}}',
								total_top_3_min: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_3_min}}',
								total_top_50_max: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_50_max}}',
								total_top_50_min: '={{$parameter.additionalFields_GetDomainDatainBulk.total_top_50_min}}',
								total_traffic_max: '={{$parameter.additionalFields_GetDomainDatainBulk.total_traffic_max}}',
								total_traffic_min: '={{$parameter.additionalFields_GetDomainDatainBulk.total_traffic_min}}',
								unique_keywords_max: '={{$parameter.additionalFields_GetDomainDatainBulk.unique_keywords_max}}',
								unique_keywords_min: '={{$parameter.additionalFields_GetDomainDatainBulk.unique_keywords_min}}',
							},
						},
					},
				},
				// Operation : GetDomainGMBBacklinksMap
				{
					name: 'Get Domain GMB Backlinks Map',
					value: 'GetDomainGMBBacklinksMap',
					action: 'Get domain gmb backlinks map',
					description: 'Retrieves the geographical locations of backlinks for a given domain or URL',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/gmbBacklinks/map',
							body: {
								input: '={{$parameter.input}}',
								mode: '={{$parameter.mode}}',
							},
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
							body: {
								input: '={{$parameter.input_domain}}',
								lang: '={{$parameter.lang}}',
								mode: '={{$parameter.mode}}',
								requested_data: '={{$parameter.requested_data}}',
							},
						},
					},
				},
				// Operation : GetDomainPositionHistory
				{
					name: 'Get Domain Position History',
					value: 'GetDomainPositionHistory',
					action: 'Get domain position history',
					description: 'Retrieves the historical ranking positions of a specified domain or URL for various keywords',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/history',
							body: {
								allintitle_max: '={{$parameter.additionalFields_GetDomainPositionHistory.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields_GetDomainPositionHistory.allintitle_min}}',
								best_position_max: '={{$parameter.additionalFields_GetDomainPositionHistory.best_position_max}}',
								best_position_min: '={{$parameter.additionalFields_GetDomainPositionHistory.best_position_min}}',
								competition_max: '={{$parameter.additionalFields_GetDomainPositionHistory.competition_max}}',
								competition_min: '={{$parameter.additionalFields_GetDomainPositionHistory.competition_min}}',
								cpc_max: '={{$parameter.additionalFields_GetDomainPositionHistory.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields_GetDomainPositionHistory.cpc_min}}',
								date_from: '={{$parameter.date_from}}',
								date_to: '={{$parameter.date_to}}',
								first_time_seen_max: '={{$parameter.additionalFields_GetDomainPositionHistory.first_time_seen_max}}',
								first_time_seen_min: '={{$parameter.additionalFields_GetDomainPositionHistory.first_time_seen_min}}',
								input: '={{$parameter.input}}',
								keyword_exclude: '={{$parameter.additionalFields_GetDomainPositionHistory.keyword_exclude}}',
								keyword_include: '={{$parameter.additionalFields_GetDomainPositionHistory.keyword_include}}',
								kgr_max: '={{$parameter.additionalFields_GetDomainPositionHistory.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields_GetDomainPositionHistory.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields_GetDomainPositionHistory.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields_GetDomainPositionHistory.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields_GetDomainPositionHistory.kvi_min}}',
								last_time_seen_max: '={{$parameter.additionalFields_GetDomainPositionHistory.last_time_seen_max}}',
								last_time_seen_min: '={{$parameter.additionalFields_GetDomainPositionHistory.last_time_seen_min}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								most_recent_position_max: '={{$parameter.additionalFields_GetDomainPositionHistory.most_recent_position_max}}',
								most_recent_position_min: '={{$parameter.additionalFields_GetDomainPositionHistory.most_recent_position_min}}',
								order: '={{$parameter.additionalFields_GetDomainPositionHistory.order}}',
								order_by: '={{$parameter.order_by_domain_history}}',
								page: '={{$parameter.page}}',
								page_count_max: '={{$parameter.additionalFields_GetDomainPositionHistory.page_count_max}}',
								page_count_min: '={{$parameter.additionalFields_GetDomainPositionHistory.page_count_min}}',
								still_there: '={{$parameter.additionalFields_GetDomainPositionHistory.still_there}}',
								subdomain_count_max: '={{$parameter.additionalFields_GetDomainPositionHistory.subdomain_count_max}}',
								subdomain_count_min: '={{$parameter.additionalFields_GetDomainPositionHistory.subdomain_count_min}}',
								volume_max: '={{$parameter.additionalFields_GetDomainPositionHistory.volume_max}}',
								volume_min: '={{$parameter.additionalFields_GetDomainPositionHistory.volume_min}}',
								word_count_max: '={{$parameter.additionalFields_GetDomainPositionHistory.word_count_max}}',
								word_count_min: '={{$parameter.additionalFields_GetDomainPositionHistory.word_count_min}}',
								worst_position_max: '={{$parameter.additionalFields_GetDomainPositionHistory.worst_position_max}}',
								worst_position_min: '={{$parameter.additionalFields_GetDomainPositionHistory.worst_position_min}}',
							},
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
							body: {
								input: '={{$parameter.input}}',
								known_versions_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.known_versions_max}}',
								known_versions_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.known_versions_min}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								order: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.order}}',
								order_by: '={{$parameter.order_by_domain_history}}',
								page: '={{$parameter.page}}',
								total_top_10_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_10_max}}',
								total_top_10_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_10_min}}',
								total_top_100_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_100_max}}',
								total_top_100_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_100_min}}',
								total_top_3_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_3_max}}',
								total_top_3_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_3_min}}',
								total_top_50_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_50_max}}',
								total_top_50_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_50_min}}',
								total_traffic_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_traffic_max}}',
								total_traffic_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_traffic_min}}',
								unique_keywords_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.unique_keywords_max}}',
								unique_keywords_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.unique_keywords_min}}',
							},
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
							body: {
								fb_comments_max: '={{$parameter.additionalFields_GetExpiredDomains.fb_comments_max}}',
								fb_comments_min: '={{$parameter.additionalFields_GetExpiredDomains.fb_comments_min}}',
								fb_shares_max: '={{$parameter.additionalFields_GetExpiredDomains.fb_shares_max}}',
								fb_shares_min: '={{$parameter.additionalFields_GetExpiredDomains.fb_shares_min}}',
								first_seen_max: '={{$parameter.additionalFields_GetExpiredDomains.first_seen_max}}',
								first_time_available_max: '={{$parameter.additionalFields_GetExpiredDomains.first_time_available_max}}',
								first_time_available_min: '={{$parameter.additionalFields_GetExpiredDomains.first_time_available_min}}',
								firstseen_min: '={{$parameter.additionalFields_GetExpiredDomains.firstseen_min}}',
								keyword: '={{$parameter.keyword_expired}}',
								last_seen_max: '={{$parameter.additionalFields_GetExpiredDomains.last_seen_max}}',
								last_seen_min: '={{$parameter.additionalFields_GetExpiredDomains.last_seen_min}}',
								last_time_available_max: '={{$parameter.additionalFields_GetExpiredDomains.last_time_available_max}}',
								last_time_available_min: '={{$parameter.additionalFields_GetExpiredDomains.last_time_available_min}}',
								lineCount: '={{$parameter.lineCount}}',
								matching_keywords_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_keywords_max}}',
								matching_keywords_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_keywords_min}}',
								matching_most_recent_position_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_most_recent_position_max}}',
								matching_most_recent_position_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_most_recent_position_min}}',
								matching_pages_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_pages_max}}',
								matching_pages_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_pages_min}}',
								matching_top_10_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_10_positions_max}}',
								matching_top_10_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_10_positions_min}}',
								matching_top_100_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_100_positions_max}}',
								matching_top_100_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_100_positions_min}}',
								matching_top_3_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_3_positions_max}}',
								matching_top_3_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_3_positions_min}}',
								matching_top_50_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_50_positions_max}}',
								matching_top_50_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_top_50_positions_min}}',
								matching_traffic_max: '={{$parameter.additionalFields_GetExpiredDomains.matching_traffic_max}}',
								matching_traffic_min: '={{$parameter.additionalFields_GetExpiredDomains.matching_traffic_min}}',
								order: '={{$parameter.additionalFields_GetExpiredDomains.order}}',
								order_by: '={{$parameter.order_by_expired}}',
								page: '={{$parameter.page}}',
								pinterest_pins_max: '={{$parameter.additionalFields_GetExpiredDomains.pinterest_pins_max}}',
								pinterest_pins_min: '={{$parameter.additionalFields_GetExpiredDomains.pinterest_pins_min}}',
								referring_domains_max: '={{$parameter.additionalFields_GetExpiredDomains.referring_domains_max}}',
								referring_domains_min: '={{$parameter.additionalFields_GetExpiredDomains.referring_domains_min}}',
								root_domain_exclude: '={{$parameter.additionalFields_GetExpiredDomains.root_domain_exclude}}',
								root_domain_include: '={{$parameter.additionalFields_GetExpiredDomains.root_domain_include}}',
								total_domains_max: '={{$parameter.additionalFields_GetExpiredDomains.total_domains_max}}',
								total_domains_min: '={{$parameter.additionalFields_GetExpiredDomains.total_domains_min}}',
								total_keywords_max: '={{$parameter.additionalFields_GetExpiredDomains.total_keywords_max}}',
								total_keywords_min: '={{$parameter.additionalFields_GetExpiredDomains.total_keywords_min}}',
								total_pages_max: '={{$parameter.additionalFields_GetExpiredDomains.total_pages_max}}',
								total_pages_min: '={{$parameter.additionalFields_GetExpiredDomains.total_pages_min}}',
								total_top_10_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_10_positions_max}}',
								total_top_10_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_10_positions_min}}',
								total_top_10_traffic_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_10_traffic_max}}',
								total_top_10_traffic_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_10_traffic_min}}',
								total_top_100_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_100_positions_max}}',
								total_top_100_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_100_positions_min}}',
								total_top_100_traffic_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_100_traffic_max}}',
								total_top_100_traffic_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_100_traffic_min}}',
								total_top_3_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_3_positions_max}}',
								total_top_3_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_3_positions_min}}',
								total_top_3_traffic_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_3_traffic_max}}',
								total_top_3_traffic_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_3_traffic_min}}',
								total_top_50_positions_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_50_positions_max}}',
								total_top_50_positions_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_50_positions_min}}',
								total_top_50_traffic_max: '={{$parameter.additionalFields_GetExpiredDomains.total_top_50_traffic_max}}',
								total_top_50_traffic_min: '={{$parameter.additionalFields_GetExpiredDomains.total_top_50_traffic_min}}',
								total_traffic_max: '={{$parameter.additionalFields_GetExpiredDomains.total_traffic_max}}',
								total_traffic_min: '={{$parameter.additionalFields_GetExpiredDomains.total_traffic_min}}',
							},
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
							body: {
								categories_exclude: '={{$parameter.additionalFields_GetGMBBacklink.categories_exclude}}',
								categories_include: '={{$parameter.additionalFields_GetGMBBacklink.categories_include}}',
								input: '={{$parameter.input}}',
								is_claimed: '={{$parameter.additionalFields_GetGMBBacklink.is_claimed}}',
								latitude_keep_na: '={{$parameter.additionalFields_GetGMBBacklink.latitude_keep_na}}',
								latitude_max: '={{$parameter.additionalFields_GetGMBBacklink.latitude_max}}',
								latitude_min: '={{$parameter.additionalFields_GetGMBBacklink.latitude_min}}',
								lineCount: '={{$parameter.lineCount}}',
								longitude_keep_na: '={{$parameter.additionalFields_GetGMBBacklink.longitude_keep_na}}',
								longitude_max: '={{$parameter.additionalFields_GetGMBBacklink.longitude_max}}',
								longitude_min: '={{$parameter.additionalFields_GetGMBBacklink.longitude_min}}',
								mode: '={{$parameter.mode}}',
								order: '={{$parameter.additionalFields_GetGMBBacklink.order}}',
								order_by: '={{$parameter.order_by_backlink}}',
								page: '={{$parameter.page}}',
								rating_count_keep_na: '={{$parameter.additionalFields_GetGMBBacklink.rating_count_keep_na}}',
								rating_count_max: '={{$parameter.additionalFields_GetGMBBacklink.rating_count_max}}',
								rating_count_min: '={{$parameter.additionalFields_GetGMBBacklink.rating_count_min}}',
								rating_value_keep_na: '={{$parameter.additionalFields_GetGMBBacklink.rating_value_keep_na}}',
								rating_value_max: '={{$parameter.additionalFields_GetGMBBacklink.rating_value_max}}',
								rating_value_min: '={{$parameter.additionalFields_GetGMBBacklink.rating_value_min}}',
							},
						},
					},
				},
				// Operation : GetHistoryofDomainPages
				{
					name: 'Get History of Domain Pages',
					value: 'GetHistoryofDomainPages',
					action: 'Get history of domain pages',
					description: 'Fetches metrics for specific pages of a domain',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/pagesHistory',
							body: {
								date_from: '={{$parameter.date_from}}',
								date_to: '={{$parameter.date_to}}',
								input: '={{$parameter.input}}',
								known_versions_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.known_versions_max}}',
								known_versions_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.known_versions_min}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								order: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.order}}',
								order_by: '={{$parameter.order_by_pagehistory}}',
								page: '={{$parameter.page}}',
								total_top_10_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_10_max}}',
								total_top_10_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_10_min}}',
								total_top_100_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_100_max}}',
								total_top_100_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_100_min}}',
								total_top_3_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_3_max}}',
								total_top_3_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_3_min}}',
								total_top_50_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_50_max}}',
								total_top_50_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_top_50_min}}',
								total_traffic_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_traffic_max}}',
								total_traffic_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.total_traffic_min}}',
								unique_keywords_max: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.unique_keywords_max}}',
								unique_keywords_min: '={{$parameter.additionalFields_GetDomainTopPagesGetHistoryofDomainPages.unique_keywords_min}}',
							},
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
							body: {
								allintitle_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.competition_max}}',
								competition_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.competition_min}}',
								cpc_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.cpc_min}}',
								input: '={{$parameter.input}}',
								keyword_exclude: '={{$parameter.additionalFields_GetKeywordDatafromURL.keyword_exclude}}',
								keyword_include: '={{$parameter.additionalFields_GetKeywordDatafromURL.keyword_include}}',
								keywords: '={{$parameter.keywords_bestposition}}',
								kgr_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields_GetKeywordDatafromURL.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								order: '={{$parameter.additionalFields_GetKeywordDatafromURL.order}}',
								order_by: '={{$parameter.order_by_competitor_keyworddata}}',
								page: '={{$parameter.page}}',
								position_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.position_max}}',
								position_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.position_min}}',
								serp_date_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.serp_date_max}}',
								serp_date_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.serp_date_min}}',
								title_exclude: '={{$parameter.additionalFields_GetKeywordDatafromURL.title_exclude}}',
								title_include: '={{$parameter.additionalFields_GetKeywordDatafromURL.title_include}}',
								title_word_count_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.title_word_count_max}}',
								title_word_count_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.title_word_count_min}}',
								traffic_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.traffic_max}}',
								traffic_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.traffic_min}}',
								volume_max: '={{$parameter.additionalFields_GetKeywordDatafromURL.volume_max}}',
								volume_min: '={{$parameter.additionalFields_GetKeywordDatafromURL.volume_min}}',
							},
						},
					},
				},
				// Operation : GetRankingofDomainKeyword
				{
					name: 'Get Ranking of Domain Keyword',
					value: 'GetRankingofDomainKeyword',
					action: 'Get ranking of domain keyword',
					description: 'Fetches a current domain rankings for a domain or URL',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/domains/positions',
							body: {
								allintitle_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.allintitle_max}}',
								allintitle_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.allintitle_min}}',
								competition_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.competition_max}}',
								competition_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.competition_min}}',
								cpc_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.cpc_max}}',
								cpc_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.cpc_min}}',
								input: '={{$parameter.input}}',
								keyword_exclude: '={{$parameter.additionalFields_GetRankingofDomainKeyword.keyword_exclude}}',
								keyword_include: '={{$parameter.additionalFields_GetRankingofDomainKeyword.keyword_include}}',
								keyword_word_count_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.keyword_word_count_max}}',
								keyword_word_count_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.keyword_word_count_min}}',
								kgr_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.kgr_max}}',
								kgr_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.kgr_min}}',
								kvi_keep_na: '={{$parameter.additionalFields_GetRankingofDomainKeyword.kvi_keep_na}}',
								kvi_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.kvi_max}}',
								kvi_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.kvi_min}}',
								lineCount: '={{$parameter.lineCount}}',
								mode: '={{$parameter.mode}}',
								order: '={{$parameter.additionalFields_GetRankingofDomainKeyword.order}}',
								order_by: '={{$parameter.order_by_ranking}}',
								page: '={{$parameter.page}}',
								position_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.position_max}}',
								position_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.position_min}}',
								serp_date_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.serp_date_max}}',
								serp_date_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.serp_date_min}}',
								title_exclude: '={{$parameter.additionalFields_GetRankingofDomainKeyword.title_exclude}}',
								title_include: '={{$parameter.additionalFields_GetRankingofDomainKeyword.title_include}}',
								traffic_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.traffic_max}}',
								traffic_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.traffic_min}}',
								volume_max: '={{$parameter.additionalFields_GetRankingofDomainKeyword.volume_max}}',
								volume_min: '={{$parameter.additionalFields_GetRankingofDomainKeyword.volume_min}}',
							},
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
							body: {
								input: '={{$parameter.input_visibility_bestkeyword}}',
								mode: '={{$parameter.mode}}',
								type: '={{$parameter.type}}',
							},
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
							body: {
								root_domain_keys: '={{$parameter.root_domain_keys.toInt()}}'
							},
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
						//'GetKeywordSiteStructure',
					],
				},
			},
			routing: {
			send: {
				property: 'keywords',
				type: 'body',
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
		// parameter : keywords_siteStructure
		{
			displayName: 'Keywords',
			description: 'Requested keywords in an array if requesting bulk data. Must contain at least 50 keywords.',
			name: 'keywords_siteStructure',
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
			routing: {
			send: {
				property: 'keywords',
				type: 'body',
				},
			},
		},
		// parameter : keywords_siteStructure2
		{
			displayName: 'Keywords Mapped_array',
			description: 'Requested keywords in an array if requesting bulk data. Must contain at least 50 keywords. If you have mappped array, put it in this field.',
			name: 'keywords_siteStructure2',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['keywordExplorer'],
					operation: ['GetKeywordSiteStructure'],
				},
			},
			/*routing: {
			send: {
				property: 'keywords',
				type: 'body',
				},
			},*/
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
		// parameter : mode_structure
		{
			displayName: 'Mode',
			description: 'Defines how groups will be made. Manual means that keywords will be grouped when they share at least \'manual_common_10\' URLs in their last SERP top 10 AND at least \'manual_common_100\' URLS in their last SERP top 100. Multi means that keywords will be automatically grouped (hierarchically) depending on their proximity on several modalities specified in \'multipartite_modes\'. You can also influence the attraction force with the \'granularity\' parameter.',
			name: 'mode_structure',
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
			default: 100,
			typeOptions: {
          minValue: 0,
          maxValue: 100
        },
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
			default: 0,
			typeOptions: {
          minValue: 0,
          maxValue: 100
        },
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

		// required site explorer:

		//inputs
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
		//input_domain
		{
			displayName: "Input",
			description: 'Requested URL, domain or root domain',
			name: "input_domain",
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
		//input_visibility_bestkeyword
		{
			displayName: "Input",
			description: 'Array containing the requested URLs or domains',
			name: "input_visibility_bestkeyword",
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
		//input
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
		//competitors_bestposition
		{
			displayName: "Competitors",
			description: "List of competitor domains or root domains",
			name: "competitors_bestposition",
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
		//keywords_bestposition
		{
			displayName: "Keywords",
			description: "List of keywords to look for",
			name: "keywords_bestposition",
			default: [],
			required: true,
			displayOptions: {
				show: {
					resource: [
							"siteExplorer"
						],
					operation: [
							"GetCompetitorsKeywordsBestPosition",
							"GetKeywordDatafromURL"
						]
					}
				},
			type: "string",
			typeOptions: {
				multipleValues: true
				}
		},
		//date_from
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
		//date_to
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
		//root_domain_keys
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
		//requested_data
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

		//optional site explorer

		//competitors
		{
			displayName: "Competitors",
			description: "List of competitors to compare the input to",
			name: "competitors",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"CompareDomainKeywordswithCompetitors",
						"GetCompetitorBestPages"
					]
				}
			},
			type: "string",
			default: ['auto'],
			typeOptions: {
				multipleValues: true
			}
		},
		//acceptedTypes
		{
			displayName: "Accepted Types",
			description: "That\'s just a filter, it\'s not necessary to use it if you used the matching boolean params (using the boolean params makes it faster). The only difference is that with this, you can separate mixed keywords, where seed is better than some competitors and less good than others. Hence, bested and besting become absolute: bested by every single competitor (that is there), or besting every single competitor",
			name: "acceptedTypes",
			default: [
				'auto'
			],
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"CompareDomainKeywordswithCompetitors"
					]
				}
			},
			type: "multiOptions",
			options: [
				{
					name: "Auto",
					value: "auto"
				},
				{
					name: "Bested",
					value: "bested"
				},
				{
					name: "Besting",
					value: "besting"
				},
				{
					name: "Exclusive",
					value: "exclusive"
				},
				{
					name: "Missing",
					value: "missing"
				},
				{
					name: "Mixed",
					value: "mixed"
				}
			]
		},
		//strategy
		{
			displayName: "Strategy",
			description: "Whether to return all positioned keywords, only active ones or only lost ones",
			name: "strategy",
			default: "both",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetBestKeywordsfromPage"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Both Active & Lost Keywords",
					value: "both"
				},
				{
					name: "Only Active Keywords",
					value: "only_active"
				},
				{
					name: "Only Lost Keywords",
					value: "only_lost"
				}
			]
		},
		//missing
		{
			displayName: "Missing",
			description: "Whether to include positions where the search input is not positioned, and at least one of the requested competitors is",
			name: "missing",
			default: false,
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"CompareDomainKeywordswithCompetitors"
					]
				}
			},
			type: "boolean"
		},
		//besting
		{
			displayName: "Besting",
			description: "Whether to include positions where the search input is positioned, and better positioned than at least one of the requested competitors",
			name: "besting",
			default: false,
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"CompareDomainKeywordswithCompetitors"
					]
				}
			},
			type: "boolean"
		},
		//bested
		{
			displayName: "Bested",
			description: "Whether to include positions where the search input is positioned, but at least one of the requested competitors is positioned better",
			name: "bested",
			default: false,
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"CompareDomainKeywordswithCompetitors"
					]
				}
			},
			type: "boolean"
		},
		//exclusive
		{
			displayName: "Exclusive",
			description: "Whether to include positions where only the search input is positioned, and none of the requested competitors is",
			name: "exclusive",
			default: false,
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"CompareDomainKeywordswithCompetitors"
					]
				}
			},
			type: "boolean"
		},
		//type
		{
			displayName: "Type",
			description: "Determines how returned values are computed",
			name: "type",
			default: "trends",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetVisibilityTrendofDomains"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "First",
					value: "first"
				},
				{
					name: "Highest",
					value: "highest"
				},
				{
					name: "Index",
					value: "index"
				},
				{
					name: "Trends",
					value: "trends"
				}
			]
		},
		//lang
		{
			displayName: "Languages",
			description: 'Only used in conjunction with "categories" in requested_data, the label field will be translated if a different language than english is requested. Original value is also present.',
			name: "lang",
			default: "en",
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
			type: "options",
			options: [
				{
					name: "English",
					value: "en"
				},
				{
					name: "French",
					value: "fr"
				}
			]
		},
		//mode_bestposition
		{
			displayName: "Mode",
			description: "Whether to look for a root domain or subdomain",
			name: "mode_bestposition",
			default: "root",
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
			type: "options",
			options: [
				{
					name: "Domain",
					value: "domain"
				},
				{
					name: "Root",
					value: "root"
				}
			]
		},
		//keyword_expired
		{
			displayName: "Keyword",
			description: "Only keep expired domains that were positioned on keywords matching this expression",
			name: "keyword_expired",
			default: "",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetExpiredDomains"
					]
				}
			},
			type: "string"
		},
		//lineCount_bestkeyword
		{
			displayName: "Line Count",
			description: "Number of keywords to return. Between 1 and 10.",
			name: "lineCount_bestkeyword",
			default: 3,
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetBestKeywordsfromPage"
					]
				}
			},
			type: "number",
			typeOptions: {
				minValue: 1,
				maxValue: 10
			}
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
					resource: ['keywordExplorer', 'siteExplorer'],
					operation: [
						'FindKeyword',
						'FindKeywordSynonym',
						'FindKeywordsMatch',
						'FindRelatedKeyword',
						'FindSimilarKeyword',
						'GetKeywordDatainBulk',
						'GetKeywordHighlight',
						'GetKeywordQuestion',
						'CompareDomainKeywordswithCompetitors',
						'GetCompetitorBestPages',
						'GetCompetitorsKeywordsBestPosition',
						'GetDomainCompetitors',
						'GetDomainDatainBulk',
						'GetDomainPositionHistory',
						'GetDomainTopPages',
						'GetExpiredDomains',
						'GetGMBBacklink',
						'GetHistoryofDomainPages',
						'GetKeywordDatafromURL',
						'GetRankingofDomainKeyword'
					],
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
					resource: ['keywordExplorer', 'siteExplorer'],
					operation: [
						'FindKeyword',
						'FindKeywordSynonym',
						'FindKeywordsMatch',
						'FindRelatedKeyword',
						'FindSimilarKeyword',
						'GetKeywordDatainBulk',
						'GetKeywordHighlight',
						'GetKeywordQuestion',
						'CompareDomainKeywordswithCompetitors',
						'GetCompetitorBestPages',
						'GetCompetitorsKeywordsBestPosition',
						'GetDomainCompetitors',
						'GetDomainDatainBulk',
						'GetDomainPositionHistory',
						'GetDomainTopPages',
						'GetExpiredDomains',
						'GetGMBBacklink',
						'GetHistoryofDomainPages',
						'GetKeywordDatafromURL',
						'GetRankingofDomainKeyword'
					],
				},
			},
		},
		//mode
		{
			displayName: "Mode",
			description: 'Whether to look for a domain or a full URL. Leave empty for auto detection.',
			name: "mode",
			default: "auto",
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
						"GetDomainDatainBulk",
						"GetDomainGMBBacklinksMap",
						"GetDomainOverview",
						"GetDomainPositionHistory",
						"GetDomainTopPages",
						"GetGMBBacklink",
						"GetHistoryofDomainPages",
						"GetKeywordDatafromURL",
						"GetRankingofDomainKeyword",
						"GetVisibilityTrendofDomains"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Auto",
					value: "auto"
				},
				{
					name: "Domain",
					value: "domain"
				},
				{
					name: "Root",
					value: "root"
				},
				{
					name: "URL",
					value: "url"
				}
			]
		},
		//order_by_bestposition
		{
			displayName: "Order By",
			description: 'Field used for sorting results. "default" value first sorts by descending unique_competitors_count, then by descending best_competitor_traffic.',
			name: "order_by_bestposition",
			default: "default",
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
			type: "options",
			options: [
				{
					name: "Ads Volume",
					value: "ads_volume"
				},
				{
					name: "Allintitle",
					value: "allintitle"
				},
				{
					name: "Best Competitor Position",
					value: "best_competitor_position"
				},
				{
					name: "Best Competitor Traffic",
					value: "best_competitor_traffic"
				},
				{
					name: "Best Competitor URL",
					value: "best_competitor_url"
				},
				{
					name: "Best Reference Position",
					value: "best_reference_position"
				},
				{
					name: "Best Reference Traffic",
					value: "best_reference_traffic"
				},
				{
					name: "Best Reference URL",
					value: "best_reference_url"
				},
				{
					name: "Competition",
					value: "competition"
				},
				{
					name: "Competitors Positions",
					value: "competitors_positions"
				},
				{
					name: "CPC",
					value: "cpc"
				},
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Keyword",
					value: "keyword"
				},
				{
					name: "KGR",
					value: "kgr"
				},
				{
					name: "KVI",
					value: "kvi"
				},
				{
					name: "Result Count",
					value: "result_count"
				},
				{
					name: "Type",
					value: "type"
				},
				{
					name: "Unique Competitors Count",
					value: "unique_competitors_count"
				},
				{
					name: "Volume",
					value: "volume"
				},
				{
					name: "Word Count",
					value: "word_count"
				}
			]
		},
		//order_by_domain_history
		{
			displayName: "Order By",
			description: 'Field used for sorting results. Default sorts by descending traffic and then ascending position.',
			name: "order_by_domain_history",
			default: "default",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetDomainPositionHistory",
						"GetDomainTopPages"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Allintitle",
					value: "allintitle"
				},
				{
					name: "Competition",
					value: "competition"
				},
				{
					name: "CPC",
					value: "cpc"
				},
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Keyword",
					value: "keyword"
				},
				{
					name: "KGR",
					value: "kgr"
				},
				{
					name: "Last Scrap",
					value: "last_scrap"
				},
				{
					name: "Position",
					value: "position"
				},
				{
					name: "Result Count",
					value: "result_count"
				},
				{
					name: "Traffic",
					value: "traffic"
				},
				{
					name: "URL",
					value: "url"
				},
				{
					name: "Volume",
					value: "volume"
				},
				{
					name: "Word Count",
					value: "word_count"
				}
			]
		},
		//order_by_competitor_keyworddata
		{
			displayName: "Order By",
			description: "Field used for sorting results",
			name: "order_by_competitor_keyworddata",
			default: "default",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetCompetitorBestPages"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Bested Keywords",
					value: "bested_keywords"
				},
				{
					name: "Besting Keywords",
					value: "besting_keywords"
				},
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Exclusive Keywords",
					value: "exclusive_keywords"
				},
				{
					name: "Keywords",
					value: "keywords"
				},
				{
					name: "Most Alike URL",
					value: "most_alike_url"
				},
				{
					name: "Positions",
					value: "positions"
				},
				{
					name: "Total Traffic",
					value: "total_traffic"
				},
				{
					name: "URL",
					value: "url"
				}
			]
		},
		// order_by_bulk
		{
			displayName: "Order By",
			description: "Field used for sorting results",
			name: "order_by_bulk",
			default: "keep",
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
			type: "options",
			options: [
				{
					name: "First Time Seen",
					value: "first_time_seen"
				},
				{
					name: "Indexed Pages",
					value: "indexed_pages"
				},
				{
					name: "Keep",
					value: "keep"
				},
				{
					name: "Last Time Seen",
					value: "last_time_seen"
				},
				{
					name: "Name",
					value: "name"
				},
				{
					name: "Total Top 10",
					value: "total_top_10"
				},
				{
					name: "Total Top 100",
					value: "total_top_100"
				},
				{
					name: "Total Top 3",
					value: "total_top_3"
				},
				{
					name: "Total Top 50",
					value: "total_top_50"
				},
				{
					name: "Total Traffic",
					value: "total_traffic"
				},
				{
					name: "Total Traffic Value",
					value: "total_traffic_value"
				},
				{
					name: "Type",
					value: "type"
				},
				{
					name: "Unique Keywords",
					value: "unique_keywords"
				}
			]
		},
		//order_by_expired
		{
			displayName: "Order By",
			description: "Field used for sorting results. Default sort is by descending matching_traffic if keyword is present, or total_traffic otherwise.",
			name: "order_by_expired",
			default: "default",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetExpiredDomains"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Facebook Comments",
					value: "fb_comments"
				},
				{
					name: "Facebook Shares",
					value: "fb_shares"
				},
				{
					name: "First Seen",
					value: "first_seen"
				},
				{
					name: "First Time Available",
					value: "first_time_available"
				},
				{
					name: "Last Seen",
					value: "last_seen"
				},
				{
					name: "Last Time Available",
					value: "last_time_available"
				},
				{
					name: "Matching Keywords",
					value: "matching_keywords"
				},
				{
					name: "Matching Most Recent Position",
					value: "matching_most_recent_position"
				},
				{
					name: "Matching Pages",
					value: "matching_pages"
				},
				{
					name: 'Matching Top 10 Positions',
					value: "matching_top_10_positions"
				},
				{
					name: "Matching Top 100",
					value: "matching_top_100"
				},
				{
					name: 'Matching Top 3 Positions',
					value: "matching_top_3_positions"
				},
				{
					name: 'Matching Top 50 Positions',
					value: "matching_top_50_positions"
				},
				{
					name: "Matching Traffic",
					value: "matching_traffic"
				},
				{
					name: "Median Position Date",
					value: "median_position_date"
				},
				{
					name: "Median Position Strength",
					value: "median_position_strength"
				},
				{
					name: "Referring Domains",
					value: "referring_domains"
				},
				{
					name: "Total Domains",
					value: "total_domains"
				},
				{
					name: "Total Keywords",
					value: "total_keywords"
				},
				{
					name: "Total Pages",
					value: "total_pages"
				},
				{
					name: "Total Top 10 Positions",
					value: "total_top_10_positions"
				},
				{
					name: "Total Top 10 Traffic",
					value: "total_top_10_traffic"
				},
				{
					name: "Total Top 100 Positions",
					value: "total_top_100_positions"
				},
				{
					name: "Total Top 100 Traffic",
					value: "total_top_100_traffic"
				},
				{
					name: "Total Top 3 Positions",
					value: "total_top_3_positions"
				},
				{
					name: "Total Top 3 Traffic",
					value: "total_top_3_traffic"
				},
				{
					name: "Total Top 50 Positions",
					value: "total_top_50_positions"
				},
				{
					name: "Total Top 50 Traffic",
					value: "total_top_50_traffic"
				},
				{
					name: "Total Traffic",
					value: "total_traffic"
				}
			]
		},
		//order_by_ranking
		{
			displayName: "Order By",
			description: "Field used for sorting results. Defaut sort is by descending traffic, then ascending position.",
			name: "order_by_ranking",
			default: "default",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetRankingofDomainKeyword"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Allintitle",
					value: "allintitle"
				},
				{
					name: "Competition",
					value: "competition"
				},
				{
					name: "CPC",
					value: "cpc"
				},
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Keyword",
					value: "keyword"
				},
				{
					name: "KGR",
					value: "kgr"
				},
				{
					name: "Last Scrap",
					value: "last_scrap"
				},
				{
					name: "Position",
					value: "position"
				},
				{
					name: "Result Count",
					value: "result_count"
				},
				{
					name: "Traffic",
					value: "traffic"
				},
				{
					name: "URL",
					value: "url"
				},
				{
					name: "Volume",
					value: "volume"
				},
				{
					name: "Word Count",
					value: "word_count"
				}
			]
		},
		//order_by_backlink
		{
			displayName: "Order By",
			description: "Field used for sorting results. Default value first sorts by descending rating_count, then by descending rating_value.",
			name: "order_by_backlink",
			default: "default",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetGMBBacklink"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Address",
					value: "address"
				},
				{
					name: "Categories",
					value: "categories"
				},
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Domain",
					value: "domain"
				},
				{
					name: "Is_claimed",
					value: "is_claimed"
				},
				{
					name: "Latitude",
					value: "latitude"
				},
				{
					name: "Longitude",
					value: "longitude"
				},
				{
					name: "Name",
					value: "name"
				},
				{
					name: "Phone",
					value: "phone"
				},
				{
					name: "Rating Count",
					value: "rating_count"
				},
				{
					name: "Rating Value",
					value: "rating_value"
				},
				{
					name: "Root Domain",
					value: "root_domain"
				},
				{
					name: "Total Photos",
					value: "total_photos"
				},
				{
					name: "URL",
					value: "url"
				}
			]
		},
		// order_by_pagehistory
		{
			displayName: "Order By",
			description: 'Field used for sorting results. Default sorts by descending traffic and then ascending position.',
			name: "order_by_pagehistory",
			default: "default",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetHistoryofDomainPages"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Domain",
					value: "domain"
				},
				{
					name: "First Time Seen",
					value: "first_time_seen"
				},
				{
					name: "Known Versions",
					value: "known_versions"
				},
				{
					name: "Last Time Seen",
					value: "last_time_seen"
				},
				{
					name: "Total Top 10",
					value: "total_top_10"
				},
				{
					name: "Total Top 100",
					value: "total_top_100"
				},
				{
					name: "Total Top 3",
					value: "total_top_3"
				},
				{
					name: "Total Top 50",
					value: "total_top_50"
				},
				{
					name: "Total Traffic",
					value: "total_traffic"
				},
				{
					name: "Total Traffic Value",
					value: "total_traffic_value"
				},
				{
					name: "Unique Keywords",
					value: "unique_keywords"
				},
				{
					name: "URL",
					value: "url"
				}
			]
		},
		//order_by_keywords
		{
			displayName: "Order By",
			description: "Field used for sorting results",
			name: "order_by_keywords",
			default: "default",
			displayOptions: {
				show: {
					resource: [
						"siteExplorer"
					],
					operation: [
						"GetKeywordDatafromURL"
					]
				}
			},
			type: "options",
			options: [
				{
					name: "Allintitle",
					value: "allintitle"
				},
				{
					name: "Competition",
					value: "competition"
				},
				{
					name: "CPC",
					value: "cpc"
				},
				{
					name: "Default",
					value: "default"
				},
				{
					name: "Keyword",
					value: "keyword"
				},
				{
					name: "KGR",
					value: "kgr"
				},
				{
					name: "Volume",
					value: "volume"
				}
			]
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
				//parameter : allintitle_max
				{
					displayName: 'Maximum Allintitle',
					name: 'allintitle_max',
					type: 'number',
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
				//parameter : cpc_min
				{
					displayName: 'Minimum CPC',
					name: 'cpc_mmin',
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
				//parameter : allintitle_max
				{
					displayName: 'Maximum Allintitle',
					name: 'allintitle_max',
					type: 'number',
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
				//parameter : cpc_min
				{
					displayName: 'Minimum CPC',
					name: 'cpc_mmin',
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
					//parameter : allintitle_max
				{
					displayName: 'Maximum Allintitle',
					name: 'allintitle_max',
					type: 'number',
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
				//parameter : cpc_min
				{
					displayName: 'Minimum CPC',
					name: 'cpc_min',
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

		/* additional fields for:
						CompareDomainKeywordswithCompetitors*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_CompareDomainKeywordswithCompetitors",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "CompareDomainKeywordswithCompetitors"
        ]
      }
    },
    options: [
      {
        displayName: "Allintitle Keep NA",
        name: "allintitle_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Best Competitor Traffic Keep NA",
        name: "best_competitor_traffic_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Best Reference Traffic Keep NA",
        name: "best_reference_traffic_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Competition Keep NA",
        name: "competition_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "CPC Keep NA",
        name: "cpc_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Google Indexed Keep NA",
        name: "google_indexed_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Keyword Excluded",
        name: "keyword_exclude",
        default: "",
        description: "Regular expression for keywords to be excluded",
        type: "string"
      },
      {
        displayName: "Keyword Included",
        name: "keyword_include",
        default: "",
        description: "Regular expression for keywords to be included",
        type: "string"
      },
      {
        displayName: "KGR Keep NA",
        name: "kgr_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "KVI Keep NA",
        name: "kvi_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Maximum Allintitle",
        name: "allintitle_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Best Competitor Position",
        name: "best_competitor_position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Best Competitor Traffic",
        name: "best_competitor_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Best Reference Position",
        name: "best_reference_position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Best Reference Traffic",
        name: "best_reference_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Competition",
        name: "competition_max",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Maximum Competitors Positions",
        name: "competitors_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum CPC",
        name: "cpc_max",
        default: null,
        type: "number"
      },
      {
        displayName: 'Maximum Google Indexed',
        name: "google_indexed_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Keyword Word Count",
        name: "keyword_word_count_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KGR",
        name: "kgr_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KVI",
        name: "kvi_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Unique Competitors Count",
        name: "unique_competitors_count_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Volume",
        name: "volume_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Allintitle",
        name: "allintitle_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Best Competitor Position",
        name: "best_competitor_position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Best Competitor Traffic",
        name: "best_competitor_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Best Reference Position",
        name: "best_reference_position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Best Reference Traffic",
        name: "best_reference_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Competition",
        name: "competition_min",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Minimum Competitors Positions",
        name: "competitors_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum CPC",
        name: "cpc_min",
        default: null,
        type: "number"
      },
      {
        displayName: 'Minimum Google Indexed',
        name: "google_indexed_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Keyword Word Count",
        name: "keyword_word_count_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KGR",
        name: "kgr_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KVI",
        name: "kvi_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Unique Competitors Count",
        name: "unique_competitors_count_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Volume",
        name: "volume_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Order By",
        name: "order_by",
        default: "default",
        description: 'Field used for sorting results. "default" value first sorts by descending unique_competitors_count, then by descending best_competitor_traffic.',
        type: "options",
        options: [
          {
            name: "Allintitle",
            value: "allintitle"
          },
          {
            name: "Best Competitor Position",
            value: "best_competitor_position"
          },
          {
            name: "Best Competitor Traffic",
            value: "best_competitor_traffic"
          },
          {
            name: "Best Competitor URL",
            value: "best_competitor_url"
          },
          {
            name: "Best Reference Position",
            value: "best_reference_position"
          },
          {
            name: "Best Reference Traffic",
            value: "best_reference_traffic"
          },
          {
            name: "Best Reference URL",
            value: "best_reference_url"
          },
          {
            name: "Competition",
            value: "competition"
          },
          {
            name: "Competitors Positions",
            value: "competitors_positions"
          },
          {
            name: "CPC",
            value: "cpc"
          },
          {
            name: "Default",
            value: "default"
          },
          {
            name: "Keyword",
            value: "keyword"
          },
          {
            name: "KGR",
            value: "kgr"
          },
          {
            name: "Result Count",
            value: "result_count"
          },
          {
            name: "Type",
            value: "type"
          },
          {
            name: "Unique Competitors Count",
            value: "unique_competitors_count"
          },
          {
            name: "Volume",
            value: "volume"
          },
          {
            name: "Word Count",
            value: "word_count"
          }
        ]
      },
      {
        displayName: "Volume Keep NA",
        name: "volume_keep_na",
        default: false,
        type: "boolean"
      },
    ]
  },

	/* additional fields for:
						GetCompetitorsKeywordsBestPosition*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetCompetitorsKeywordsBestPosition",
    type: "collection",
    default: {},
    placeholder: "Add Field",
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
    options: [
      {
        displayName: "Allintitle Keep NA",
        name: "allintitle_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Best Competitor Traffic Keep NA",
        name: "best_competitor_traffic_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Competition Keep NA",
        name: "competition_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "CPC Keep NA",
        name: "cpc_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Keyword Excluded",
        name: "keyword_exclude",
        default: "",
        description: "Regular expression for keywords to be excluded",
        type: "string"
      },
      {
        displayName: "Keyword Included",
        name: "keyword_include",
        default: "",
        description: "Regular expression for keywords to be included",
        type: "string"
      },
      {
        displayName: "KGR Keep NA",
        name: "kgr_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "KVI Keep NA",
        name: "kvi_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Maximum Allintitle",
        name: "allintitle_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Best Competitor Position",
        name: "best_competitor_position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Best Competitor Traffic",
        name: "best_competitor_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Competition",
        name: "competition_max",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Maximum Competitors Positions",
        name: "competitors_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum CPC",
        name: "cpc_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Keyword Word Count",
        name: "keyword_word_count_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KGR",
        name: "kgr_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KVI",
        name: "kvi_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Unique Competitors Count",
        name: "unique_competitors_count_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Volume",
        name: "volume_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Allintitle",
        name: "allintitle_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Best Competitor Position",
        name: "best_competitor_position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Best Competitor Traffic",
        name: "best_competitor_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Competition",
        name: "competition_min",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Minimum Competitors Positions",
        name: "competitors_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum CPC",
        name: "cpc_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Keyword Word Count",
        name: "keyword_word_count_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KGR",
        name: "kgr_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KVI",
        name: "kvi_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Unique Competitors Count",
        name: "unique_competitors_count_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Volume",
        name: "volume_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Volume Keep NA",
        name: "volume_keep_na",
        default: false,
        type: "boolean"
      },
    ]
  },

	/* additional fields for:
						GetDomainPositionHistory*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetDomainPositionHistory",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "GetDomainPositionHistory"
        ]
      }
    },
    options: [
      {
        displayName: "Keyword Excluded",
        name: "keyword_exclude",
        default: "",
        description: "Regular expression for keywords to be excluded",
        type: "string"
      },
      {
        displayName: "Keyword Included",
        name: "keyword_include",
        default: "",
        description: "Regular expression for keywords to be included",
        type: "string"
      },
      {
        displayName: "KVI Keep NA",
        name: "kvi_keep_na",
        default: false,
        type: "boolean"
      },
			{
        displayName: "Maximum Allintitle",
        name: "allintitle_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Best Position",
        name: "best_position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Competition",
        name: "competition_max",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Maximum CPC",
        name: "cpc_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum First Time Seen",
        name: "first_time_seen_max",
        default: "",
        description: "Date with YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Maximum KGR",
        name: "kgr_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KVI",
        name: "kvi_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Last Time Seen",
        name: "last_time_seen_max",
        default: "",
        description: "Date with YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Maximum Most Recent Position",
        name: "most_recent_position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Page Count",
        name: "page_count_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Subdomain Count",
        name: "subdomain_count_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Volume",
        name: "volume_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Word Count",
        name: "word_count_max",
        default: null,
        description: "Max number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Maximum Worst Position",
        name: "worst_position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Allintitle",
        name: "allintitle_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Best Position",
        name: "best_position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Competition",
        name: "competition_min",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Minimum CPC",
        name: "cpc_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum First Time Seen",
        name: "first_time_seen_min",
        default: "",
        description: "Date with YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Minimum KGR",
        name: "kgr_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KVI",
        name: "kvi_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Last Time Seen",
        name: "last_time_seen_min",
        default: "",
        description: "Date with YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Minimum Most Recent Position",
        name: "most_recent_position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Page Count",
        name: "page_count_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Subdomain Count",
        name: "subdomain_count_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Volume",
        name: "volume_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Word Count",
        name: "word_count_min",
        default: null,
        description: "Min number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Minimum Worst Position",
        name: "worst_position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Order",
        name: "order",
        default: "asc",
        description: "Whether the results are sorted in ascending or descending order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "asc"
          },
          {
            name: "Descending",
            value: "desc"
          }
        ]
      },
      {
        displayName: "Still There",
        name: "still_there",
        default: false,
        description: "Whether to keep certain positions.When TRUE, only keep positions that are still held. When FALSE, only keep positions that were lost. Leave empty if you don't want to filter.",
        type: "boolean"
      },
    ]
  },

	/* additional fields for:
						GetKeywordDatafromURL*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetKeywordDatafromURL",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "GetKeywordDatafromURL"
        ]
      }
    },
    options: [
      {
        displayName: "Exclude Title",
        name: "title_exclude",
        default: "",
        description: "Regular expression for titles to be excluded",
        type: "string"
      },
      {
        displayName: "Include Title",
        name: "title_include",
        default: "",
        description: "Regular expression for titles to be included",
        type: "string"
      },
      {
        displayName: "Keyword Excluded",
        name: "keyword_exclude",
        default: "",
        description: "Regular expression for keywords to be excluded",
        type: "string"
      },
      {
        displayName: "Keyword Included",
        name: "keyword_include",
        default: "",
        description: "Regular expression for keywords to be included",
        type: "string"
      },
      {
        displayName: "KVI Keep NA",
        name: "kvi_keep_na",
        default: false,
        type: "boolean"
      },
			{
        displayName: "Maximum Allintitle",
        name: "allintitle_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Competition",
        name: "competition_max",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Maximum CPC",
        name: "cpc_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KGR",
        name: "kgr_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KVI",
        name: "kvi_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Position",
        name: "position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum SERP Date",
        name: "serp_date_max",
        default: "",
        type: "string"
      },
      {
        displayName: "Maximum Title Word Count",
        name: "title_word_count_max",
        default: null,
        description: "Max number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Maximum Traffic",
        name: "traffic_max",
        default: null,
        description: "Max number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Maximum Volume",
        name: "volume_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Allintitle",
        name: "allintitle_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Competition",
        name: "competition_min",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Minimum CPC",
        name: "cpc_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KGR",
        name: "kgr_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KVI",
        name: "kvi_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Position",
        name: "position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum SERP Date",
        name: "serp_date_min",
        default: "",
        type: "string"
      },
      {
        displayName: "Minimum Title Word Count",
        name: "title_word_count_min",
        default: null,
        description: "Min number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Minimum Traffic",
        name: "traffic_min",
        default: null,
        description: "Min number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Minimum Volume",
        name: "volume_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Order",
        name: "order",
        default: "asc",
        description: "Whether the results are sorted in ascending or descending order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "asc"
          },
          {
            name: "Descending",
            value: "desc"
          }
        ]
      },
    ]
  },

	/* additional fields for:
						GetRankingofDomainKeyword*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetRankingofDomainKeyword",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "GetRankingofDomainKeyword"
        ]
      }
    },
    options: [
      {
        displayName: "Exclude Title",
        name: "title_exclude",
        default: "",
        description: "Regular expression for titles to be excluded",
        type: "string"
      },
      {
        displayName: "Include Title",
        name: "title_include",
        default: "",
        description: "Regular expression for titles to be included",
        type: "string"
      },
			{
        displayName: "Keyword Excluded",
        name: "keyword_exclude",
        default: "",
        description: "Regular expression for keywords to be excluded",
        type: "string"
      },
      {
        displayName: "Keyword Included",
        name: "keyword_include",
        default: "",
        description: "Regular expression for keywords to be included",
        type: "string"
      },
      {
        displayName: "KVI Keep NA",
        name: "kvi_keep_na",
        default: false,
        type: "boolean"
      },
			{
        displayName: "Maximum Allintitle",
        name: "allintitle_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Competition",
        name: "competition_max",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Maximum CPC",
        name: "cpc_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Keyword Word Count",
        name: "keyword_word_count_max",
        default: null,
        description: "Max number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Maximum KGR",
        name: "kgr_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum KVI",
        name: "kvi_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Position",
        name: "position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum SERP Date",
        name: "serp_date_max",
        default: "",
        type: "string"
      },
      {
        displayName: "Maximum Traffic",
        name: "traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Volume",
        name: "volume_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Allintitle",
        name: "allintitle_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Competition",
        name: "competition_min",
        default: null,
        description: "Between 0 and 1",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1
        }
      },
      {
        displayName: "Minimum CPC",
        name: "cpc_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Keyword Word Count",
        name: "keyword_word_count_min",
        default: null,
        description: "Min number of words making up the keyword",
        type: "number"
      },
      {
        displayName: "Minimum KGR",
        name: "kgr_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum KVI",
        name: "kvi_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Position",
        name: "position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum SERP Date",
        name: "serp_date_min",
        default: "",
        type: "string"
      },
      {
        displayName: "Minimum Traffic",
        name: "traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Volume",
        name: "volume_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Order",
        name: "order",
        default: "asc",
        description: "Whether the results are sorted in ascending or descending order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "asc"
          },
          {
            name: "Descending",
            value: "desc"
          }
        ]
      },
    ]
  },

	/* additional fields for:
						GetCompetitorBestPages*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetCompetitorBestPages",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "GetCompetitorBestPages"
        ]
      }
    },
    options: [
      {
        displayName: "Maximum Bested Keywords",
        name: "bested_keywords_max",
        default: null,
        description: "Max value for keywords where the competitor's page is ranked worse than at least one of the search input's pages",
        type: "number"
      },
      {
        displayName: "Maximum Besting Keywords",
        name: "besting_keywords_max",
        default: null,
        description: "Max value for keywords where the competitor's page is ranked better than any of the search input's pages",
        type: "number"
      },
      {
        displayName: "Maximum Exclusive Keywords",
        name: "exclusive_keywords_max",
        default: null,
        description: "Max value for keywords exclusive to the competitor's page",
        type: "number"
      },
      {
        displayName: "Maximum Keywords",
        name: "keywords_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Positions",
        name: "positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Traffic",
        name: "total_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Bested Keywords",
        name: "bested_keywords_min",
        default: null,
        description: "Min value for keywords where the competitor's page is ranked worse than at least one of the search input's pages",
        type: "number"
      },
      {
        displayName: "Minimum Besting Keywords",
        name: "besting_keywords_min",
        default: null,
        description: "Min value for keywords where the competitor's page is ranked better than any of the search input's pages",
        type: "number"
      },
      {
        displayName: "Minimum Exclusive Keywords",
        name: "exclusive_keywords_min",
        default: null,
        description: "Min value for keywords exclusive to the competitor's page",
        type: "number"
      },
      {
        displayName: "Minimum Keywords",
        name: "keywords_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Positions",
        name: "positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Traffic",
        name: "total_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Total Traffic Keep NA",
        name: "total_traffic_keep_na",
        default: false,
        type: "boolean"
      },
    ]
  },

	/* additional fields for:
						GetGMBBacklink*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetGMBBacklink",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "GetGMBBacklink"
        ]
      }
    },
    options: [
      {
        displayName: "Categories Excluded",
        name: "categories_exclude",
        default: "",
        description: "Regular expression for keywords to be excluded",
        type: "string"
      },
      {
        displayName: "Categories Included",
        name: "categories_include",
        default: "",
        description: "Regular expression for keywords to be included",
        type: "string"
      },
      {
        displayName: "Is Claimed",
        name: "is_claimed",
        default: false,
        description: "Whether to return claimed or unclaimed companies. When FALSE, only return unclaimed companies. When TRUE, only return claimed companies. Leave empty if you don't want to filter",
        type: "boolean"
      },
      {
        displayName: "Latitude Keep NA",
        name: "latitude_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Longitude Keep NA",
        name: "longitude_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Maximum Latitude",
        name: "latitude_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Longitude",
        name: "longitude_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Rating Count",
        name: "rating_count_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Rating Value",
        name: "rating_value_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Latitude",
        name: "latitude_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Longitude",
        name: "longitude_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Rating Count",
        name: "rating_count_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Rating Value",
        name: "rating_value_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Order",
        name: "order",
        default: "asc",
        description: "Whether the results are sorted in ascending or descending order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "asc"
          },
          {
            name: "Descending",
            value: "desc"
          }
        ]
      },
      {
        displayName: "Rating Count Keep NA",
        name: "rating_count_keep_na",
        default: false,
        type: "boolean"
      },
      {
        displayName: "Rating Value Keep NA",
        name: "rating_value_keep_na",
        default: false,
        type: "boolean"
      },
    ]
  },

	/* additional fields for:
						GetExpiredDomains*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetExpiredDomains",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "GetExpiredDomains"
        ]
      }
    },
    options: [
      {
        displayName: "Exclude Root Domain",
        name: "root_domain_exclude",
        default: "",
        description: "Regular expression for root domains to be excluded",
        type: "string"
      },
      {
        displayName: "Include Root Domain",
        name: "root_domain_include",
        default: "",
        description: "Regular expression for root domains to be included",
        type: "string"
      },
			{
        displayName: "Maximum FB Comments",
        name: "fb_comments_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum FB Shares",
        name: "fb_shares_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum First Seen",
        name: "first_seen_max",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Maximum First Time Available",
        name: "first_time_available_max",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Maximum Last Seen",
        name: "last_seen_max",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Maximum Last Time Available",
        name: "last_time_available_max",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Maximum Matching Keywords",
        name: "matching_keywords_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Matching Most Recent Position",
        name: "matching_most_recent_position_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Matching Pages",
        name: "matching_pages_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Matching Top 10 Positions",
        name: "matching_top_10_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Matching Top 100 Positions",
        name: "matching_top_100_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Matching Top 3 Positions",
        name: "matching_top_3_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Matching Top 50 Positions",
        name: "matching_top_50_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Matching Traffic",
        name: "matching_traffic_max",
        default: null,
        type: "number"
      },
			{
        displayName: "Maximum Pinterest Pins",
        name: "pinterest_pins_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Referring Domains",
        name: "referring_domains_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Domains",
        name: "total_domains_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Keywords",
        name: "total_keywords_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Pages",
        name: "total_pages_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 10 Positions",
        name: "total_top_10_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 10 Traffic",
        name: "total_top_10_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 100 Positions",
        name: "total_top_100_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 100 Traffic",
        name: "total_top_100_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 3 Positions",
        name: "total_top_3_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 3 Traffic",
        name: "total_top_3_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 50 Positions",
        name: "total_top_50_positions_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Top 50 Traffic",
        name: "total_top_50_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Maximum Total Traffic",
        name: "total_traffic_max",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum FB Comments",
        name: "fb_comments_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum FB Shares",
        name: "fb_shares_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum First Seen",
        name: "firstseen_min",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Minimum First Time Available",
        name: "first_time_available_min",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Minimum Last Seen",
        name: "last_seen_min",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Minimum Last Time Available",
        name: "last_time_available_min",
        default: "",
        description: "Date in YYYY-MM-DD format",
        type: "string"
      },
      {
        displayName: "Minimum Matching Keywords",
        name: "matching_keywords_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Matching Most Recent Position",
        name: "matching_most_recent_position_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Matching Pages",
        name: "matching_pages_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Matching Top 10 Positions",
        name: "matching_top_10_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Matching Top 100 Positions",
        name: "matching_top_100_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Matching Top 3 Positions",
        name: "matching_top_3_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Matching Top 50 Positions",
        name: "matching_top_50_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Matching Traffic",
        name: "matching_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Pinterest Pins",
        name: "pinterest_pins_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Referring Domains",
        name: "referring_domains_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Domains",
        name: "total_domains_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Keywords",
        name: "total_keywords_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Pages",
        name: "total_pages_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 10 Positions",
        name: "total_top_10_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 10 Traffic",
        name: "total_top_10_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 100 Positions",
        name: "total_top_100_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 100 Traffic",
        name: "total_top_100_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 3 Positions",
        name: "total_top_3_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 3 Traffic",
        name: "total_top_3_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 50 Positions",
        name: "total_top_50_positions_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Top 50 Traffic",
        name: "total_top_50_traffic_min",
        default: null,
        type: "number"
      },
      {
        displayName: "Minimum Total Traffic",
        name: "total_traffic_min",
        default: null,
        type: "number"
      },
			{
        displayName: "Order",
        name: "order",
        default: "asc",
        description: "Whether the results are sorted in ascending or descending order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "asc"
          },
          {
            name: "Descending",
            value: "desc"
          }
        ]
      },
    ]
  },

	/* additional fields for:
						GetDomainTopPagesGetHistoryofDomainPages*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetDomainTopPagesGetHistoryofDomainPages",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: [
          "siteExplorer"
        ],
        operation: [
          "GetDomainTopPages",
          "GetHistoryofDomainPages"
        ]
      }
    },
    options: [
      {
				displayName: "Maximum Known Versions",
				name: "known_versions_max",
				default: null,
				type: "number"
			},
			{
				displayName: "Maximum Total Top 10",
				name: "total_top_10_max",
				default: null,
				type: "number"
			},
			{
				displayName: "Maximum Total Top 100",
				name: "total_top_100_max",
				default: null,
				type: "number"
			},
			{
				displayName: "Maximum Total Top 3",
				name: "total_top_3_max",
				default: null,
				type: "number"
			},
			{
				displayName: "Maximum Total Top 50",
				name: "total_top_50_max",
				default: null,
				type: "number"
			},
			{
				displayName: "Maximum Total Traffic",
				name: "total_traffic_max",
				default: null,
				type: "number"
			},
			{
				displayName: "Maximum Unique Keywords",
				name: "unique_keywords_max",
				default: null,
				description: "Between 0 and 1",
				type: "number",
				typeOptions: {
					minValue: 0,
					maxValue: 1
				}
			},
			{
				displayName: "Minimum Known Versions",
				name: "known_versions_min",
				default: null,
				type: "number"
			},
			{
				displayName: "Minimum Total Top 10",
				name: "total_top_10_min",
				default: null,
				type: "number"
			},
			{
				displayName: "Minimum Total Top 100",
				name: "total_top_100_min",
				default: null,
				type: "number"
			},
			{
				displayName: "Minimum Total Top 3",
				name: "total_top_3_min",
				default: null,
				type: "number"
			},
			{
				displayName: "Minimum Total Top 50",
				name: "total_top_50_min",
				default: null,
				type: "number"
			},
			{
				displayName: "Minimum Total Traffic",
				name: "total_traffic_min",
				default: null,
				type: "number"
			},
			{
				displayName: "Minimum Unique Keywords",
				name: "unique_keywords_min",
				default: null,
				description: "Between 0 and 1",
				type: "number",
				typeOptions: {
					minValue: 0,
					maxValue: 1
				}
			},
			{
				displayName: "Order",
				name: "order",
				default: "asc",
				description: "Whether the results are sorted in ascending or descending order",
				type: "options",
				options: [
					{
						name: "Ascending",
						value: "asc"
					},
					{
						name: "Descending",
						value: "desc"
					}
				]
			}
    ]
  },

	/* additional fields for:
						GetDomainDatainBulk*/
  {
    displayName: "Additional Fields",
    name: "additionalFields_GetDomainDatainBulk",
    type: "collection",
    default: {},
    placeholder: "Add Field",
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
    options: [
    {
			displayName: "Maximum Total Top 10",
			name: "total_top_10_max",
			default: null,
			type: "number"
		},
		{
			displayName: "Maximum Total Top 100",
			name: "total_top_100_max",
			default: null,
			type: "number"
		},
		{
			displayName: "Maximum Total Top 3",
			name: "total_top_3_max",
			default: null,
			type: "number"
		},
		{
			displayName: "Maximum Total Top 50",
			name: "total_top_50_max",
			default: null,
			type: "number"
		},
		{
			displayName: "Maximum Total Traffic",
			name: "total_traffic_max",
			default: null,
			type: "number"
		},
		{
			displayName: "Maximum Unique Keywords",
			name: "unique_keywords_max",
			default: null,
			description: "Between 0 and 1",
			type: "number",
			typeOptions: {
				minValue: 0,
				maxValue: 1
			}
		},
		{
			displayName: "Minimum Total Top 10",
			name: "total_top_10_min",
			default: null,
			type: "number"
		},
		{
			displayName: "Minimum Total Top 100",
			name: "total_top_100_min",
			default: null,
			type: "number"
		},
		{
			displayName: "Minimum Total Top 3",
			name: "total_top_3_min",
			default: null,
			type: "number"
		},
		{
			displayName: "Minimum Total Top 50",
			name: "total_top_50_min",
			default: null,
			type: "number"
		},
		{
			displayName: "Minimum Total Traffic",
			name: "total_traffic_min",
			default: null,
			type: "number"
		},
		{
			displayName: "Minimum Unique Keywords",
			name: "unique_keywords_min",
			default: null,
			description: "Between 0 and 1",
			type: "number",
			typeOptions: {
				minValue: 0,
				maxValue: 1
			}
		},
		{
			displayName: "Order",
			name: "order",
			default: "asc",
			description: "Whether the results are sorted in ascending or descending order",
			type: "options",
			options: [
				{
					name: "Ascending",
					value: "asc"
				},
				{
					name: "Descending",
					value: "desc"
				}
			]
		}
    ]
  },


		]
	};
}

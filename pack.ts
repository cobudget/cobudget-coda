import * as coda from "@codahq/packs-sdk";

export const pack = coda.newPack();

pack.addNetworkDomain('cobudget.com/api');

const bucketQuery = `
    query Buckets($groupSlug: String, $roundSlug: String!, $offset: Int, $limit: Int, $status: [StatusType!]) {
        bucketsPage(
        groupSlug: $groupSlug
        roundSlug: $roundSlug
        offset: $offset
        limit: $limit
        status: $status
        ) {
        moreExist
        buckets {
            id
            description
            summary
            title
            minGoal
            maxGoal
            flags {
            type
            __typename
            }
            noOfFunders
            income
            totalContributions
            totalContributionsFromCurrentMember
            noOfComments
            published
            approved
            canceled
            status
            percentageFunded
            round {
            canCocreatorStartFunding
            __typename
            }
            customFields {
            value
            customField {
                id
                name
                type
                limit
                description
                isRequired
                position
                createdAt
                __typename
            }
            __typename
            }
            images {
            id
            small
            large
            __typename
            }
            __typename
        }
        __typename
        }
    }
`;

const BucketSchema = coda.makeObjectSchema({
    properties: {
        id: {
            type: coda.ValueType.String,
            description: 'The id of the bucket.',
        },
        description: {
            type: coda.ValueType.String,
            description: 'The description of the bucket.',
        },
        summary: {
            type: coda.ValueType.String,
            description: 'The summary of the bucket.',
        },
        title: {
            type: coda.ValueType.String,
            description: 'The title of the bucket.',
        },
        minGoal: {
            type: coda.ValueType.Number,
            description: 'The minimum goal of the bucket.',
        },
        maxGoal: {
            type: coda.ValueType.Number,
            description: 'The maximum goal of the bucket.',
        },
        noOfFunders: {
            type: coda.ValueType.Number,
            description: 'The number of funders of the bucket.',
        },
        income: {
            type: coda.ValueType.Number,
            description: 'The income of the bucket.',
        },
        totalContributions: {
            type: coda.ValueType.Number,
            description: 'The total contributions of the bucket.',
        },
        totalContributionsFromCurrentMember: {
            type: coda.ValueType.Number,
            description: 'The total contributions from the current member of the bucket.',
        },
        noOfComments: {
            type: coda.ValueType.Number,
            description: 'The number of comments of the bucket.',
        },
        published: {
            type: coda.ValueType.Boolean,
            description: 'The published status of the bucket.',
        },
        approved: {
            type: coda.ValueType.Boolean,
            description: 'The approved status of the bucket.',
        },
        canceled: {
            type: coda.ValueType.Boolean,
            description: 'The canceled status of the bucket.',
        },
        status: {
            type: coda.ValueType.String,
            description: 'The status of the bucket.',
        },
        percentageFunded: {
            type: coda.ValueType.Number,
            description: 'The percentage funded of the bucket.',
        },
    },
    displayProperty: 'title',
    idProperty: 'id',
});

pack.addSyncTable({
    schema: BucketSchema,
    name: 'Buckets',
    description: 'Get a list of buckets.',
    identityName: 'Bucket',
    formula: {
        name: 'syncBuckets',
        description: 'Get a list of buckets.',
        parameters: [
            coda.makeParameter({
                type: coda.ParameterType.String,
                name: 'groupSlug',
                description: 'The slug of the group.',
            }),
            coda.makeParameter({
                type: coda.ParameterType.String,
                name: 'roundSlug',
                description: 'The slug of the round.',
            }),
        ],
        execute: async function (args, context) {
            const [groupSlug, roundSlug] = args;
            const variables = {
                "groupSlug": groupSlug,
                "roundSlug": roundSlug,
                "offset": 0,
                "limit": 1000,
                "status": ["PENDING_APPROVAL", "OPEN_FOR_FUNDING", "FUNDED", "COMPLETED", "CANCELED"]
              };
            const response = await context.fetcher.fetch({
                method: 'POST',
                url: 'https://cobudget.com/api',
                body: JSON.stringify({ query: bucketQuery, variables }),
            });

            const buckets = response.body.data.bucketsPage.buckets;

            return {
                result: buckets
              };
        },
    },
});

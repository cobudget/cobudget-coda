import * as coda from "@codahq/packs-sdk";
import { off } from "process";

export const pack = coda.newPack();

pack.addNetworkDomain('cobudget.com');

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
            cocreators {
                user {
                    username
                    roundMemberships {
                        email
                        round {
                            slug
                        }
                    }
                }
              }
            minGoal
            maxGoal
            flags {
            type
            }
            noOfFunders
            funders {
                id
                amount
                createdAt
                roundMember {
                  id
                  user {
                    id
                    name
                    username
                  }
                }
              }
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
            }
            }
        }
        }
    }
`;

const FunderSchema = coda.makeObjectSchema({
    properties: {
        id: {
            type: coda.ValueType.String,
            description: 'The id of the funder.',
        },
        amount: {
            type: coda.ValueType.Number,
            description: 'The amount given by the funder.',
        },
        createdAt: {
            type: coda.ValueType.String,
            description: 'The date the funding was given.',
        },
        username: {
            type: coda.ValueType.String,
            description: 'The username of the funder.',
        },
        name: {
            type: coda.ValueType.String,
            description: 'The name of the funder.',
        },
    },
    displayProperty: 'id',
    idProperty: 'id',
});

const CocreatorSchema = coda.makeObjectSchema({
    properties: {
        email: {
            type: coda.ValueType.String,
            description: 'The email of the cocreator.',
        },
        username: {
            type: coda.ValueType.String,
            description: 'The username of the cocreator.',
        }
    },
    displayProperty: 'username',
    idProperty: 'username',
});

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
        cocreators : {
            type: coda.ValueType.Array,
            description: 'The cocreators of the bucket.',
            items: CocreatorSchema
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
        funders: {
            type: coda.ValueType.Array,
            description: 'The funders of the bucket.',
            items: FunderSchema
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
            coda.makeParameter({
                type: coda.ParameterType.Number,
                name: 'limit',
                description: 'The limit of the buckets.',
                optional: true,
            }),
            coda.makeParameter({
                type: coda.ParameterType.String,
                name: "session",
                description: "The session parameter.",
                optional: true,
            }),
            coda.makeParameter({
                type: coda.ParameterType.String,
                name: "session_sig",
                description: "The session signature parameter.",
                optional: true,
            }),
        ],
        execute: async function (args, context) {
            const [groupSlug, roundSlug, limit, session, session_sig] = args;

            let offset: number = (context.sync.continuation?.offset as number) || 0;

            const variables = {
                "groupSlug": groupSlug,
                "roundSlug": roundSlug,
                "offset": offset,
                "limit": limit || 50,
                "status": ["PENDING_APPROVAL", "OPEN_FOR_FUNDING", "FUNDED", "COMPLETED", "CANCELED"]
              };
            const response = await context.fetcher.fetch({
                method: "POST",
                url: "https://cobudget.com/api",
                headers: {
                    Cookie: `session=${session}; session.sig=${session_sig}`,
                },
                body: JSON.stringify({ query: bucketQuery, variables }),
            });

            const rows = response.body.data.bucketsPage.buckets;
            const buckets = [];

            let continuation;
            if (response.body.data.bucketsPage.moreExist) {
              continuation = {
                offset: offset + limit,
              };
            }

            for (const b of rows) {
                const bucket = {
                    id: b.id,
                    description: b.description,
                    summary: b.summary,
                    title: b.title,
                    minGoal: b.minGoal,
                    maxGoal: b.maxGoal,
                    noOfFunders: b.noOfFunders,
                    income: b.income,
                    totalContributions: b.totalContributions,
                    totalContributionsFromCurrentMember: b.totalContributionsFromCurrentMember,
                    noOfComments: b.noOfComments,
                    published: b.published,
                    approved: b.approved,
                    canceled: b.canceled,
                    status: b.status,
                    percentageFunded: b.percentageFunded,
                    // including all funders is too much data
                    // funders: b.funders.map(f => {
                    //     return {
                    //         id: f.id,
                    //         amount: f.amount,
                    //         createdAt: f.createdAt,
                    //         username: f.roundMember.user.username,
                    //         name: f.roundMember.user.name,
                    //     };
                    // }),
                    cocreators: b.cocreators.map(c => {
                        const email = c.user.roundMemberships.find(r => r.round.slug === roundSlug).email;
                        return {
                            email: email,
                            username: c.user.username,
                        };
                    }),
                };
                buckets.push(bucket);
            }
            
            return {
                result: buckets,
                continuation: continuation,
              };
        },
    },
});

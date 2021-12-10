import { asNexusMethod } from 'nexus';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');
export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'datetime');

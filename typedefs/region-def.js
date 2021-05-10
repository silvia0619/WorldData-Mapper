const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
        parentId: String!
		name: String!
		owner: String!
        capital: String!
		leader: String!
        landmarks: [String]
		subregions: [String]
	}
	extend type Query {
		getAllRegions: [Region]
		getRegionById(_id: String!): Region 
	}
	extend type Mutation {
		addRegion(region: RegionInput!): Region	
		deleteRegion(_id: String!): Boolean
		updateRegionField(_id: String!, field: String!, value: String!): String
		updateLandmarksField(_id: String!, value: [String]): [String]
		sortRegions(_id: String!, criteria: String!): [Region]
	}
	input FieldInput {
		_id: String
		field: String
		value: String
	}
	input RegionInput {
		_id: String!
        parentId: String!
		name: String!
		owner: String!
        capital: String!
		leader: String!
        landmarks: [String]
		subregions: [String]
	}
`;

module.exports = { typeDefs: typeDefs }
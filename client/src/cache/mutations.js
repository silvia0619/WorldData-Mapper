import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			name
			password
		}
	}
`;
export const UPDATE_USER_FIELD = gql`
	mutation UpdateUserField($_id: String!, $email: String!, $password: String!, $name: String!) {
		updateUserField(_id: $_id, email: $email, password: $password, name: $name)
	}
`;
export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;


export const ADD_REGION = gql`
	mutation AddRegion($region: RegionInput!) {
		addRegion(region: $region) {
			_id
			parentId
			name
			owner
			capital
			leader
			landmarks
		}
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!) {
		deleteRegion(_id: $_id)
	}
`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id: String!, $field: String!, $value: String!) {
		updateRegionField(_id: $_id, field: $field, value: $value)
	}
`;
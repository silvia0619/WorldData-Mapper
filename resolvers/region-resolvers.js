const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const regions = await Region.find({owner: _id}).sort({updatedAt: 'descending'});
			if(regions) {
				return (regions);
			} 

		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({_id: objectId});
			if(region) return region;
			else return ({});
		},
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addRegion: async (_, args) => {
			const { region } = args;
			const objectId = new ObjectId();
			const { _id, parentId, name, owner, capital,  leader, landmarks } = region;
			const newRegion = new Region({
				_id: objectId,
                parentId: parentId,
                name: name,
                owner: owner,
                capital: capital,
                leader: leader,
                landmarks: landmarks
			});
			const updated = await newRegion.save();
			if(updated) {
				console.log(newRegion)
				return newRegion;
			}
		},
		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteRegion: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateRegionField: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		},
	}
}
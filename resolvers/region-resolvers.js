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
			// const regions = await Region.find({owner: _id}).sort({updatedAt: 'descending'});
			const regions = await Region.find({owner: _id});
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
			const { _id, parentId, name, owner, capital,  leader, landmarks, subregions } = region;
			const newRegion = new Region({
				_id: objectId,
                parentId: parentId,
                name: name,
                owner: owner,
                capital: capital,
                leader: leader,
                landmarks: landmarks,
				subregions: subregions
			});
			const updated = await newRegion.save();

			const theParentId = parentId? new ObjectId(parentId):"";
			if (theParentId != 0) {
				const parentRegion = await Region.findOne({_id: theParentId});
				const newSubregion = parentRegion.subregions;
				newSubregion.push(newRegion._id);
				const updatedParent = await Region.updateOne({_id: theParentId}, {subregions: newSubregion});
			}
			
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
			const theRegion = await Region.findOne({_id: objectId});
			const theParentIdstr = theRegion.parentId;
			const theParentId = theParentIdstr? new ObjectId(theParentIdstr):"";
			if (theParentId != 0) {
				const parentRegion = await Region.findOne({_id: theParentId});
				const newSubregion = parentRegion.subregions.filter(subregion => subregion !== theRegion._id)
				const updatedParent = await Region.updateOne({_id: theParentId}, {subregions: newSubregion});
			}
			const deleted = await Region.deleteOne({_id: objectId});
			console.log("Is this not region? ",theRegion);
			if(deleted) return theRegion;
			// else return false;
		},
		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateRegionField: async (_, args) => {
			const { value, field, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		},

		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateLandmarksField: async (_, args) => {
			const { value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {landmarks: value});
			if(updated) return value;
			else return "";
		},

		sortRegions: async (_, args) => {
			const { _id, value } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, { subregions: value })
			if(updated) return (value);
			else return [];
		}
	}
}
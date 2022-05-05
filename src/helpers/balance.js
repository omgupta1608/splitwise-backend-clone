const queries = require("../queries");

const updateUserBalances = (grpId) => {
    let grp = queries.getGroupById(grpId);
	let singleShare = parseFloat(grp.total) / (grp.users.length);
	let users = grp.users;
    users.forEach(user => {
		if(user.totalSpent === singleShare) {
			return;
		}
		if(user.totalSpent > singleShare) {
			user.balance = {
				amount: parseFloat(user.totalSpent) - parseFloat(singleShare),
				type: "back"
			}
		} else {
			user.balance = {
				amount: - parseFloat(singleShare) - parseFloat(user.totalSpent),
				type: "owe"
			}
		}
	});
	grp.users = users;
	queries.updateGroup(grp);
}

module.exports = { updateUserBalances };

const uniqid = require("uniqid"),
    respLib = require("../helpers/response"),
    queries = require("../queries");

let controllers = {};

controllers.createUser = async (req, res) => {
    const body = req.body;
    let uid = uniqid.time();
    let userOpts = {
        id: uid,
        name: body.name || "No Name",
        email: body.email || ""
    }
    queries.addNewUser(userOpts, uid);
    respLib(res, userOpts, null, "User Created Successfully", 201);
}

controllers.getSpendingDetails = async (req, res) => {
    const grpId = req.params.gid, userId = req.params.userId;
    let expenses = queries.getGroupById(grpId).expenses;
    let totalGrpSpending = 0, myTotalSpending = 0, myTotalShare;
    expenses.forEach(expense => {
        totalGrpSpending += parseFloat(expense.totalAmount);
        if(expense.payer == userId) {
            myTotalSpending += parseFloat(expense.totalAmount);
        }
    });
    myTotalShare = parseFloat((myTotalSpending/totalGrpSpending)*100);
    respLib(res, { myTotalShare, myTotalSpending, totalGrpSpending }, null, "Success", 200);
}

controllers.getBalances = async (req, res) => {
    const gid = req.params.gid, balances = queries.getGroupBalances(gid);
    respLib(res, balances, null, "Success", 200);
}

module.exports = controllers;
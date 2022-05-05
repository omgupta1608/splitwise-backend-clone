let DATABASE = {
  users: {},
  groups: {},
};

const addNewUser = (opts, uid) => {
  DATABASE.users[uid] = opts;
};

const addNewGroup = (opts, gid) => {
  DATABASE.groups[gid] = opts;
};

const addExpenseToGroup = (opts, gid) => {
  if (DATABASE.groups[gid]) DATABASE.groups[gid].expenses.push(opts) || [];
};

const addUserToGroup = (opts, gid) => {
  if (DATABASE.groups[gid]) DATABASE.groups[gid].users.push(opts);
};

const getUsers = () => {
  return DATABASE.users;
};

const getGroups = () => {
  return DATABASE.groups;
};

const getGroupById = (gid) => {
  return DATABASE.groups[gid] || {};
};

const getExpensesByGroup = (gid) => {
  return DATABASE.groups[gid]?.expenses || [];
};

const getGroupBalances = (gid) => {
  let data = {};
  if (DATABASE.groups[gid]) {
    DATABASE.groups[gid].users.forEach((u) => {
      data[u.uid] = u.balance;
    });
  }
  return data;
};

const updateGroup = (gid, opts) => {
  DATABASE.groups[gid] = opts;
};

module.exports = {
  addNewUser,
  addExpenseToGroup,
  addNewGroup,
  addUserToGroup,
  getGroupBalances,
  getGroups,
  getUsers,
  getGroupById,
  getExpensesByGroup,
  updateGroup,
};

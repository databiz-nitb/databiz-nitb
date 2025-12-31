const UserQuery = require("../models/UserQuery");

const createQuery = async (queryData) => {
    const query = new UserQuery(queryData);
    await query.save();
    return query;
};

const getAllQueries = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const queries = await UserQuery.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = await UserQuery.countDocuments();

    return {
        queries,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
};

const updateQueryStatus = async (queryId, status) => {
    const query = await UserQuery.findById(queryId);
    if (!query) throw new Error("Query not found");
    query.status = status;
    await query.save();
    return query;
};

module.exports = { createQuery, getAllQueries, updateQueryStatus };

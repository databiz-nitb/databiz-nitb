const userQueryService = require("../services/userQuery.service");

exports.createQuery = async (req, res, next) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const query = await userQueryService.createQuery({
            firstName,
            lastName,
            email,
            message,
        });

        res.status(201).json({
            message: "Your message has been sent successfully!",
            data: query,
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllQueries = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await userQueryService.getAllQueries(page, limit);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.updateQueryStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const query = await userQueryService.updateQueryStatus(
            req.params.id,
            status
        );
        res.json(query);
    } catch (err) {
        next(err);
    }
};

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
        status: "error",
        message: err.message || "Terjadi kesalahan pada server"
    });
};

module.exports = errorHandler;
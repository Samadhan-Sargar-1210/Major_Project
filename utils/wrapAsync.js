// Custom Error Handling Using wrayAsync
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}; 
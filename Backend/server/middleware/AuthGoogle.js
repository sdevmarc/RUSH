const AuthGoogle = async (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
        next();
    } else {
        res.json({ success: false, message: 'Unauthorized' });
    }
}

module.exports = AuthGoogle
exports.dashboard = (req, res) => {
    res.status(200).render("dashboard")
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

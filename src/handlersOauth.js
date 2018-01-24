exports.dashboard = (req, res) => {
    const user = req.user;
    const username = user.name.givenName;

    res.status(200).render("dashboard", { username })
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

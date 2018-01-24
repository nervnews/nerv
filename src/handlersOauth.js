exports.dashboard = (req, res) => {
  const { user } = req;
  const username = user.name.givenName;
  const state = { text: 'Logout', link: '/oauth/logout' };
  res.status(200).render('dashboard', { username, state });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

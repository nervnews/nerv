const handlers = require('./handlers');
const router = require('express').Router();
const passport = require('passport');

const fR = { failureRedirect: '/' };

router.get('/', handlers.home);
router.post('/articles', handlers.listArticles);
router.get('/visualize', handlers.visualize);
router.get('/visualize/get_article', handlers.sentiments);
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', fR), handlers.oAuthRedirct);
router.post('/visualize_all', handlers.visualizeAll);
router.get('/visualize_all_json', handlers.visualizeAllJSON);

module.exports = router;

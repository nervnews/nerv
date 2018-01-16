# NERV News

NERV is a news aggregator that offers the additional feature of providing sentiment analysis
through beautiful visualizations. Users have the choice to search for individual topics or sign up
for an account to save the topics they are interested in and receive notifications each time the sources
get updated with new content. We provide data visualization for each individual article that is searched.

### Technologies In Use

NERV is built using the **Express** framework for **Node.js**. On the frontend, we use Express-Handlebars for the
overall rendering and **D3.js** for the visualizations. We use the **Guardian API** as our main source for information.
Sentiment analysis is done by using 3 npm modules: `sentiment`,`polarity`, and `emotional`
(see the [Sentiment Analysis Wikipage](https://github.com/nervnews/nerv/wiki/Sentiment-Analysis) for detailed information).

### How To Use It

Please clone this repo.

```
git clone https://github.com/nervnews/nerv.git

```

Then, you will need to direct yourself to the Guardian API documentation to get an API key
which you will need to place in a `config.env` file in the root of this repo's directory. You can get an api key for
free by going to [this link](http://open-platform.theguardian.com/access/).

```
cd nerv
touch config.env

//Inside the config.env file add this line

GUARDIAN_KEY = your_api_key_goes_here

```

After that, you will need to install the `npm` dependencies. When this is done simply run the app with `node`.

```
npm install
node start

```

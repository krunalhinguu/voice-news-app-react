import React, { useState, useEffect } from "react";
import NewsCards from "./components/NewsCards/NewsCards.js";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

import useStyles from "./styles.js";

const alanKey =
  "83910fd0c0230c37bbe64fa99798729a2e956eca572e1d8b807a3e2338fdd0dc/stage";
const alanLogoSrc = "https://alan.app/voice/images/previews/preview.jpg";

const App = () => {
  const classes = useStyles();
  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setnewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parseNumber = wordsToNumbers(number, { fuzzy: true });
          const article = articles[parseNumber];
          if (parseNumber > 20) {
            alanBtn.playText("Please try again!!");
          } else if (article) {
            window.open(articles[number].url, "_blank");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src={alanLogoSrc}
          className={classes.alanLogo}
          alt="alan logo"
        ></img>
      </div>
      <NewsCards
        articles={newsArticles}
        activeArticle={activeArticle}
      ></NewsCards>
    </div>
  );
};

export default App;

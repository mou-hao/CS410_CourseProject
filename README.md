# Reddit Sentiment Analyzer

Reddit Sentiment Analyzer is a Chrome extension that augments Reddit viewing experience by
scoring each Reddit comment's sentiment polarity (positive/negative)
using [VADER](https://github.com/cjhutto/vaderSentiment),
a lexicon and rule-bases sentiment analysis tool.

![screenshot](./images/screenshot.jpg)

The score ranges from -1.0 to 1.0 and would appear in a banner above each comment.
The banner would have different background colors depending on the score.
There are 5 different sets of colors (background and foregound) for the following 5 sentiments.

| Sentiment     | Score        |
| ------------- | ------------ |
| Positive      | \[0.6,1.0\]  |
| Lean Positive | \[0.2,0.6)   |
| Neutral       | \[-0.2,0.2)  |
| Lean Negative | \[-0.6,-0.2) |
| Negative      | \[-1.0,-0.6) |

All the colors are customizable.
There is also an on/off toggle that controls whether the extension is enabled.

![popup](./images/popup.jpg)

## Implementatioin Details

## Set up and Run
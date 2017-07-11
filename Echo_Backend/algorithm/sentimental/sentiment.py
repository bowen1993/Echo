import Algorithmia
from config import *
import json

def get_sentiments(topic):
    twitterInput = {
        "query": topic,
        "numTweets": "10",
        "auth": {
            "app_key": TWITTER['APP_KEY'],
            "app_secret": TWITTER['APP_SECRET'],
            "oauth_token": TWITTER['OAUTH_TOKEN'],
            "oauth_token_secret": TWITTER['OAUTH_TOKEN_SECRET']
        }
    }
    client = Algorithmia.client(API_KEY)
    algo = client.algo('nlp/AnalyzeTweets/0.1.9')
    try:
        response = algo.pipe(twitterInput).result
        return response
    except:
        return None
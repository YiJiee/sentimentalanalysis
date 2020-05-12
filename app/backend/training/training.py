import csv
import time
import twitter

class TrainingSetBuilder(object):
    def __init__(self, corpusFile, tweetOutputFile):
        self.corpusFile = corpusFile
        self.tweetOutputFile = tweetOutputFile
    
    def build(self):
        # Code to build the csv file.
        corpus = []
        with open(self.corpusFile,'rb') as csvfile:
            lineReader = csv.reader(csvfile,delimiter=',', quotechar="\"")
            for row in lineReader:
                corpus.append({"tweet_id":row[2], "label":row[1], "topic":row[0]})
        rate_limit = 180
        sleep_time = 900/180
        trainingDataSet = []

        for tweet in corpus:
            try:
                status = twitter_api.GetStatus(tweet["tweet_id"])
                print("Tweet fetched" + status.text)
                tweet["text"] = status.text
                trainingDataSet.append(tweet)
                time.sleep(sleep_time) 
            except: 
                continue
        # write them to the empty CSV file
        with open(self.tweetOutputFile,'wb') as csvfile:
            linewriter = csv.writer(csvfile,delimiter=',',quotechar="\"")
            for tweet in trainingDataSet:
                try:
                    linewriter.writerow([tweet["tweet_id"], tweet["text"], tweet["label"], tweet["topic"]])
                except Exception as e:
                    print(e)
        return trainingDataSet

twitter_api = 
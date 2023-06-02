#!/bin/node
// UQLOAD Downloader

const EMBED_URL = 'https://uqload.co/embed-kayskv9js2cn.html'

if (EMBED_URL.slice(0, 4) != "http") {
  console.log("Please provide an url, and a valid one.");
  process.exit(-1);
}

const http = require('https');
const fs = require('fs');

function showPercentage(cursor, total) {
  process.stdout.write("\033[F" + (100.0 * cursor / total).toFixed(2) + "%\n");
}

function getVideoURL(embed_url, callback) {
  http.get(embed_url, (res) => {
    const {
      statusCode
    } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        let video_url = rawData.split('sources: ["')[1].split('"')[0];
        let filename = rawData.split("chromecast: { media: {title: \"")[1].split('"')[0] + ".mp4";
        callback(video_url, filename);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

function downloadVideo(embed_url, video_url, filename) {
  const file = fs.createWriteStream(filename);
  const request = http.get(video_url, {
    headers: {
      "Referer": embed_url
    }
  }, function(response) {
    response.pipe(file);

    let total = parseInt(response.headers['content-length'], 10);
    let cursor = 0;
    process.stdout.write("\n")

    response.on('data', (chunk) => {
      cursor += chunk.length
      showPercentage(cursor, total)
    })

    response.on('end', (chunk) => {
      console.log("\033[FDOWNLOAD FINISHED !")
    })

    showPercentage(0, 100)
  });
}

getVideoURL(EMBED_URL, (video_url, filename) => {
  console.log("Downloading to: " + filename);
  downloadVideo(EMBED_URL, video_url, filename);
})
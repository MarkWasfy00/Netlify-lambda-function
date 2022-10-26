const axios = require("axios");
const cheerio = require("cheerio")
const URL = 'https://www.gofundme.com/f/creators-care-project';

exports.handler = async (event, context) => {
    const site = await axios.get(URL);
    const $ = cheerio.load(site.data);
    const info = $(".m-progress-meter-heading").text()
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        current: info.substring(0, info.indexOf('raised')).trim(),
        goal: info.substring(info.indexOf('of') + 2, info.indexOf('goal')).trim()
      }),
      headers: {
        "access-control-allow-origin": "*",
      },
    };
};
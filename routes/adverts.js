const express   = require('express');
const router    = express.Router();
const request   = require('request');
const cheerio   = require('cheerio');
const excel     = require('node-excel-export');

router.get('/export', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const data = JSON.parse(req.query.data);
  // You can define styles as json object
  // More info: https://github.com/protobi/js-xlsx#cell-styles
  const styles = {
    header: {
      font: {
        color: {
          rgb: '000000'
        },
        sz: 12,
        bold: true
      }
    },

  };

  // //Array of objects representing heading rows (very top)
  // const heading = [
  //     [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
  //     ['a2', 'b2', 'c2'] // <-- It can be only values
  // ];

  //Here you specify the export structure
  const specification = {
    ref: { // <- the key should match the actual data key
      displayName: 'Ref', // <- Here you specify the column header
      headerStyle: styles.header, // <- Header style
      width: 120 // <- width in pixels
    },
    title: {
      displayName: 'Title',
      headerStyle: styles.header, // <- Header style
      width: 350 // <- width in pixels
      // headerStyle: styles.headerDark,
      // cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
      //     return (value == 1) ? 'Active' : 'Inactive';
      // },
      // width: '10' // <- width in chars (when the number is passed as string)
    },
    posted: {
      displayName: 'Posted',
      headerStyle: styles.header, // <- Header style
      width: 120 // <- width in pixels
    },
    closes: {
      displayName: 'Closes',
      headerStyle: styles.header, // <- Header style
      width: 120 // <- width in pixels
    },
    status: {
      displayName: 'Status',
      headerStyle: styles.header, // <- Header style
      width: 120 // <- width in pixels
    },
    remarks: {
      displayName: 'Comments',
      headerStyle: styles.header, // <- Header style
      width: 120 // <- width in pixels
    }
  };

  const setStatus = function(status) {
    switch (status) {
      case -1:
        return 'Not found';
        break;
      case 0:
        return 'Unmarked';
        break;
      case 1:
        return 'Passed';
        break;
      case 2:
        return 'Fail';
        break;
    }
  };

// The data set should have the following shape (Array of Objects)
// The order of the keys is irrelevant, it is also irrelevant if the
// dataset contains more fields as the report is build based on the
// specification provided above. But you should have all the fields
// that are listed in the report specification
  const dataset = data.map(function(item) {
    return {
      ref: item.ref,
      title: item.title,
      posted: item.posted,
      closes: item.closes,
      status: setStatus(item.status),
      remarks: ''
    }
  });

// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
//     const merges = [
//         { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
//         { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
//         { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
//     ]

// Create the excel report.
// This function will return Buffer
  const report = excel.buildExport(
    [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: 'Ad-view', // <- Specify sheet name (optional)
        specification: specification, // <- Report specification
        data: dataset // <-- Report data
      }
    ]
  );

// You can then return this straight
  res.attachment('ad-view-data.xlsx'); // This is sails.js specific (in general you need to set headers)
  return res.end(report);

});

// /adverts/rbs/65417

router.get('/:site/:id', function(req, res, next) {
  const jobRef = req.params.id;
  const baseURL = "http://" + req.params.site + ".rbs.com/";
  const apiURL = baseURL + "search/jobs.json?cf[JobIDDisplay]=" + jobRef;


  request(apiURL, function (_err, _res, _html) {
    if(!_err) {
      const parsedResponse = JSON.parse(_res.body);
      res.setHeader('Access-Control-Allow-Origin', '*');
      if(parsedResponse.entries.length === 0) {
        res.json({ref: jobRef, description: '', title: '', posted:'', closes:'', status: -1 });
      } else {
        request(baseURL + "/jobs/" + parsedResponse.entries[0].id, function(__err, __res, __html) {
          const $ = cheerio.load(__html);
          res.json({
            title: $('#job-title').text(),
            ref: $('#job-ref').text(),
            description: $('#description').html(),
            posted: $('#posted').text(),
            closes: $('#closes').text(),
            status: 0
          });
        })

      }
    }

  })
});

module.exports = router;

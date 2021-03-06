const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression

const csvFilePath = 'advertising.csv'; // Data
let csvData = [], // parsed Data
    X = [], // Input
    y = []; // Output

let regressionModel;

const readline = require('readline'); // For user prompt to allow predictions

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

/*csv()
    .fromFile(csvFilePath)
     subscribe.(jsonObj => {
        csvData.push(jsonObj);
    })
    .on('done', () => {
        dressData(); // To get data points from JSON Objects
        performRegression(); 
    });*/
function onComplete(a){ // When the code completes, do this
    alert(a);
}
function onError(err) {
      //Handle error
    }



const request=require('request')
//const csv=require('csvtojson')

csv()
.fromStream(request.get('https://github.com/sayemU/machine-learning-with-js/tree/master/linear-regression/advertising.csv'))
.subscribe((json)=>{
	return new Promise((resolve, reject) => {
  		setTimeout(() => reject(new Error("Whoops!")), 1000);

		// long operation for each json e.g. transform / write into database.
	})
},onError,onComplete);





function performRegression() {
    regressionModel = new SLR(X, y); // Train the model on training data
    console.log(regressionModel.toString(3));
    predictOutput();
}

function dressData() {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */
    csvData.forEach((row) => {
        X.push(f(row.radio)); // or row['radio']
        y.push(f(row.sales)); // or row['sales']
    });
}

function f(s) {
    return parseFloat(s);
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer)).toFixed(2)}`);
        predictOutput();
    });
}

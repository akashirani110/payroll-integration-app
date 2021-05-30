
const fs = require("fs");
const path = require("path");
const mysql = require('mysql2/promise');

/*
	Databse connection object
*/
export const dbConnection = {
  async getdbConnection () {
  const config = await loadConfig();
  //console.log(config);
  const connection = await mysql.createConnection(config);
  connection.connect();
  return connection;
  }
  
};

async function loadConfig() {
	const config = JSON.parse(await fs.promises.readFile(path.join(__dirname, "config.json"), { encoding: "utf8" }));
	
	if (config.ssl !== null) {
		try{
		config.ssl.ca = await fs.promises.readFile(path.join(__dirname, config.ssl.ca))
		}
		catch(err){
			console.log(err);
		}
		if (config.host === "localhost") {
			// this is because the SSL cert is self signed and node would reject it otherwise.
			config.ssl.rejectUnauthorized = false;
    }
	}
	else {
		delete config.ssl;
	}
	return config;
	
}

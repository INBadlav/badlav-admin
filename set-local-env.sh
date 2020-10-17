cd src/components/ApiClient
sed -i "s#"https://badlav-eu.herokuapp.com/api/"#"http://localhost:5000/api/"#g" httpConfig.js

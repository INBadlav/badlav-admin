cd src/components/ApiClient
sed -i "s#"http://localhost:5000/api/"#"https://badlav-eu.herokuapp.com/api/"#g" httpConfig.js

export NODE_ENV=dev 
echo $NODE_ENV
sudo mongod --port 27018 --dbpath ./data &
npm start


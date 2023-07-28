node ace build --production
cd build
npm ci --production
cp ../.env .env
node server.js
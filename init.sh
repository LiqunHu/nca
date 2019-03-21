#!/bin/sh
rm -rf node_modules

docker run --rm -v $PWD:/webapp -w /webapp node:7.9.0 npm install

cd public/static/dependencies
bash link.sh
cd -

docker run --rm -p 127.0.0.1:8000:8000 --name ncaweb --link ncaserver:ncaserver -v $PWD:/webapp -w /webapp -it node:7.9.0 npm run dev

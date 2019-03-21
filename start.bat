docker run --rm -p 127.0.0.1:8000:8000 --name ncaweb --link ncaserver:ncaserver -v C:/Users/Administrator/nca-web:/webapp -w /webapp -it node:7.9.0 npm run dev

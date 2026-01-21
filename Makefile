install:
	npm install ./backend
	npm install ./bot

build:
	npm run build ./backend
	npm run build ./bot

start:
	pm2 start ecosystem.config.json
	pm2 monit

stop:
	pm2 stop ecosystem.config.json
	pm2 monit

restart:
	pm2 restart ecosystem.config.json
	pm2 monit

delete:
	pm2 delete ecosystem.config.json




# /bin/sh

echo $(whoami);
echo "Stop Server"

/home/snapsadmin/.nvm/versions/node/v12.22.7/bin/pm2 stop all

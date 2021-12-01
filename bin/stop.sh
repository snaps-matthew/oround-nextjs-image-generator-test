#!/bin/sh

echo "Stop Server with : $(whoami)"
source /home/snapsadmin/.bashrc

/home/snapsadmin/.nvm/versions/node/v12.22.7/bin/pm2 stop all

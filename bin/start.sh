#!/bin/sh

echo "Start Server"
source /home/snapsadmin/.bashrc
cd /snaps/servers/oround-image-generator/
/home/snapsadmin/.nvm/versions/node/v12.22.7/bin/pm2 start "/snaps/servers/oround-image-generator/node_modules/next/dist/bin/next start"

# /bin/sh

echo "Start Server"
source /home/snapsadmin/.bashrc
pm2 start "/snaps/servers/oround-image-generator/node_modules/next/dist/bin/next start"

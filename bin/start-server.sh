# /bin/sh

echo "Start Server"

pm2 start "/snaps/servers/oround-image-generator/node_modules/next/dist/bin/next start"

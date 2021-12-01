# /bin/sh

echo "Stop Server"
echo $(whoami);
source /home/snapsadmin/.bashrc
pm2 stop all

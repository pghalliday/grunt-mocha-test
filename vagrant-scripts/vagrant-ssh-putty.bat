cd ..
FOR /F "tokens=1-2 delims= " %%A in ('vagrant ssh-config ^| findstr "Port [0-9]*"') do SET VAGRANT_SSH_PORT=%%B
start "" putty -ssh vagrant@localhost -P %VAGRANT_SSH_PORT% -i vagrant-scripts/vagrant.ppk

action :start do

  # Install dependency with npm
  if (not new_resource.dependency.empty?)
    new_resource.dependency.each do |dep|
      execute "install dependency module #{dep}" do
        command "sudo npm -g install #{dep}"
      end
    end
  end

  # Get the user's home
  user_home = (%x[cat /etc/passwd | grep #{new_resource.user} | cut -d":" -f6]).chomp

  # Create a node service for this program with upstart
  template "/etc/init/node-#{new_resource.name}.conf" do
    cookbook "node-js"
    source "upstart.erb"
    variables(
        :name => new_resource.name,
        :script => new_resource.script,
        :user => new_resource.user,
        :user_home => user_home
    )
  end

  # Start the server
  execute "start node server" do
    command "start node-#{new_resource.name}"
  end
end

action :stop do
  execute "stop node server" do
    command "stop node-#{new_resource.name}"
  end
end

action :restart do
  execute "restart node server" do
    command "restart node-#{new_resource.name}"
  end
end
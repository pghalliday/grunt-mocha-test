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
    cookbook "node"
    source "upstart.erb"
    variables(
        :name => new_resource.name,
        :script => new_resource.script,
        :user => new_resource.user,
        :user_home => user_home,
        :args => new_resource.args
    )
  end

  # Start the server
  service "node-#{new_resource.name}" do
    provider Chef::Provider::Service::Upstart
    action :start
  end
  service "node-#{new_resource.name}" do
    provider Chef::Provider::Service::Upstart
    action :restart
  end

end

action :stop do
  service "node-#{new_resource.name}" do
    provider Chef::Provider::Service::Upstart
    action :stop
  end
end

action :restart do
  service "node-#{new_resource.name}" do
    provider Chef::Provider::Service::Upstart
    action :start
  end
end

action :enable do
  service "node-#{new_resource.name}" do
    provider Chef::Provider::Service::Upstart
    action :enable
  end
end

action :disable do
  service "node-#{new_resource.name}" do
    provider Chef::Provider::Service::Upstart
    action :disable
  end
end

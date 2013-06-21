include_recipe "nodejs"

bash "install and test" do
  code <<-EOH
    su -l vagrant -c "cd /vagrant && npm install && npm test"
  EOH
end
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu1204"
  config.vm.box_url = "https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_provisionerless.box"

  # install latest Chef client and add the node recipe
  config.omnibus.chef_version = "11.4.4"
  config.vm.provision :chef_solo do |chef|
    chef.add_recipe "node"
    chef.json = {
      "node" => {
        "version" => "v0.10.4"
      }
    }
  end
end

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # install chef solo on all machines
  config.omnibus.chef_version = "11.4.4"

  # enable berkshelf
  config.berkshelf.enabled = true

  config.vm.define "grunt-mocha-test" do |node|
    node.vm.hostname = "grunt-mocha-test"
    node.vm.box = "precise-server-cloudimg-amd64"
    node.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box"

    node.vm.provider :virtualbox do |vb|
      # Give enough horsepower to build without taking all day.
      vb.customize [
        "modifyvm", :id,
        "--memory", "1024",
        "--cpus", "2",
      ]
    end

    node.vm.provision :chef_solo do |chef|
      chef.run_list = [
        "recipe[grunt-mocha-test]"
      ]
    end
  end
end

Vagrant.configure("2") do |config|
  config.omnibus.chef_version = :latest

  config.berkshelf.enabled = true

  config.vm.hostname = "grunt-mocha-test"
  config.vm.box = "precise-server-cloudimg-amd64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box"

  config.vm.provider :virtualbox do |vb|
    vb.customize [
      "modifyvm", :id,
      "--memory", "1024",
      "--cpus", "2",
    ]
  end

  config.vm.provision :chef_solo do |chef|
    chef.run_list = [
      "recipe[grunt-mocha-test]"
    ]
  end
end

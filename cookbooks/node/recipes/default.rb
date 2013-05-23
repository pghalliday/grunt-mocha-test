#
# Cookbook Name:: node
# Recipe:: default
#
# Copyright 2011, Tikibooth Limited
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

include_recipe "git"

[ "curl"].each do |pkg|
  package pkg do
    action :install
  end
end

case node[:platform]
  when "centos","redhat","fedora"
    package "openssl-devel"
  when "debian","ubuntu"
    package "libssl-dev"
end

bash "compile_nodejs_source" do
  cwd "/tmp/"
  code <<-EOH
    # Check the remote hash first
    previousnodeversion="$(cat /usr/local/share/node_version)"
    remotetagcommit="$(git ls-remote -h -t https://github.com/joyent/node.git #{node[:node][:version]}^{} | awk '{print $1}')"
    remotecommit="$(git ls-remote -h -t https://github.com/joyent/node.git #{node[:node][:version]} | awk '{print $1}')"
    if [ \\( -n "$remotetagcommit" -a "$remotetagcommit" = "$previousnodeversion" \\) -o \\( -n "$remotecommit" -a "$remotecommit" = "$previousnodeversion" \\) ]; then
      exit 0
    fi
    git clone https://github.com/joyent/node.git
    cd node
    git checkout #{node[:node][:version]}
    currentnodeversion="$(git show -s --format=%H)"
    if [ "$currentnodeversion" = "$previousnodeversion" ]; then
      exit 0
    fi
    ./configure && make && make install
    git show -s --format=%H > /usr/local/share/node_version
  EOH
end


bash "install_npm" do
  user "root"
    cwd "/tmp/"
    code <<-EOH
    curl -k https://npmjs.org/install.sh | clean=no sh
    EOH
end


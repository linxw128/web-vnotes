---
title: elastic search安装和配置
description: elastic search安装和配置
category: "WEB"
pubDate: 2024-03-30
draft: false
tags: ["elastic"]
cover_image: ""
canonical_url: false
---

elastic quick start 
https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html

filebeat quick start
https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation-configuration.html


elastic和kibana采用docker安装
filebeat是安装在客户端，采用直接安装的方式

### filebeat

#### install
```
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.13.0-amd64.deb
sudo dpkg -i filebeat-8.13.0-amd64.deb

curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.13.0-x86_64.rpm
sudo rpm -vi filebeat-8.13.0-x86_64.rpm
```

#### config connection
```
output.elasticsearch:
  hosts: ["https://myEShost:9200"]
  username: "filebeat_internal"
  password: "YOUR_PASSWORD" 
  ssl:
    enabled: true
    ca_trusted_fingerprint: "b9a10bbe64ee9826abeda6546fc988c8bf798b41957c33d05db736716513dc9c"
```

#### data collection modules
filebeat modules list
filebeat modules enable nginx

vim /etc/file..
```
- module: nginx
  access:
    enabled: true
    var.paths: ["/var/log/nginx/access.log*"] 
```

#### Set up assets
filebeat setup -e

#### Start Filebeat
sudo service filebeat start

#### View your data in Kibana
Point your browser to http://localhost:5601, replacing localhost with the name of the Kibana host.
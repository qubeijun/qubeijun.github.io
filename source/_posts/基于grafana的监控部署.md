---
title: 基于grafana的监控部署
author: qubeijun
abbrlink: 63116
tags:
  - grafana
categories:
  - 技术
description: 基于grafana的监控部署
toc_number: false
date: 2023-04-06 17:03:00
---
# 基于grafana的监控部署
## 1.Grafana
Grafana是一个开源的，拥有丰富dashboard和图表编辑的指标分析平台
配置文件：通过nginx反向代理让域名能访问grafana平台

相关命令
```
启动：service grafana-server start
停止：service grafana-server stop
重启：service grafana-server restart
加入开机自启动： chkconfig --add grafana-server on
```
## 2.Prometheus
Prometheus Server负责定时在目标上抓取Metrics数据，每个抓取目标都需要暴露一个HTTP服务接口用于Prometheus定时抓取
配置文件：将各种监控插件的接口暴漏给prometheus进行抓去

prometheus.yml（也可以额外新增配置文件，在prometheus.yml中直接引用）
```
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    static_configs:
      - targets: ["ip:port"]

  - job_name: 'neusoft'
    file_sd_configs:
    - files:
      - /home/neusoft/sdkjg/installfiles/conf/neusoft.json
```
neusoft.json
```
[
  {
    "targets": [
      "ip:port"
    ],
    "labels": {
      "group": "neusoft",
      "app": "",
      "hostname": "nacos"
    }
  },
  {
    "targets": [
      "ip:port"
    ],
    "labels": {
      "group": "neusoft",
      "app": "",
      "hostname": "微服务"
    }
  }
]
```
启动命令（指定端口--web.listen-address、指定数据存储位置--storage.tsdb.path）
```
nohup /home/neusoft/sdkjg/installfiles/prometheus-2.42.0.linux-amd64/prometheus --config.file=/home/neusoft/sdkjg/installfiles/prometheus-2.42.0.linux-amd64/prometheus.yml  --web.listen-address=':9190' --storage.tsdb.path="/mnt/data/neusoft/sdkjg/app/data" > /var/log/prometheus.log 2>&1 &
```
## 3.node_export
node-exporter用于采集服务器层面的运行指标，包括机器的loadavg、filesystem、meminfo等基础监控

启动命令（指定端口--web.listen-address）
```
nohup /home/neusoft/sdkjg/installfiles/node_exporter --web.listen-address=':9100'  > /var/log/node_exporter.log 2>&1 &
```
## 4.promtail
Promtail 将本地日志内容传送到 Loki 实例

配置文件

- 微服务
```
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://ip:3100/loki/api/v1/push

scrape_configs:
- job_name: sbsdebug
  static_configs:
  - targets:
      - localhost
    labels:
      job: sbs_debug
      __path__: /home/neusoft/sdkjg/app/jar/logs/sdstm-business-services/debug.log
```
- nginx
```
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://ip:3100/loki/api/v1/push

scrape_configs:
- job_name: nginx
  static_configs:
  - targets:
      - localhost
    labels:
      job: nginx_access_log
      __path__: /usr/local/nginx/logs/json_access.log

```
格式化nginx出输出日志
```
log_format json_analytics escape=json '{'
    '"msec": "$msec", ' # request unixtime in seconds with a milliseconds resolution
    '"connection": "$connection", ' # connection serial number
    '"connection_requests": "$connection_requests", ' # number of requests made in connection
    '"pid": "$pid", ' # process pid
    '"request_id": "$request_id", ' # the unique request id
    '"request_length": "$request_length", ' # request length (including headers and body)
    '"remote_addr": "$remote_addr", ' # client IP
    '"remote_user": "$remote_user", ' # client HTTP username
    '"remote_port": "$remote_port", ' # client port
    '"time_local": "$time_local", '
    '"time_iso8601": "$time_iso8601", ' # local time in the ISO 8601 standard format
    '"request": "$request", ' # full path no arguments if the request
    '"request_uri": "$request_uri", ' # full path and arguments if the request
    '"args": "$args", ' # args
    '"status": "$status", ' # response status code
    '"body_bytes_sent": "$body_bytes_sent", ' # the number of body bytes exclude headers sent to a client
    '"bytes_sent": "$bytes_sent", ' # the number of bytes sent to a client
    '"http_referer": "$http_referer", ' # HTTP referer
    '"http_user_agent": "$http_user_agent", ' # user agent
    '"http_x_forwarded_for": "$http_x_forwarded_for", ' # http_x_forwarded_for
    '"http_host": "$http_host", ' # the request Host: header
    '"server_name": "$server_name", ' # the name of the vhost serving the request
    '"request_time": "$request_time", ' # request processing time in seconds with msec resolution
    '"upstream": "$upstream_addr", ' # upstream backend server for proxied requests
    '"upstream_connect_time": "$upstream_connect_time", ' # upstream handshake time incl. TLS
    '"upstream_header_time": "$upstream_header_time", ' # time spent receiving upstream headers
    '"upstream_response_time": "$upstream_response_time", ' # time spend receiving upstream body
    '"upstream_response_length": "$upstream_response_length", ' # upstream response length
    '"upstream_cache_status": "$upstream_cache_status", ' # cache HIT/MISS where applicable
    '"ssl_protocol": "$ssl_protocol", ' # TLS protocol
    '"ssl_cipher": "$ssl_cipher", ' # TLS cipher
    '"scheme": "$scheme", ' # http or https
    '"request_method": "$request_method", ' # request method
    '"server_protocol": "$server_protocol", ' # request protocol, like HTTP/1.1 or HTTP/2.0
    '"pipe": "$pipe", ' # "p" if request was pipelined, "." otherwise
    '"gzip_ratio": "$gzip_ratio", '
    '"http_cf_ray": "$http_cf_ray",'
    '"geoip_country_code": "$http_cf_ipcountry"'
    '}';
    access_log logs/json_access.log json_analytics;
```
启动命令
```
nohup /home/neusoft/sdkjg/installfiles/promtail-linux-amd64 -config.file=/home/neusoft/sdkjg/installfiles/promtail-local-config-linux.yaml  > /var/log/promtail.log 2>&1 &
```
## 5.loki
Loki是 Grafana Labs 团队最新的开源项目，是一个水平可扩展，高可用性，多租户的日志聚合系统。
Loki日志系统由以下3个部分组成：
- loki是主服务器，负责存储日志和处理查询。
- promtail是专为loki定制的代理，负责收集日志并将其发送给 loki 。
- Grafana用于 UI展示。

配置文件
- 微服务
```
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: ip
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093

# By default, Loki will send anonymous, but uniquely-identifiable usage and configuration
# analytics to Grafana Labs. These statistics are sent to https://stats.grafana.org/
#
# Statistics help us better understand how Loki is used, and they show us performance
# levels for most users. This helps us prioritize features and documentation.
# For more information on what's sent, look at
# https://github.com/grafana/loki/blob/main/pkg/usagestats/stats.go
# Refer to the buildReport method to see what goes into a report.
#
# If you would like to disable reporting, uncomment the following lines:
#analytics:
#  reporting_enabled: false
```
- nginx
```
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: ip
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h
  ingestion_rate_mb: 30  #修改每用户摄入速率限制，即每秒样本量，默认值为4M
  ingestion_burst_size_mb: 15  #修改每用户摄入速率限制，即每秒样本量，默认值为6M
  
ruler:
  alertmanager_url: http://localhost:9093

# By default, Loki will send anonymous, but uniquely-identifiable usage and configuration
# analytics to Grafana Labs. These statistics are sent to https://stats.grafana.org/
#
# Statistics help us better understand how Loki is used, and they show us performance
# levels for most users. This helps us prioritize features and documentation.
# For more information on what's sent, look at
# https://github.com/grafana/loki/blob/main/pkg/usagestats/stats.go
# Refer to the buildReport method to see what goes into a report.
#
# If you would like to disable reporting, uncomment the following lines:
#analytics:
#  reporting_enabled: false

```

启动命令
```
nohup /home/neusoft/sdkjg/installfiles/loki-linux-amd64 -config.file=/home/neusoft/sdkjg/installfiles/loki-local-config-linux.yaml  > /var/log/loki.log 2>&1 &
```
## 6.grafana监控
将各监控节点作为数据源配置到grafana平台，在dashboard显示监控大屏
{% asset_img grafana1.png %}
服务器监控
{% asset_img grafana2.png %}
nginx监控
{% asset_img grafana3.png %}
redis监控
{% asset_img grafana4.png %}
{% plantuml %}
skinparam rectangle<<behavior>> {
    roundCorner 25
}
sprite $aService jar:archimate/application-service
sprite $bService jar:archimate/business-service

rectangle "Grafana" as Grafana <<$bService>><<behavior>> #Business
rectangle "Loki\nip:3100" as LokiNginx <<$bService>><<behavior>> #Business
rectangle "Loki\nip:3100" as LokiServer <<$bService>><<behavior>> #Business
rectangle "Prometheus\nip:9190" as Prometheus <<$bService>><<behavior>> #Business
rectangle "Redis\nip:6379" as Redis <<$bService>><<behavior>> #Business

Grafana *-down- LokiServer
Grafana *-down- LokiNginx
Grafana *-down- Prometheus
Grafana *-down- Redis

rectangle "Promtail(nginx)\nip:9080" as PromtailNginx <<$aService>><<behavior>> #Application
rectangle "Promtail(server)\nip:9080" as PromtailServer <<$aService>><<behavior>> #Application
rectangle "node_export\nip:9100" as nodeExport <<$aService>><<behavior>> #Application
rectangle "none" as none <<$aService>><<behavior>> #Application

archimate #Technology "Servers" as Servers <<technology-device>>

none -up-> Redis
nodeExport -up-> Prometheus
PromtailNginx -up-> LokiNginx 
PromtailServer -up-> LokiServer 

Servers -up-> none
Servers -up-> PromtailNginx 
Servers -up-> PromtailServer 
Servers -up-> nodeExport
{% endplantuml %}
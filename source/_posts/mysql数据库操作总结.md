---
title: mysql数据库操作总结
tags: 数据库
categories: mysql
description: mysql数据库操作总结
abbrlink: 5417
date: 2019-04-25 11:14:11
---

<!--more-->

<p>0、安装过程自行百度，都可以百度到。安装完成后，进入mysql命令行模式。</p>

{% code %}
mysql -u root -p
{% endcode %}

{% asset_img mysql1.png %}

<p>1、新建、查看数据库</p>

{% code %}
create database bookstore;
{% endcode %}

{% asset_img mysql2.png %}

{% code %}
show databases;
{% endcode %}

{% asset_img mysql3.png %}

<p>2、在指定数据库中创建表。</p>

{% code %}
use test
{% endcode %}

{% code %}
create table user
(
id         int auto_increment not null,
username   varchar(10) not null,
password   varchar(10) not null,
primary    key(id)
);
{% endcode %}

{% asset_img mysql4.png %}

{% code %}
show tables;
{% endcode %}

{% code %}
descirbe tables;
{% endcode %}

{% asset_img mysql5.png %}

<p>3、向表中加入数据记录。</p>

{% code %}
insert into user values(1,'yu','yu');
insert into user values(2,'zhouhejun','19830925');
{% endcode %}

{% asset_img mysql6.png %}
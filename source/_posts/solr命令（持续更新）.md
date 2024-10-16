---
title: solr命令（持续更新）
tags:
  - solr
  - python
categories: python
description: solr命令
abbrlink: 1369
date: 2019-03-08 10:58:45
---

<!--more-->

<p>1、删除内核</p>

<p>solr delete -c corename</p>

<p>2、创建内核</p>

<p>solr create -c corename</p>

<p>3、删除所有数据</p>

{% code %}
<delete> 
   <query>;*:*</query> 
</delete>
{% endcode %}

<p>Python操作solr </p>

<p>1、连接Python数据库</p>
{% code %}
import pysolr

solr = pysolr.Solr('http://127.0.0.1:8983/solr/jcp/') #  连接solr数据库
results = solr.search('*:*') #  查找数据库中所有内容
number = results.hits #  返回数据条数
print(number)
results = solr.search('*:*', **{'rows': number,}) #  返回所有数据
{% endcode %}
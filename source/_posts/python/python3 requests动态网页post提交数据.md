---
title: python3 requests动态网页post提交数据
tags:
  - 微信文章
  - post
  - 爬虫
categories: python
description: python3 requests 动态网页post提交数据
abbrlink: 20641
date: 2018-08-03 15:57:31
---
<p>1.登录清博大数据网站（<a href="http://www.gsdata.cn/">http://www.gsdata.cn/</a>）（想采集微信文章的可以来这里）</p>

{% code %}
import requests
import json

conn = requests.session()
# 登录
url = 'http://www.gsdata.cn/member/login'
postdata = {
    'username': '******',
    'password': '******'
}
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5733.400 QQBrowser/10.2.2019.400'}
rep = conn.post(url, data=postdata, headers=headers)
{% endcode %}

<p>2.采集文章</p>

{% asset_img post1.png %}

<p>输入关键词后，会在本页面返回文章条数，然后我是正常post数据，没有任何结果，然后网上也查不到问题。</p>

<p>原代码：</p>
{% code %}
ajax_header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5733.400 QQBrowser/10.2.2019.400'}

# 搜索
arcsearch = 'http://www.gsdata.cn/tool/ajaxarccount'
searchdata = {
    'keyword': '人工智能',
    'copyright': 0,
    'title': '标题',
    'content': '摘要',
    'wx': '微信号',
    'startTime': '2018-01-01',
    'endTime': '2018-01-31',
}

search = conn.post(arcsearch, data=searchdata, headers=ajax_header)
print(search.json())
{% endcode %}

<p>然后我发现它与静态网页头部Request Headers多出了X-Requested-With</p>

{% asset_img post2.png %}

<p>所以我在头部也加了'X-Requested-With': 'XMLHttpRequest'</p>

<p>代码：</p>

{% code %}
ajax_header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5733.400 QQBrowser/10.2.2019.400',
               'X-Requested-With': 'XMLHttpRequest'}

# 搜索
arcsearch = 'http://www.gsdata.cn/tool/ajaxarccount'
searchdata = {
    'keyword': '人工智能',
    'copyright': 0,
    'title': '标题',
    'content': '摘要',
    'wx': '微信号',
    'startTime': '2018-01-01',
    'endTime': '2018-01-31',
}

search = conn.post(arcsearch, data=searchdata, headers=ajax_header)
print(search.json())
{% endcode %}

{% asset_img post3.png %}

<p>结果</p>

{% asset_img post4.png %}

{% asset_img post5.png %}
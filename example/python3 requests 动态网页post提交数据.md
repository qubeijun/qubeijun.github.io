---
title: python3 requests 动态网页post提交数据
date: 2018-08-03 15:57:31
tags: 微信文章 post 爬虫
categories: 
---

<!--more-->

<p>1.登录清博大数据网站（<a href="http://www.gsdata.cn/">http://www.gsdata.cn/</a>）（想采集微信文章的可以来这里）</p>

<pre class="has">
<code class="language-python">import requests
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
rep = conn.post(url, data=postdata, headers=headers)</code></pre>

<p>2.采集文章</p>

<p><img alt="" class="has" height="634" src="https://i-blog.csdnimg.cn/blog_migrate/7a74efe18cfef9c4075cddbbb774fcba.png" width="1200" /></p>

<p>输入关键词后，会在本页面返回文章条数，然后我是正常post数据，没有任何结果，然后网上也查不到问题。</p>

<p>原代码：</p>

<pre class="has">
<code class="language-python">ajax_header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5733.400 QQBrowser/10.2.2019.400'}

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
print(search.json())</code></pre>

<p>然后我发现它与静态网页头部Request Headers多出了X-Requested-With</p>

<p><img alt="" class="has" height="634" src="https://i-blog.csdnimg.cn/blog_migrate/e1166eadf314ffa7ed562b4454192ecb.png" width="1200" /></p>

<p>所以我在头部也加了'X-Requested-With': 'XMLHttpRequest'</p>

<p>代码：</p>

<pre class="has">
<code class="language-python">ajax_header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5733.400 QQBrowser/10.2.2019.400',
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
print(search.json())</code></pre>

<p><img alt="" class="has" height="634" src="https://i-blog.csdnimg.cn/blog_migrate/5a9ae28dd81a097fc6ba2495c2c686e8.png" width="1200" /></p>

<p>结果</p>

<p><img alt="" class="has" height="76" src="https://i-blog.csdnimg.cn/blog_migrate/64b9aa1e433eb1eca2c62b901a9bea9d.png" width="597" /></p>

<p><img alt="" class="has" height="634" src="https://i-blog.csdnimg.cn/blog_migrate/6b27e5726f948991b19244818bbfa035.png" width="1200" /></p>
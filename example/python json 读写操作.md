---
title: python json 读写操作
date: 2018-11-05 15:10:43
tags: python  json 读写文件
categories: 
---

<!--more-->

<p>python json 读写操作</p>

<p>1、dumps把字典类型转换成字符串</p>

<pre class="has">
<code class="language-python">import json

new_dict = {'s_uid': 1,
        's_date': ['2017-05-01', '2017-05-15'],
        's_T': 2,
        's_time': ['12:00:00', '17:00:00'],
        's_local': 2,
        'percent': 0.53,
        'loss': 0.3,
        'a': 4}

print(new_dict)
print(type(new_dict))


json_str = json.dumps(new_dict)
print(json_str)
print(type(json_str))</code></pre>

<p>结果： </p>

<pre class="has">
<code class="language-python">{'a': 4, 'loss': 0.3, 's_date': ['2017-05-01', '2017-05-15'], 's_uid': 1, 's_time': ['12:00:00', '17:00:00'], 's_local': 2, 'percent': 0.53, 's_T': 2}
&lt;type 'dict'&gt;
{"a": 4, "loss": 0.3, "s_date": ["2017-05-01", "2017-05-15"], "s_uid": 1, "s_time": ["12:00:00", "17:00:00"], "s_local": 2, "percent": 0.53, "s_T": 2}
&lt;type 'str'&gt;</code></pre>

<p>2、dump把字典保存到json格式文件</p>

<pre class="has">
<code class="language-python">with open("mode.json","w") as f:
	json.dump(dict,f)</code></pre>

<p>3、loads把字符串转换成字典</p>

<pre class="has">
<code class="language-python">new_dict = json.loads(json_str)
print(new_dict)
print(type(new_dict))</code></pre>

<p>结果： </p>

<pre class="has">
<code class="language-python">{u'a': 4, u'loss': 0.3, u's_T': 2, u'percent': 0.53, u's_date': [u'2017-05-01', u'2017-05-15'], u's_uid': 1, u's_time': [u'12:00:00', u'17:00:00'], u's_local': 2}
&lt;type 'dict'&gt;</code></pre>

<p>4、load把json格式文件内容转为list</p>

<pre class="has">
<code class="language-python">with open("mode.json",'r') as load_f:
    load_dict = json.load(load_f)
    print(load_dict)
</code></pre>

<p> </p>
---
title: python json读写操作
tags:
  - python
  - json
  - 读写文件
categories: python
description: python json 读写操作
abbrlink: 40714
date: 2018-11-05 15:10:43
---

<!--more-->

<p>python json 读写操作</p>

<p>1、dumps把字典类型转换成字符串</p>

{% code %}
import json

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
print(type(json_str))
{% endcode %}

<p>结果： </p>

{% code %}
{'a': 4, 'loss': 0.3, 's_date': ['2017-05-01', '2017-05-15'], 's_uid': 1, 's_time': ['12:00:00', '17:00:00'], 's_local': 2, 'percent': 0.53, 's_T': 2}
<type 'dict'>
{"a": 4, "loss": 0.3, "s_date": ["2017-05-01", "2017-05-15"], "s_uid": 1, "s_time": ["12:00:00", "17:00:00"], "s_local": 2, "percent": 0.53, "s_T": 2}
<type 'str'>
{% endcode %}

<p>2、dump把字典保存到json格式文件</p>

{% code %}
with open("mode.json","w") as f:
	json.dump(dict,f)
{% endcode %}

<p>3、loads把字符串转换成字典</p>

{% code %}
new_dict = json.loads(json_str)
print(new_dict)
print(type(new_dict))
{% endcode %}

<p>结果： </p>

{% code %}
{u'a': 4, u'loss': 0.3, u's_T': 2, u'percent': 0.53, u's_date': [u'2017-05-01', u'2017-05-15'], u's_uid': 1, u's_time': [u'12:00:00', u'17:00:00'], u's_local': 2}
<type 'dict'>
{% endcode %}
<p>4、load把json格式文件内容转为list</p>

{% code %}
with open("mode.json",'r') as load_f:
    load_dict = json.load(load_f)
    print(load_dict)
{% endcode %}
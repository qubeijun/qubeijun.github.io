---
title: python之pymysql增删改查mysql数据库
tags:
  - python
  - mysql
  - pymysql
categories: python
description: Python之pymysql增删改查mysql数据库
abbrlink: 61616
date: 2019-07-23 09:02:50
---

<!--more-->

{% code %}
import pymysql

#连接方法
conn = pymysql.connect(
host='0.0.0.0',
port=3306,
user='root',
passwd='123456',
db='test')

# 创建当前游标
cursor = conn.cursor()

#effect_row 为结果行数
effect_row = cursor.execute("select * from student")

#建立需要插入的数据
data = [
    ('MM',33),
    ('BearBear',4),
    ('q',10)
]

# 执行插入多条语句
cursor.executemany('insert into student(name,age) values(%s,%s)',data)

#执行插入单条带变量的语句
# data = cursor.execute("insert into user(username,age,department) values('{0}','{1}','{2}')".format(username,age,department))

#提交语句
conn.commit()

#执行更新语句
cursor.execute('update student set name="q" where id = 1')

conn.commit()

#执行删除语句
cursor.execute('delete from student where name = "q"')

conn.commit()

cursor.close()

conn.close()
{% endcode %}
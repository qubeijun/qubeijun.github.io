---
title: python获取当前文件夹下的所有的文件名
tags:
  - 文件名
  - python
categories: python
description: python获取当前文件夹下的所有的文件名
abbrlink: 2603
date: 2019-04-29 14:33:02
---

<!--more-->

{% code %}
import os

def file_name(file_dir):
    for root, dirs, files in os.walk(file_dir):
        print(root)  # 当前目录路径
        print(dirs)  # 当前路径下所有子目录
        print(files)  # 当前路径下所有非目录子文件
{% endcode %}
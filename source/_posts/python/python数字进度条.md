---
title: python数字进度条
tags: python
categories: python
description: python数字进度条
abbrlink: 59213
date: 2018-10-24 13:01:23
---

<!--more-->

{% code %}
import time


def toolBar(list_bar):
    for i in list_bar:
        '''
        \r:每次讲控制台的光标移动到首位,去掉则不会呈现刷新的效果,最终是打印一行.
        end='':print输出不换行,若去掉,则会在控制台每次换行打印当前进度.
        '''

        print('\r当前速度:{:.2f}%'.format((len(list_bar) - list_bar.index(i)-1)*100 / len(list_bar)), end = '')
        time.sleep(1)


if __name__ == '__main__':
    list_bar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    toolBar(list_bar)
{% endcode %}
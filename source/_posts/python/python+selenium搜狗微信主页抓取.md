---
title: python+selenium搜狗微信主页抓取
tags:
  - python
  - selenium
  - 搜狗微信
  - 爬虫
categories: python
description: python+selenium搜狗微信主页抓取
abbrlink: 52143
date: 2017-10-24 13:15:09
---

<!--more-->

{% code %}
# coding:utf-8

from selenium import webdriver
from selenium.webdriver.common.action_chains import *
import time

url = 'http://weixin.sogou.com/'

for i in range(0, 22):
    browser = webdriver.PhantomJS()
    browser.get(url)
    browser.refresh()

    # 鼠标悬停‘更多’
    implement = browser.find_element_by_xpath("//a[@id='more_anchor']")
    ActionChains(browser).move_to_element(implement).perform()
    time.sleep(2)

    # 点击标签
    browser.find_element_by_xpath("//a[@id='pc_"+str(i)+"']").click()
    x = browser.find_element_by_xpath("//a[@id='pc_"+str(i)+"']")
    # print x.text

    # 点击‘加载更多内容’
    browser.find_element_by_xpath("//a[@id='look-more']").click()
    time.sleep(2)
    browser.find_element_by_xpath("//a[@id='look-more']").click()
    time.sleep(2)
    for j in range(0, 40):
        title = browser.find_element_by_xpath("//a[@uigs='pc_"+str(i)+"_"+str(j)+"_title']")
        detail = browser.find_element_by_xpath("//a[@uigs='pc_"+str(i)+"_"+str(j)+"_title']/../..//p")
        s = x.text+'  '+title.text+'  '+detail.text
        print s
{% endcode %}
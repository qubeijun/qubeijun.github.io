---
title: mysql数据库操作总结
date: 2019-04-25 11:14:11
tags: 数据库
categories: 
---

<!--more-->

<p>0、安装过程自行百度，都可以百度到。安装完成后，进入mysql命令行模式。</p>

<blockquote>
<p>mysql -u root -p</p>
</blockquote>

<p><img alt="" class="has" height="432" src="https://i-blog.csdnimg.cn/blog_migrate/4547d981021626acaec14e7075d031d8.png" width="691" /></p>

<p>1、新建、查看数据库</p>

<blockquote>
<p>create database bookstore;</p>
</blockquote>

<p> <img alt="" class="has" height="432" src="https://i-blog.csdnimg.cn/blog_migrate/73a476a4c369d89d4afd4a2195938a2f.png" width="691" /></p>

<blockquote>
<p>show databases;</p>
</blockquote>

<p><img alt="" class="has" height="432" src="https://i-blog.csdnimg.cn/blog_migrate/d196b4a8b168ae12cc40590a994f6839.png" width="691" /></p>

<p>2、在指定数据库中创建表。</p>

<blockquote>
<p>use test</p>
</blockquote>

<blockquote>
<p>create table user</p>

<p>(</p>

<p>   id                int auto_increment not null,</p>

<p>   username   varchar(10) not null,</p>

<p>   password   varchar(10) not null,</p>

<p>   primary       key(id)</p>

<p>);</p>
</blockquote>

<p><img alt="" class="has" height="432" src="https://i-blog.csdnimg.cn/blog_migrate/3b77a130155893f68425164b104f17c2.png" width="691" /></p>

<blockquote>
<p>show tables;</p>
</blockquote>

<blockquote>
<p>descirbe tables;</p>
</blockquote>

<p><img alt="" class="has" height="432" src="https://i-blog.csdnimg.cn/blog_migrate/b24d3a39ce384e88e8adea1a89af5ecc.png" width="691" /></p>

<p>3、向表中加入数据记录。</p>

<blockquote>
<p>insert into user values(1,'yu','yu');</p>

<p>insert into user values(2,'zhouhejun','19830925');</p>
</blockquote>

<p><img alt="" class="has" height="432" src="https://i-blog.csdnimg.cn/blog_migrate/1e16e63ef6e0c12e3029b69cf1aa2d71.png" width="691" /></p>

<p> </p>

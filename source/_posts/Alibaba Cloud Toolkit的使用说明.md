---
title: Alibaba Cloud Toolkit的使用说明
tags:
  - java
  - 一键部署
  - Alibaba Cloud Toolkit
categories: 技术
description: Alibaba Cloud Toolkit（Eclipse插件，后文简称Cloud Toolkit）是阿里云针对IDE平台为开发者提供的一款插件，用于帮助开发者高效开发并部署适合在云端运行的应用。
toc_number: false
abbrlink: 2379
date: 2021-02-02 14:56:42
---

<!--more-->

<p>做开发，免不了要往服务器部署前端后端，首先要用xftp把前后端所在文件夹打开，把jar、dist备份再上传，然后再打开xshell把前后端kill掉，然后再敲命令重新启动前后端，少则2、3分钟，多则10分钟（我瞎掰的）。每天ctrl+c、ctrl+v就够了，还要重复去部署系统。可能有的人只需要一天部署一次就可以了，但是在我这，只要就改动，PM就想看结果，就要部署系统。有的时候甚至两次部署的时间不超过1分钟，都是我前脚刚部署完，后脚开发说，哎呀我改错了，等我改好了，你再部署一次。所以，为了去寻找解决方法，我练就了一指禅（一键部署）。</p>

<blockquote>
<p>Alibaba Cloud Toolkit（Eclipse插件，后文简称Cloud Toolkit）是阿里云针对IDE平台为开发者提供的一款插件，用于帮助开发者高效开发并部署适合在云端运行的应用。您在本地完成应用程序的开发、调试和测试后，可以使用在IDE（如Eclipse或IntelliJ）中安装的Cloud Toolkit插件，通过图形配置的方式连接到云端部署环境并将应用程序快速部署到云端。</p>
</blockquote>

<p>摘自<a href="https://help.aliyun.com/product/29966.html?spm=a2c4g.11186623.6.540.7fa0459akNTamA">https://help.aliyun.com/product/29966.html?spm=a2c4g.11186623.6.540.7fa0459akNTamA</a></p>

<h1>1、安装插件</h1>

<p>打开idea --&gt; File --&gt; Setting --&gt; Plugins，在MarketPlace中搜索【Alibaba Cloud Toolkit】，点击install（我这里是已经安装完成的状态）。</p>

{% asset_img toolkit1.png %}

<h1>2、添加服务器</h1>

<p>打开Tools --&gt; Alibaba Cloud --&gt; Alibaba Cloud View --&gt; Host。</p>

{% asset_img toolkit2.png %}

<p>添加工程需要部署的Linux服务器，在Add Host对话框中设置Host List、Username、Password，完成参数设置后，可以单击Test Connection来测试是否能成功连接服务器。在Advanced对话框中设置Tag和Description等参数，在添加多个服务器后，便于区分。完成后单击Add。</p>

{% asset_img toolkit3.png %}{% asset_img toolkit4.png %}

<p>添加完成之后，可以在idea最下面{% asset_img toolkit5.png %}中看到你所新建的Host。</p>

{% asset_img toolkit6.png %}

<h1>3、部署后端应用</h1>

<p>打开Tools --&gt; Alibaba Cloud --&gt; Deploy to Host...</p>

<p>1.Name修改为便于自己分辨的名字；</p>

<p>2.打开Deployment，如果你的maven工程，选择Maven Build；</p>

<p>3.点击右侧的【+】选择需要部署的Host；</p>

<p>4.Target Directory填写需要上传jar包的路径；</p>

<p>5.After deploy选择上传jar包后需要执行的命令；</p>

<p>6.maven工程打包命令；</p>

<p>7.打开Advanced，Before deploy选择上传jar包前需要执行的命令；</p>

<p>8.Apply。</p>

{% asset_img toolkit17.png %}{% asset_img toolkit8.png %}

<p>只有一个工程的情况下，Apply成功后，点击Run直接部署程序到服务器。</p>

<p>因为我的工程是spring cloud微服务，所有会有多个jar包需要部署，那么就要按照上面的步骤再创建一个配置。但是在上传jar包前需要备份原来的jar包，在上传之后还要重启jar包，但是现在有两个工程，所以我会在第一个工程的Before deploy运行备份的命令，在第二个工程的After deploy运行重启的命令。</p>

{% asset_img toolkit9.png %}{% asset_img toolkit10.png %}

<p>我只写了简单的备份和重启命令，如果有需要，可以自行添加。</p>

<blockquote>
<p>bak.sh（备份），mv的同时直接将jar包重命名为.bak+当前时间。</p>
</blockquote>

{% asset_img toolkit11.png %}

<blockquote>
<p>restart.sh （重启）</p>
</blockquote>

{% asset_img toolkit12.png %}

<p>如果没有前端则直接跳到第五步。</p>

<h1>4、部署前端应用</h1>

<p>打开Tools --&gt; Alibaba Cloud --&gt; Deploy to Host...</p>

<p>1.Name修改为便于自己分辨的名字；</p>

<p>2.打开Deployment，选择Upload File，选择需要上传的前端文件；</p>

<p>3.点击右侧的【+】选择需要部署的Host；</p>

<p>4.Target Directory填写需要上传前端dist的路径；</p>

<p>5.After deploy选择上传前端dist后需要执行的命令；</p>

<p>6.前端工程打包命令；</p>

<p>7.打开Advanced，Before deploy选择上传前端dist前需要执行的命令；</p>

<p>8.Apply。</p>

{% asset_img toolkit13.png %}{% asset_img toolkit14.png %}

<p>前端只写了备份，重启的话直接运行tomcat下的startup.sh</p>

<blockquote>
<p>bakvue.sh</p>
</blockquote>

{% asset_img toolkit15.png %}

<h1>5、部署多工程应用</h1>

<p>至此，前后端都单独创建了部署步骤，接下来就是一键部署的终极目标。</p>

<p>1、点击菜单栏Run --&gt; Edit Configurations... ，点击【+】选择Cloud Toolkit Multirun</p>

{% asset_img toolkit16.png %}

<p>2、起名字，点击【+】选择配置好的前后端。工程1和工程2要注意先后顺序，工程1中有上传前需要执行的命令，工程2有上传后需要执行的命令。然后保存。</p>

{% asset_img toolkit17.png %}

<p> 至此，所有一键部署相关都配置完成，接下来就是一指禅的终极时刻。选择你建好的配置，然后直接点击右侧绿色按钮，接下来You can do whatever you want.</p>

{% asset_img toolkit18.png %}

<p>结果也可以在控制台查看</p>

{% asset_img toolkit19.png %}

<p>神功已练成，尽情coding。 </p>

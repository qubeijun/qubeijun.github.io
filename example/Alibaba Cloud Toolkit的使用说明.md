---
title: Alibaba Cloud Toolkit的使用说明
date: 2021-02-02 14:56:42
tags: java 一键部署 cloud toolkit
categories: 
---

<!--more-->

<p style="text-indent:33px;"><span style="color:#4d4d4d;">做开发，免不了要往服务器部署前端后端，首先要用xftp把前后端所在文件夹打开，把jar、dist备份再上传，然后再打开xshell把前后端kill掉，然后再敲命令重新启动前后端，少则2、3分钟，多则10分钟（我瞎掰的）。每天ctrl+c、ctrl+v就够了，还要重复去部署系统。可能有的人只需要一天部署一次就可以了，但是在我这，只要就改动，PM就想看结果，就要部署系统。有的时候甚至两次部署的时间不超过1分钟，都是我前脚刚部署完，后脚开发说，哎呀我改错了，等我改好了，你再部署一次。所以，为了去寻找解决方法，我练就了一指禅（一键部署）。</span></p>

<blockquote>
<p style="text-indent:33px;">Alibaba Cloud Toolkit（Eclipse插件，后文简称Cloud Toolkit）是阿里云针对IDE平台为开发者提供的一款插件，用于帮助开发者高效开发并部署适合在云端运行的应用。您在本地完成应用程序的开发、调试和测试后，可以使用在IDE（如Eclipse或IntelliJ）中安装的Cloud Toolkit插件，通过图形配置的方式连接到云端部署环境并将应用程序快速部署到云端。</p>
</blockquote>

<p>摘自 <a href="https://help.aliyun.com/product/29966.html?spm=a2c4g.11186623.6.540.7fa0459akNTamA">https://help.aliyun.com/product/29966.html?spm=a2c4g.11186623.6.540.7fa0459akNTamA</a></p>

<h1>1、安装插件</h1>

<p style="text-indent:33px;">打开idea --&gt; File --&gt; Setting --&gt; Plugins，在MarketPlace中搜索【Alibaba Cloud Toolkit】，点击install（我这里是已经安装完成的状态）。</p>

<p><img alt="" height="712" src="https://i-blog.csdnimg.cn/blog_migrate/9d2b4c1069a4fec85d8251b25692a746.png" width="1014" /></p>

<h1>2、添加服务器</h1>

<p style="text-indent:33px;">打开Tools --&gt; Alibaba Cloud --&gt; Alibaba Cloud View --&gt; Host.</p>

<p><img alt="" height="333" src="https://i-blog.csdnimg.cn/blog_migrate/2538e39c98c8bbb04760173bf08782f5.png" width="721" /></p>

<p style="text-indent:33px;">添加工程需要部署的Linux服务器，在Add Host对话框中设置Host List、Username、Password，完成参数设置后，可以单击Test Connection来测试是否能成功连接服务器。在Advanced对话框中设置Tag和Description等参数，在添加多个服务器后，便于区分。完成后单击Add.</p>

<p><img alt="" height="551" src="https://i-blog.csdnimg.cn/blog_migrate/e4be51931bacea53e5896751c0f4b24c.png" width="498" /> <img alt="" height="551" src="https://i-blog.csdnimg.cn/blog_migrate/e3bf57e3a7b837a7f2ab613d49e0fa6f.png" width="500" /></p>

<p style="text-indent:33px;">添加完成之后，可以在idea最下面<img alt="" height="23" src="https://i-blog.csdnimg.cn/blog_migrate/f0d6d515cfca5154fb877f08a6e7e8ca.png" width="150" />中看到你所新建的Host。</p>

<p><img alt="" height="336" src="https://i-blog.csdnimg.cn/blog_migrate/931227493d6d4d6d0303d4c09fbb7439.png" width="1200" /></p>

<h1>3、部署后端应用</h1>

<p style="text-indent:33px;">打开Tools --&gt; Alibaba Cloud --&gt; Deploy to Host...</p>

<p style="text-indent:33px;">1.Name修改为便于自己分辨的名字；</p>

<p style="text-indent:33px;">2.打开Deployment，如果你的maven工程，选择Maven Build；</p>

<p style="text-indent:33px;">3.点击右侧的【+】选择需要部署的Host；</p>

<p style="text-indent:33px;">4.Target Directory填写需要上传jar包的路径；</p>

<p style="text-indent:33px;">5.After deploy选择上传jar包后需要执行的命令；</p>

<p style="text-indent:33px;">6.maven工程打包命令；</p>

<p style="text-indent:33px;">7.打开Advanced，Before deploy选择上传jar包前需要执行的命令；</p>

<p style="text-indent:33px;">8.Apply。</p>

<p> <img alt="" height="662" src="https://i-blog.csdnimg.cn/blog_migrate/b513b24e7793bfea48537bcc17879d2e.png" width="495" /> <img alt="" height="663" src="https://i-blog.csdnimg.cn/blog_migrate/fb6983ef580fb9cd37b229cdbbf476bf.png" width="493" /></p>

<p style="text-indent:33px;">只有一个工程的情况下，Apply成功后，点击Run直接部署程序到服务器。</p>

<p style="text-indent:33px;">因为我的工程是spring cloud微服务，所有会有多个jar包需要部署，那么就要按照上面的步骤再创建一个配置。但是在上传jar包前需要备份原来的jar包，在上传之后还要重启jar包，但是现在有两个工程，所以我会在第一个工程的Before deploy运行备份的命令，在第二个工程的After deploy运行重启的命令。</p>

<p><img alt="" height="453" src="https://i-blog.csdnimg.cn/blog_migrate/33ec40aaf2b815e8a2701a7984520268.png" width="631" /> <img alt="" height="453" src="https://i-blog.csdnimg.cn/blog_migrate/ae35404b2a99be1dbb260333640f8a0a.png" width="633" /></p>

<p style="text-indent:0;">我只写了简单的备份和重启命令，如果有需要，可以自行添加。</p>

<blockquote>
<p>bak.sh（备份），mv的同时直接将jar包重命名为.bak+当前时间。</p>
</blockquote>

<p> <img alt="" height="120" src="https://i-blog.csdnimg.cn/blog_migrate/4b47142167da02ac506e6941f633491a.png" width="956" /></p>

<blockquote>
<p>restart.sh （重启）</p>
</blockquote>

<p><img alt="" height="169" src="https://i-blog.csdnimg.cn/blog_migrate/54540d4308a2651f075170b4c0958669.png" width="956" /></p>

<p>如果没有前端则直接跳到第五步。</p>

<h1>4、部署前端应用</h1>

<p style="text-indent:33px;">打开Tools --&gt; Alibaba Cloud --&gt; Deploy to Host...</p>

<p style="text-indent:33px;">1.Name修改为便于自己分辨的名字；</p>

<p style="text-indent:33px;">2.打开Deployment，选择Upload File，选择需要上传的前端文件；</p>

<p style="text-indent:33px;">3.点击右侧的【+】选择需要部署的Host；</p>

<p style="text-indent:33px;">4.Target Directory填写需要上传前端dist的路径；</p>

<p style="text-indent:33px;">5.After deploy选择上传前端dist后需要执行的命令；</p>

<p style="text-indent:33px;">6.前端工程打包命令；</p>

<p style="text-indent:33px;">7.打开Advanced，Before deploy选择上传前端dist前需要执行的命令；</p>

<p style="text-indent:33px;">8.Apply。</p>

<p style="text-indent:0;"><img alt="" height="663" src="https://i-blog.csdnimg.cn/blog_migrate/eaa29cb3f3e6d40adb1f6b81d5462321.png" width="612" /> <img alt="" height="367" src="https://i-blog.csdnimg.cn/blog_migrate/30560edc50c314345450602a44857e47.png" width="568" /></p>

<p style="text-indent:0;">前端只写了备份，重启的话直接运行tomcat下的startup.sh</p>

<blockquote>
<p style="text-indent:0;">bakvue.sh</p>
</blockquote>

<p> <img alt="" height="108" src="https://i-blog.csdnimg.cn/blog_migrate/c1b8db6924c6a9f8c00756beff84e1fd.png" width="956" /></p>

<h1>5、部署多工程应用</h1>

<p style="text-indent:33px;">至此，前后端都单独创建了部署步骤，接下来就是一键部署的终极目标。</p>

<p style="text-indent:33px;">1、点击菜单栏Run --&gt; Edit Configurations... ，点击【+】选择Cloud Toolkit Multirun</p>

<p> <img alt="" height="685" src="https://i-blog.csdnimg.cn/blog_migrate/44e7b11e216acdd5cf96b22958f1c8aa.png" width="958" /></p>

<p style="text-indent:33px;">2、起名字，点击【+】选择配置好的前后端。工程1和工程2要注意先后顺序，工程1中有上传前需要执行的命令，工程2有上传后需要执行的命令。然后保存。</p>

<p> <img alt="" height="685" src="https://i-blog.csdnimg.cn/blog_migrate/38c8efab0d3ce3afd7b974f123e4e2a5.png" width="956" /></p>

<p style="text-indent:33px;"> 至此，所有一键部署相关都配置完成，接下来就是一指禅的终极时刻。选择你建好的配置，然后直接点击右侧绿色按钮，接下来You can do whatever you want.</p>

<p><img alt="" height="309" src="https://i-blog.csdnimg.cn/blog_migrate/facf03d84ba0b852190cc2d114562482.png" width="1200" /></p>

<p style="text-indent:33px;">结果也可以在控制台查看</p>

<p style="text-indent:0;"><img alt="" height="861" src="https://i-blog.csdnimg.cn/blog_migrate/f0bd7f4dd515b518a7ced5b9fe6fc1ef.png" width="1200" /></p>

<p>神功已练成，尽情coding。 </p>

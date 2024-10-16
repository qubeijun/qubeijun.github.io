---
title: Dojo简单入门
date: 2020-03-19 10:50:05
tags: dojo
categories: 
---

<!--more-->

<p><em>Dojo</em>是一个用javascript语言实现的开源DHTML工具包。</p>

<p>以前从来没听过，PM说未来项目需要，所以就用一天时间大概过了一遍。中文教程确实非常少，找教程找了半天找到了<a href="https://www.ibm.com/developerworks/cn/web/wa-ground/index.html?ca=drs-">一个</a>，但对于小白来说入门是非常容易了。</p>

<pre>
<code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en" dir="ltr"&gt;
  &lt;head&gt;
    &lt;title&gt;Dijit Template&lt;/title&gt;
    &lt;link rel="stylesheet" href="dojo-release-1.16.2/dijit/themes/claro/claro.css" /&gt;
    &lt;link rel="stylesheet" href="dojo-release-1.16.2/dojox/form/resources/Rating.css" /&gt;
    &lt;style type="text/css"&gt;
      body,
      html {
        font-family: helvetica, arial, sans-serif;
        font-size: 90%;
      }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body class="claro"&gt;
    &lt;!-- HTML content here --&gt;

    &lt;!-- 1、声明的方式使用dijit --&gt;
    &lt;div dojoType="dijit._Calendar"&gt;&lt;/div&gt;
    &lt;!-- 2、javascript使用dijit --&gt;
    &lt;div id="myCalendar"&gt;&lt;/div&gt;
    &lt;!-- 按钮 --&gt;
    &lt;button id="myButton" dojoType="dijit.form.Button"&gt;Push Me&lt;/button&gt;
    &lt;!-- 五星好评 --&gt;
    &lt;div dojoType="dojox.form.Rating" numstars="5" value="3"&gt;&lt;/div&gt;
    &lt;!-- 内容窗格 --&gt;
    &lt;br /&gt;
    &lt;button dojoType="dijit.form.Button" id="myButton1"&gt;
      Load content using XHR
    &lt;/button&gt;
    &lt;div dojoType="dijit.layout.ContentPane" id="myContentPane1"&gt;
      &lt;h1&gt;Static content here!&lt;/h1&gt;
    &lt;/div&gt;

    &lt;!-- 堆叠容器 --&gt;
    &lt;div dojoType="dijit.layout.StackContainer" id="stackContainer"&gt;
      &lt;div dojoType="dijit.layout.ContentPane" title="Stack 1"&gt;
        This is the content in stack 1.
      &lt;/div&gt;
      &lt;div dojoType="dijit.layout.ContentPane" title="Stack 2"&gt;
        This is the content in stack 2.
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div dojoType="dijit.layout.StackController" containerId="stackContainer"&gt;&lt;/div&gt;

    &lt;!-- 选项卡容器 --&gt;
    &lt;div style="width: 535px; height: 290px"&gt;
      &lt;div dojoType="dijit.layout.TabContainer" style="width: 100%; height: 100%;"&gt;
        &lt;div dojoType="dijit.layout.ContentPane" title="Tab 1"&gt;
          This is the content in tab 1.
        &lt;/div&gt;
        &lt;div dojoType="dijit.layout.ContentPane" title="Tab 2"&gt;
          This is the content in tab 2.
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- 折叠容器 --&gt;
    &lt;div style="width: 535px; height: 290px"&gt;
      &lt;div dojoType="dijit.layout.AccordionContainer" style="width: 100%; height: 100%;"&gt;
        &lt;div dojoType="dijit.layout.ContentPane" title="Blade 1"&gt;
          This is the content in blade 1.
        &lt;/div&gt;
        &lt;div dojoType="dijit.layout.ContentPane" title="Blade 2"&gt;
          This is the content in blade 2.
        &lt;/div&gt;
        &lt;div dojoType="dijit.layout.ContentPane" title="Blade 3"&gt;
          This is the content in blade 3.
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- 边框容器布局 --&gt;
    &lt;div style="width: 535px; height: 290px"&gt;
      &lt;div dojoType="dijit.layout.BorderContainer" style="width: 100%; height: 100%;"&gt;
        &lt;div dojoType="dijit.layout.ContentPane" region="top" splitter="true"&gt;
          This is the content in the top section.
        &lt;/div&gt;
        &lt;div dojoType="dijit.layout.ContentPane" region="left" style="width: 100px;" splitter="true"&gt;
          This is the content in the left section.
        &lt;/div&gt;
        &lt;div dojoType="dijit.layout.ContentPane" region="center" splitter="true"&gt;
          This is the content in the center section.
        &lt;/div&gt;
        &lt;div dojoType="dijit.layout.ContentPane" region="right" style="width: 100px;" splitter="true"&gt;
          This is the content in the right section.
        &lt;/div&gt;
        &lt;div dojoType="dijit.layout.ContentPane" region="bottom" splitter="true"&gt;
          This is the content in the bottom section.
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- 1、嵌套组件 --&gt;
    &lt;div dojoType="dijit.TitlePane" title="Color Picker"&gt;
      &lt;!-- 添加事件 --&gt;
      &lt;div dojoType="dijit.ColorPalette" onChange="alert(this.value)"&gt;
        &lt;script type="dojo/method" event="onChange" args="evt"&gt;
          alert(this.value);
        &lt;/script&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- 2、嵌套组件 --&gt;
    &lt;div id="myTitlePane"&gt;
      &lt;div id="myColorPalette"&gt;&lt;/div&gt;
    &lt;/div&gt;

    &lt;script src="dojo-release-1.16.2/dojo/dojo.js" djConfig="parseOnLoad: true"&gt;&lt;/script&gt;
    &lt;script&gt;
      dojo.require('dijit.dijit')
      //Add Dijit components you are using here using dojo.require
      dojo.require('dijit._Calendar')
      
      dojo.require('dojox.form.Rating')

      dojo.require('dijit.form.Button')
      dojo.require('dijit.Dialog')

      dojo.require('dijit.form.Button')
      dojo.require('dijit.layout.ContentPane')

      dojo.require('dijit.layout.StackContainer')
      dojo.require('dijit.layout.StackController')
      dojo.require('dijit.layout.ContentPane')

      dojo.require('dijit.layout.TabContainer')
      dojo.require('dijit.layout.ContentPane')

      dojo.require('dijit.layout.AccordionContainer')
      dojo.require('dijit.layout.ContentPane')

      dojo.require('dijit.layout.BorderContainer')
      dojo.require('dijit.layout.ContentPane')

      dojo.require('dijit.TitlePane')
      dojo.require('dijit.ColorPalette')

      dojo.addOnLoad(function() {
        //时间组件
        var calendar = new dijit.Calendar({}, 'myCalendar')
        //嵌套组件
        var colorPalette = new dijit.ColorPalette(
          {
            //1、点击事件方法1
            // onChange: function(evt) {
            //   alert(this.value)
            // }
          },
          'myColorPalette'
        )
        //2、点击事件方法2
        dojo.connect(colorPalette, 'onChange', null, function(evt) {
          alert(this.value)
        })
        var titlePane = new dijit.TitlePane({ title: 'Color Picker' }, 'myTitlePane')
        //JavaScript content here
        //按钮组件
        var button = dijit.byId('myButton')
        dojo.connect(button, 'onClick', null, function(evt) {
          var dialog = new dijit.Dialog({
            content: 'You clicked the button!',
            title: 'Message'
          }).show()
        })

        //内容窗格
        var button = dijit.byId('myButton1')
        var contentPane = dijit.byId('myContentPane1')
        dojo.connect(button, 'onClick', null, function(evt) {
          contentPane.attr('href', 'content.html')
        })
      })
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>

<p><img alt="" height="1200" src="https://i-blog.csdnimg.cn/blog_migrate/88c00098224c880c327d2e6eceff4954.png" width="679" /></p>

---
title: Angular简单入门
date: 2020-03-17 14:47:58
tags: angular2
categories: 
---

<!--more-->

<p>由于未来项目需要（PM说的），于是展开了一个新的技能树，在此记录Angular入门学习过程。今天从0开始接触。</p>

<p><em>话外：</em></p>

<p><em>AngularJS和Angular的区别</em></p>

<p><em>老的angular也就是1.x版本的称为AngularJS，新的2.x以上的版本重命名为Angular。所以肯定上手新的Angular。</em></p>

<h1>开始安装</h1>

<p>每个框架一般都有自己的脚手架，方便进行开发，使开发人员专注于开发，而不花费时间在环境配置上。</p>

<p><a href="https://angular.cn/cli">Angular CLI</a>就是Angular的脚手架。</p>

<p>全局安装Angular CLI（前提是已经安装node.js）</p>

<pre>
<code class="language-javascript">npm install -g @angular/cli</code></pre>

<p>创建一个新的、基本的 Angular 项目</p>

<pre>
<code>ng new my-first-project      #新建名为my-first-project项目
cd my-first-project          #打开my-first-project
ng serve -o                  #启动项目并从默认浏览器打开</code></pre>

<h1>开始学习</h1>

<p>根据官方例子进行学习</p>

<h2>一、模版语法</h2>

<p>1、通过*ngFor进行遍历操作，并用插值语法{{}}进行显示。</p>

<pre>
<code class="language-html">&lt;h2&gt;Products&lt;/h2&gt;
&lt;div *ngFor="let product of products"&gt;
  &lt;h3&gt;
      {{ product.name }}
  &lt;/h3&gt;
&lt;/div&gt;</code></pre>

<p><img alt="Product names added to list" src="https://i-blog.csdnimg.cn/blog_migrate/7c3430b0bf9dd6fb80e2775db97968c0.png" /></p>

<p>2、鼠标悬停预览详情</p>

<pre>
<code class="language-html">&lt;h2&gt;Products&lt;/h2&gt;
&lt;div *ngFor="let product of products"&gt;
  &lt;h3&gt;
    &lt;a [title]="product.name + ' details'"&gt;
      {{ product.name }}
    &lt;/a&gt;
  &lt;/h3&gt;
&lt;/div&gt;</code></pre>

<p><img alt="Product name anchor text is product name property" src="https://i-blog.csdnimg.cn/blog_migrate/ebb7315a25a85843bfb0c2197ce98ea1.png" /></p>

<p>3、添加商品说明。在&lt;p&gt;标签上，用*ngIf指令，这样 Angular 只会在当前商品有描述信息的情况下创建这个&lt;p&gt;元素。</p>

<pre>
<code class="language-html">&lt;h2&gt;Products&lt;/h2&gt;
&lt;div *ngFor="let product of products"&gt;
  &lt;h3&gt;
    &lt;a [title]="product.name + ' details'"&gt;
      {{ product.name }}
    &lt;/a&gt;
  &lt;/h3&gt;
  &lt;p *ngIf="product.description"&gt;
    Description: {{ product.description }}
  &lt;/p&gt;
&lt;/div&gt;</code></pre>

<p><img alt="Product descriptions added to list" src="https://i-blog.csdnimg.cn/blog_migrate/457a183bad3c470f271112f8e3f8068b.png" /></p>

<p>4、添加一个按钮，以便让用户可与朋友分享商品。</p>

<p>把 button的click事件绑定到我们替你定义好的share()方法上（位于product-list.component.ts）。</p>

<p>事件绑定是通过把事件名称包裹在圆括号（）中完成的。</p>

<pre>
<code class="language-html">&lt;h2&gt;Products&lt;/h2&gt;
&lt;div *ngFor="let product of products"&gt;
  &lt;h3&gt;
    &lt;a [title]="product.name + ' details'"&gt;
      {{ product.name }}
    &lt;/a&gt;
  &lt;/h3&gt;
  &lt;p *ngIf="product.description"&gt;
    Description: {{ product.description }}
  &lt;/p&gt;
  &lt;button (click)="share()"&gt;
    Share
  &lt;/button&gt;
&lt;/div&gt;</code></pre>

<p><img alt="Share button added for each product" src="https://i-blog.csdnimg.cn/blog_migrate/5e7bca3027c8df61f35fdd97419ba041.png" /></p>

<p>小结：</p>

<p>该应用现在具有商品列表和共享功能。Angular 模板语法的五个常用特性：</p>

<ul><li>
	<p>*ngFor</p>
	</li>
	<li>
	<p>*ngIf</p>
	</li>
	<li>
	<p>插值 {{}}</p>
	</li>
	<li>
	<p>属性绑定 []</p>
	</li>
	<li>
	<p>事件绑定（）</p>
	</li>
</ul><h2>二、组件 </h2>

<p><img alt="app-components.png" class="preview" src="https://i-blog.csdnimg.cn/blog_migrate/6bc2fb76f81cc69110a60a273d28b06d.png" /></p>

<ul><li>
	<p><code>app-root</code>(橙色框)是应用的外壳。这是第一个组件，也是所有其它组件的父组件。可以把它想象成一个基础页面。</p>
	</li>
	<li>
	<p><code>app-top-bar</code>（蓝色背景）是商店名称和结帐按钮。</p>
	</li>
	<li>
	<p><code>app-product-list</code>（紫色框）是你在上一节中修改过的商品列表。</p>
	</li>
</ul><p>1、创建一个新组件：product-alerts，包含三个主要文件：样式文件css，模版文件html，类文件ts。</p>

<pre>
<code class="language-html">ng generate component product-alerts</code></pre>

<p> <img alt="" height="91" src="https://i-blog.csdnimg.cn/blog_migrate/afa8831f1b88dd2d8d1a549343762bab.png" width="304" /></p>

<p>用命令生成的文件都是有默认模版的，规定以下带注释的都是后添加的。 </p>

<p><u><strong>文件product-alerts.component.ts</strong></u></p>

<pre>
<code class="language-javascript">import { Component, OnInit } from '@angular/core';

//从angular导入Input装饰器
import { Input } from '@angular/core';  
//从angular导入Ouput装饰器、EventEmitter事件发射器
import { Output, EventEmitter } from '@angular/core';                 

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {

  //定义一个带 @Input() 装饰器的 product 属性。
  //@Input() 装饰器指出其属性值是从该组件的父组件商品列表组件中传入的。
  @Input() product;  
  
  //用 @Output() 装饰器和一个事件发射器 EventEmitter() 实例定义一个名为 notify 的属性。
  //这可以让商品提醒组件在 notify 属性发生变化时发出事件。
  @Output() notify = new EventEmitter();  
                                  
  constructor() { }
  ngOnInit() {
  }
}</code></pre>

<p><u><strong>文件product-alerts.component.html</strong></u></p>

<pre>
<code class="language-html">&lt;!-- 如果商品价格超过 700 美元就要显示出来的“通知我”按钮。 --&gt;
&lt;p *ngIf="product.price &gt; 700"&gt;
  &lt;!-- 用事件绑定更新“Notify Me”按钮，以调用 notify.emit() 方法。 --&gt;
  &lt;button (click)="notify.emit()"&gt;Notify Me&lt;/button&gt;
&lt;/p&gt;</code></pre>

<p><u><strong>文件product-list.component.ts</strong></u></p>

<pre>
<code class="language-javascript">import { Component } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;

  share() {
    window.alert('The product has been shared!');
  }

  //应该由父组件（商品列表组件）采取行动，而不是商品提醒组件。
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}</code></pre>

<p>将product-alert作为组件写入product-list</p>

<p><u><strong>文件product-list.component.html</strong></u></p>

<pre>
<code class="language-html">&lt;h2&gt;Products&lt;/h2&gt;
&lt;div *ngFor="let product of products"&gt;
  &lt;h3&gt;
    &lt;a [title]="product.name + ' details'"&gt;
      {{ product.name }}
    &lt;/a&gt;
  &lt;/h3&gt;
  &lt;p *ngIf="product.description"&gt;
    Description: {{ product.description }}
  &lt;/p&gt;
  &lt;button (click)="share()"&gt;
    Share
  &lt;/button&gt;

  &lt;!-- product-alert组件 --&gt;
  &lt;!-- 修改商品列表组件以接收商品提醒组件的输出。 --&gt;
  &lt;app-product-alerts
    [product]="product" 
    (notify)="onNotify()"&gt;
  &lt;/app-product-alerts&gt;
&lt;/div&gt;</code></pre>

<p><img alt="Product alert button added to products over $700" src="https://i-blog.csdnimg.cn/blog_migrate/d93b25eef112ec48ad3231a35d64535d.png" /></p>

<h2>三、路由 </h2>

<p>将商品详情建立为组件，通过路由跳转访问详情。</p>

<p>注册路由</p>

<p><u><strong>文件app.module.ts</strong></u></p>

<pre>
<code class="language-javascript">@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },

      //添加一个商品详情路由，该路由的 path 是 products/:productId
      { path: 'products/:productId', component: ProductDetailsComponent },
    ])
  ],</code></pre>

<p><strong><u>文件product-list.component.html</u></strong></p>

<pre>
<code class="language-html">&lt;!-- 把商品索引赋值给productId --&gt;
&lt;div *ngFor="let product of products; index as productId"&gt;
  &lt;h3&gt;
    &lt;!-- 设置路由链接 --&gt;
    &lt;a [title]="product.name + ' details'" [routerLink]="['/products', productId]"&gt;
      {{ product.name }}
    &lt;/a&gt;
  &lt;/h3&gt;
&lt;/div&gt;</code></pre>

<p>新建商品详情组件</p>

<pre>
<code>ng generate component product-details</code></pre>

<p><strong><u>文件product-details.component.ts</u></strong></p>

<pre>
<code class="language-javascript">import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
//从 ../products 文件导入 products 数组
import { products } from "../products";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  //定义 product 属性，并把它加入构造函数括号中作为参数，以便把 ActivatedRoute 注入到构造函数中
  product;
  constructor(
    private route: ActivatedRoute,
  ) {}

  //在 ngOnInit() 方法中订阅了路由参数，并且根据 productId 获取了该产品
  ngOnInit() {
    this.route.paramMap.subscribe(params =&gt; {
      this.product = products[+params.get("productId")];
    });
  }
}
</code></pre>

<p><strong><u>文件product-details.component.html</u></strong></p>

<pre>
<code class="language-html">&lt;h2&gt;Product Details&lt;/h2&gt;
&lt;div *ngIf="product"&gt;
  &lt;h3&gt;{{ product.name }}&lt;/h3&gt;
  &lt;h4&gt;{{ product.price | currency }}&lt;/h4&gt;
  &lt;p&gt;{{ product.description }}&lt;/p&gt;
&lt;/div&gt;</code></pre>

<p>现在，当用户点击商品列表中的某个名字时，路由器就会导航到商品的不同网址。</p>

<p>用商品详情组件代替商品列表组件，并显示商品详情。</p>

<p><img alt="Product details page with updated URL and full details displayed" src="https://i-blog.csdnimg.cn/blog_migrate/dba984c5b47fedc4138867a98bb1ce6e.png" /></p>

<h2>四、管理数据</h2>

<p>服务是 Angular 应用的重要组成部分。</p>

<p>在 Angular 中，服务是一个类的实例，它可以借助 Angular 的<a href="https://angular.cn/guide/glossary#dependency-injection-di">依赖注入系统</a>来让应用中的任何一个部件都能使用它。</p>

<p>服务可以让你在应用的各个部件之间共享数据。对于在线商店，购物车服务就是存放购物车的数据和方法的地方。</p>

<p>1、定义购物车服务</p>

<pre>
<code class="language-javascript">ng generate service cart</code></pre>

<p><u><strong>文件cart.service.ts</strong></u></p>

<pre>
<code class="language-javascript">import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class CartService {
  //定义一个 items 属性来把当前商品的数组存储在购物车中
  items = [];
  constructor() {}
  //把商品添加到购物车方法
  addToCart(product) {
    this.items.push(product);
  }
  //返回购物车商品方法
  getItems() {
    return this.items;
  }
  //清除购物车商品的方法
  clearCart() {
    this.items = [];
    return this.items;
  }
}
</code></pre>

<p>2、使用购物车服务</p>

<p><u><strong>文件product-details.component.ts</strong></u></p>

<pre>
<code class="language-javascript">import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { products } from "../products";

//导入购物车服务
import { CartService } from "../cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product;

  //通过把购物车服务注入到这里的 constructor() 中来注入它
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  
  //定义 addToCart() 方法，该方法会当前商品添加到购物车中
  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params =&gt; {
      this.product = products[+params.get("productId")];
    });
  }
}
</code></pre>

<p><u><strong>文件product-details.component.html</strong></u></p>

<pre>
<code class="language-html">&lt;h2&gt;Product Details&lt;/h2&gt;
&lt;div *ngIf="product"&gt;
  &lt;h3&gt;{{ product.name }}&lt;/h3&gt;
  &lt;h4&gt;{{ product.price | currency }}&lt;/h4&gt;
  &lt;p&gt;{{ product.description }}&lt;/p&gt;
  &lt;!-- 添加一个标签为“Buy”的按钮，并把其 click() 事件绑定到 addToCart() 方法 --&gt;
  &lt;button (click)="addToCart(product)"&gt;Buy&lt;/button&gt;
&lt;/div&gt;</code></pre>

<p><img alt="Display details for selected product with a Buy button" src="https://i-blog.csdnimg.cn/blog_migrate/79c02b2761fe532c99eea1f7a5892e2c.png" /></p>

<p><img alt="Display details for selected product with a Buy button" src="https://i-blog.csdnimg.cn/blog_migrate/1f6ebcb06cba6cd9773dd83578a3f303.png" /></p>

<p>3、创建购物车页面 </p>

<pre>
<code class="language-javascript">ng generate component cart</code></pre>

<p> <u><strong>文件cart.component.html</strong></u></p>

<pre>
<code class="language-html">&lt;h3&gt;Cart&lt;/h3&gt;

&lt;div class="cart-item" *ngFor="let item of items"&gt;
  &lt;span&gt;{{ item.name }}&lt;/span&gt;
  &lt;span&gt;{{ item.price | currency }}&lt;/span&gt;
&lt;/div&gt;</code></pre>

<p>4、为购物车组件添加路由（URL 模式）</p>

<p>  <u><strong>文件app.module.ts</strong></u></p>

<pre>
<code class="language-javascript">@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      //为组件 CartComponent 添加一个路由，其路由为 cart
      { path: 'cart', component: CartComponent },
    ])
  ],</code></pre>

<p> </p>

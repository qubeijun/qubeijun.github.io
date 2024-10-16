---
title: vue基础知识点总结
tags: vue
categories: 前端
description: vue基础知识点总结
abbrlink: 29990
date: 2020-03-06 11:09:35
---

<!--more-->

<p id="计算属性缓存-vs-方法">1、计算属性缓存（computed）vs方法（methods）</p>

<p>计算属性</p>

{% code %}
<div id="example"></div>
  <p>Original message: "{ { message }}"</p>
  <p>Computed reversed message: "{ { reversedMessage }}"</p>
</div>
{% endcode %}

{% code %}
computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
{% endcode %}

<p>方法</p>


{% code %}
<code><p>Reversed message: "{ { reversedMessage() }}"</p></code>
{% endcode %}


{% code %}
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
{% endcode %}

<p>我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是<strong>计算属性是基于它们的响应式依赖进行缓存的</strong>。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 <code>message</code> 还没有发生改变，多次访问 <code>reversedMessage</code> 计算属性会立即返回之前的计算结果，而不必再次执行函数。相比之下，每当触发重新渲染时，调用方法将<strong>总会</strong>再次执行函数。</p>

<p>2、v-if vs v-show</p>

<p><code>v-if</code> 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。</p>

<p><code>v-if</code> 也是<strong>惰性的</strong>：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。</p>

<p>相比之下，<code>v-show</code> 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。</p>

<p>一般来说，<code>v-if</code> 有更高的切换开销，而 <code>v-show</code> 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 <code>v-show</code> 较好；如果在运行时条件很少改变，则使用 <code>v-if</code> 较好。</p>

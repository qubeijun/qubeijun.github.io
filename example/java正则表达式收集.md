---
title: java正则表达式收集
date: 2020-03-02 09:34:23
tags: java
categories: 
---

<!--more-->

<pre>
<code class="language-java">package _11zhengze;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    static boolean isValidMobileNumber(String s) {
        return s.matches("\\d{11}");
    }
    public static void main(String[] args) {
        //判断是否是电话号码
        System.out.println(isValidMobileNumber("18640274769"));

        //判断是否是20##年
        String regex = "20\\d\\d";
        System.out.println("2019".matches(regex)); // true
        System.out.println("2100".matches(regex)); // false

        //精确匹配 match
        String re1 = "abc";
        System.out.println("abc".matches(re1));
        System.out.println("Abc".matches(re1));
        System.out.println("abcd".matches(re1));

        String re2 = "a\\&amp;c"; // 对应的正则是a\&amp;c
        System.out.println("a&amp;c".matches(re2));
        System.out.println("a-c".matches(re2));
        System.out.println("a&amp;&amp;c".matches(re2));

        //匹配任意字符
        String re3 = "a.c";
        System.out.println("abc".matches(re3));
        System.out.println("aBc".matches(re3));

        //匹配数字
        String re4 = "00\\d";
        System.out.println("007".matches(re4));
        System.out.println("00A".matches(re4));

        //匹配常用字符  不能匹配#和空格
        String re5 = "java\\w";
        System.out.println("javac".matches(re5));
        System.out.println("java9".matches(re5));
        System.out.println("java_".matches(re5));
        System.out.println("java#".matches(re5));
        System.out.println("java ".matches(re5));

        //匹配空格字符  包括空格和tab
        String re6 = "a\\sc";
        System.out.println("a c".matches(re6));
        System.out.println("a\tc".matches(re6));

        //匹配非数字 类似 \W  \S
        String re7 = "java\\d"; // 对应的正则是java\d
        System.out.println("java9".matches(re7));
        System.out.println("java10".matches(re7));
        System.out.println("javac".matches(re7));

        String re8 = "java\\D";
        System.out.println("javax".matches(re8));
        System.out.println("java#".matches(re8));
        System.out.println("java5".matches(re8));

        //重复匹配
        String re9 = "A\\d*"; //匹配任意字符，包括0个
        System.out.println("A".matches(re9));
        System.out.println("A380".matches(re9));

        String re10 = "A\\d+"; //匹配至少一个字符
        System.out.println("A".matches(re10));
        System.out.println("A380".matches(re10));

        String re11 = "A\\d?"; //匹配0个或一个
        System.out.println("A".matches(re11));
        System.out.println("A3".matches(re11));
        System.out.println("A380".matches(re11));

        //匹配指定个数字符
        String re12 = "A\\d{3}"; //3个
        System.out.println("A380".matches(re12));
        String re13 = "A\\d{3,5}"; //3到5个
        System.out.println("A380".matches(re13));
        System.out.println("A3801".matches(re13));
        String re14 = "A\\d{3,}"; //至少三个
        System.out.println("A38023421".matches(re14));

        /**复杂匹配规则*/
        //^匹配开头和$结尾
        String re15 = "^A\\d{3}$"; //至少三个
        System.out.println("A380".matches(re15));

        //匹配指定范围
        String re16 = "[123456789]\\d{6,7}";
        String re17 = "[1...9]\\d{6,7}";
        System.out.println("1864027".matches(re16));
        System.out.println("1864027".matches(re17));
        String re18 = "[0-9a-fA-F]{6}"; //匹配0-9,a-f,A-F
        System.out.println("1A2b3c".matches(re18));
        String re19 = "[^1-9]{3}"; //排除法，不包含1-9
        System.out.println("ABC".matches(re19));
        System.out.println("AB1".matches(re19));

        //或规则匹配
        String re20 = "java|php";
        System.out.println("java".matches(re20));
        System.out.println("php".matches(re20));
        System.out.println("go".matches(re20));


        //使用括号 重复部分
        String re21 = "learn\\s(java|php|go)";
        System.out.println("learn java".matches(re21));
        System.out.println("learn Java".matches(re21));
        System.out.println("learn php".matches(re21));
        System.out.println("learn Go".matches(re21));

        //分组匹配
        Pattern pattern = Pattern.compile("(\\d{3,4})\\-(\\d{7,8})");
        pattern.matcher("010-12345678").matches(); // true
        pattern.matcher("021-123456").matches(); // true
        pattern.matcher("022#1234567").matches(); // false
        // 获得Matcher对象:
        Matcher matcher = pattern.matcher("010-12345678");
        if (matcher.matches()) {
            String whole = matcher.group(0); // "010-12345678", 0表示匹配的整个字符串
            String area = matcher.group(1); // "010", 1表示匹配的第1个子串
            String tel = matcher.group(2); // "12345678", 2表示匹配的第2个子串
            System.out.println(whole);
            System.out.println(area);
            System.out.println(tel);
        }

        //非贪婪匹配 尽可能少的匹配
        Pattern pattern1 = Pattern.compile("(\\d+?)(0*)");
        Matcher matcher1 = pattern1.matcher("1230000");
        if (matcher1.matches()) {
            System.out.println("group1=" + matcher1.group(1)); // "123"
            System.out.println("group2=" + matcher1.group(2)); // "0000"
        }

        //分割字符串
        String[] s = "a, b ;; c".split("[\\,\\;\\s]+");
        System.out.println(s[0]+s[1]+s[2]);

        //搜索字符串
        String s1 = "the quick brown fox jumps over the lazy dog.";
        Pattern p = Pattern.compile("\\wo\\w");
        Matcher m = p.matcher(s1);
        while (m.find()) {
            String sub = s1.substring(m.start(), m.end());
            System.out.println(sub);
        }

        //替换字符串
        String s2 = "The     quick\t\t brown   fox  jumps   over the  lazy dog.";
        String r = s2.replaceAll("\\s+", " ");
        System.out.println(r); // "The quick brown fox jumps over the lazy dog."

        //反向引用
        String s3 = "the quick brown fox jumps over the lazy dog.";
        String r3 = s3.replaceAll("\\s([a-z]{4})\\s", " &lt;b&gt;$1&lt;/b&gt; ");
        System.out.println(r3);
    }
}
</code></pre>

<p>单个字符的匹配规则如下：</p>

<table><thead><tr><th>正则表达式</th>
			<th>规则</th>
			<th>可以匹配</th>
		</tr></thead><tbody><tr><td><code>A</code></td>
			<td>指定字符</td>
			<td><code>A</code></td>
		</tr><tr><td><code>\u548c</code></td>
			<td>指定Unicode字符</td>
			<td><code>和</code></td>
		</tr><tr><td><code>.</code></td>
			<td>任意字符</td>
			<td><code>a</code>，<code>b</code>，<code>&amp;</code>，<code>0</code></td>
		</tr><tr><td><code>\d</code></td>
			<td>数字0~9</td>
			<td><code>0</code>~<code>9</code></td>
		</tr><tr><td><code>\w</code></td>
			<td>大小写字母，数字和下划线</td>
			<td><code>a</code>~<code>z</code>，<code>A</code>~<code>Z</code>，<code>0</code>~<code>9</code>，<code>_</code></td>
		</tr><tr><td><code>\s</code></td>
			<td>空格、Tab键</td>
			<td>空格，Tab</td>
		</tr><tr><td><code>\D</code></td>
			<td>非数字</td>
			<td><code>a</code>，<code>A</code>，<code>&amp;</code>，<code>_</code>，……</td>
		</tr><tr><td><code>\W</code></td>
			<td>非\w</td>
			<td><code>&amp;</code>，<code>@</code>，<code>中</code>，……</td>
		</tr><tr><td><code>\S</code></td>
			<td>非\s</td>
			<td><code>a</code>，<code>A</code>，<code>&amp;</code>，<code>_</code>，……</td>
		</tr></tbody></table><p>多个字符的匹配规则如下：</p>

<table><thead><tr><th>正则表达式</th>
			<th>规则</th>
			<th>可以匹配</th>
		</tr></thead><tbody><tr><td><code>A*</code></td>
			<td>任意个数字符</td>
			<td>空，<code>A</code>，<code>AA</code>，<code>AAA</code>，……</td>
		</tr><tr><td><code>A+</code></td>
			<td>至少1个字符</td>
			<td><code>A</code>，<code>AA</code>，<code>AAA</code>，……</td>
		</tr><tr><td><code>A?</code></td>
			<td>0个或1个字符</td>
			<td>空，<code>A</code></td>
		</tr><tr><td><code>A{3}</code></td>
			<td>指定个数字符</td>
			<td><code>AAA</code></td>
		</tr><tr><td><code>A{2,3}</code></td>
			<td>指定范围个数字符</td>
			<td><code>AA</code>，<code>AAA</code></td>
		</tr><tr><td><code>A{2,}</code></td>
			<td>至少n个字符</td>
			<td><code>AA</code>，<code>AAA</code>，<code>AAAA</code>，……</td>
		</tr><tr><td><code>A{0,3}</code></td>
			<td>最多n个字符</td>
			<td>空，<code>A</code>，<code>AA</code>，<code>AAA</code></td>
		</tr></tbody></table><p>复杂匹配规则主要有：</p>

<table><thead><tr><th>正则表达式</th>
			<th>规则</th>
			<th>可以匹配</th>
		</tr></thead><tbody><tr><td>^</td>
			<td>开头</td>
			<td>字符串开头</td>
		</tr><tr><td>$</td>
			<td>结尾</td>
			<td>字符串结束</td>
		</tr><tr><td>[ABC]</td>
			<td>[…]内任意字符</td>
			<td>A，B，C</td>
		</tr><tr><td>[A-F0-9xy]</td>
			<td>指定范围的字符</td>
			<td><code>A</code>，……，<code>F</code>，<code>0</code>，……，<code>9</code>，<code>x</code>，<code>y</code></td>
		</tr><tr><td>[^A-F]</td>
			<td>指定范围外的任意字符</td>
			<td>非<code>A</code>~<code>F</code></td>
		</tr><tr><td>AB|CD|EF</td>
			<td>AB或CD或EF</td>
			<td><code>AB</code>，<code>CD</code>，<code>EF</code></td>
		</tr></tbody></table><p> </p>

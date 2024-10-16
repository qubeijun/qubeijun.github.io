---
title: java调试代码不再用system.out.println()，用日志来调试程序
date: 2020-02-27 13:14:38
tags: java logging
categories: 
---

<!--more-->

<p>java调试代码不再用system.out.println();，用完再删除，想用了再添加。</p>

<p>用日志直接打印。</p>

<p>两对好基友：Commons Logging加Log4j，SLF4J加Logback。</p>

<p>两对好基友看不起java内置的JDK Logging</p>

<p>JDK Logging</p>

<pre>
<code class="language-java">package _22javacoreclass;

import java.util.logging.Logger;


public class Main5{
    public static void main(String[] args) {
        Logger logger = Logger.getGlobal();
        /**JDK Logging */
        //默认info，info以下不打印信息
        //不常用
        //严重
        logger.severe("process will be terminated...");
        //警告
        logger.warning("memory is running out...");
        //信息
        logger.info("start process...");
        //config
        logger.config("ignored.");
        //fine
        logger.fine("ignored.");
        //finer
        logger.finer("ignored.");
        //finest
        logger.finest("ignored.");
    }
}</code></pre>

<p>Commons Logging加Log4j，需要增加log4j2.xml</p>

<pre>
<code class="language-java">package _22javacoreclass;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class Main5{
    public static void main(String[] args) {
        /**Commons Logging */
        Log log = LogFactory.getLog(Main5.class);
        log.fatal("fatal...");
        log.error("error.");
        log.warn("warn...");
        log.info("info.");
        log.debug("debug...");
        log.trace("trace.");

        /**Log4j */ 
        // Commons Logging自动发现并调用|好基友

    }
}</code></pre>

<p> log4j2.xml</p>

<pre>
<code class="language-html">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Configuration&gt;
    &lt;Properties&gt;
        &lt;!-- 定义日志格式 --&gt;
        &lt;Property name="log.pattern"&gt;%d{MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36}%n%msg%n%n&lt;/Property&gt;
        &lt;!-- 定义文件名变量 --&gt;
        &lt;Property name="file.err.filename"&gt;log/err.log&lt;/Property&gt;
        &lt;Property name="file.err.pattern"&gt;log/err.%i.log.gz&lt;/Property&gt;
    &lt;/Properties&gt;
    &lt;!-- 定义Appender，即目的地 --&gt;
    &lt;Appenders&gt;
        &lt;!-- 定义输出到屏幕 --&gt;
        &lt;Console name="console" target="SYSTEM_OUT"&gt;
            &lt;!-- 日志格式引用上面定义的log.pattern --&gt;
            &lt;PatternLayout pattern="${log.pattern}" /&gt;
        &lt;/Console&gt;
        &lt;!-- 定义输出到文件,文件名引用上面定义的file.err.filename --&gt;
        &lt;RollingFile name="err" bufferedIO="true" fileName="${file.err.filename}" filePattern="${file.err.pattern}"&gt;
            &lt;PatternLayout pattern="${log.pattern}" /&gt;
            &lt;Policies&gt;
                &lt;!-- 根据文件大小自动切割日志 --&gt;
                &lt;SizeBasedTriggeringPolicy size="1 MB" /&gt;
            &lt;/Policies&gt;
            &lt;!-- 保留最近10份 --&gt;
            &lt;DefaultRolloverStrategy max="10" /&gt;
        &lt;/RollingFile&gt;
    &lt;/Appenders&gt;
    &lt;Loggers&gt;
        &lt;Root level="info"&gt;
            &lt;!-- 对info级别的日志，输出到console --&gt;
            &lt;AppenderRef ref="console" level="info" /&gt;
            &lt;!-- 对error级别的日志，输出到err，即上面定义的RollingFile --&gt;
            &lt;AppenderRef ref="err" level="error" /&gt;
        &lt;/Root&gt;
    &lt;/Loggers&gt;
&lt;/Configuration&gt;</code></pre>

<p>SLF4J加Logback，需要增加logback.xml</p>

<pre>
<code class="language-java">package _22javacoreclass;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//SLF4J和Logback好基友
public class Main51 {
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(Main51.class);
        logger.error("error.");
        logger.warn("warn...");
        logger.info("info.");
        logger.debug("debug...");
        logger.trace("trace.");
    }
}
</code></pre>

<p>logback.xml</p>

<pre>
<code class="language-html">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;

    &lt;appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender"&gt;
        &lt;encoder&gt;
            &lt;pattern&gt;%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n&lt;/pattern&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender"&gt;
        &lt;encoder&gt;
            &lt;pattern&gt;%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n&lt;/pattern&gt;
            &lt;charset&gt;utf-8&lt;/charset&gt;
        &lt;/encoder&gt;
        &lt;file&gt;log/output.log&lt;/file&gt;
        &lt;rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy"&gt;
            &lt;fileNamePattern&gt;log/output.log.%i&lt;/fileNamePattern&gt;
        &lt;/rollingPolicy&gt;
        &lt;triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy"&gt;
            &lt;MaxFileSize&gt;1MB&lt;/MaxFileSize&gt;
        &lt;/triggeringPolicy&gt;
    &lt;/appender&gt;

    &lt;root level="INFO"&gt;
        &lt;appender-ref ref="CONSOLE" /&gt;
        &lt;appender-ref ref="FILE" /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;</code></pre>

<p> </p>

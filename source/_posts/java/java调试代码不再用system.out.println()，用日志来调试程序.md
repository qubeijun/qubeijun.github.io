---
title: java调试代码不再用system.out.println()，用日志来调试程序
tags:
  - java
  - logging
categories: java
description: java调试代码不再用system.out.println();，用完再删除，想用了再添加。用日志直接打印。两对好基友：Commons Logging加Log4j，SLF4J加Logback。
abbrlink: 5004
date: 2020-02-27 13:14:38
---

<!--more-->

<p>java调试代码不再用system.out.println();，用完再删除，想用了再添加。</p>

<p>用日志直接打印。</p>

<p>两对好基友：Commons Logging加Log4j，SLF4J加Logback。</p>

<p>两对好基友看不起java内置的JDK Logging</p>

<p>JDK Logging</p>

{% code %}
package _22javacoreclass;

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
}
{% endcode %}

<p>Commons Logging加Log4j，需要增加log4j2.xml</p>

{% code %}
package _22javacoreclass;

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
}
{% endcode %}

<p> log4j2.xml</p>

{% code %}
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Properties>
        <!-- 定义日志格式 -->
        <Property name="log.pattern">%d{MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36}%n%msg%n%n</Property>
        <!-- 定义文件名变量 -->
        <Property name="file.err.filename">log/err.log</Property>
        <Property name="file.err.pattern">log/err.%i.log.gz</Property>
    </Properties>
    <!-- 定义Appender，即目的地 -->
    <Appenders>
        <!-- 定义输出到屏幕 -->
        <Console name="console" target="SYSTEM_OUT">
            <!-- 日志格式引用上面定义的log.pattern -->
            <PatternLayout pattern="${log.pattern}" />
        </Console>
        <!-- 定义输出到文件,文件名引用上面定义的file.err.filename -->
        <RollingFile name="err" bufferedIO="true" fileName="${file.err.filename}" filePattern="${file.err.pattern}">
            <PatternLayout pattern="${log.pattern}" />
            <Policies>
                <!-- 根据文件大小自动切割日志 -->
                <SizeBasedTriggeringPolicy size="1 MB" />
            </Policies>
            <!-- 保留最近10份 -->
            <DefaultRolloverStrategy max="10" />
        </RollingFile>
    </Appenders>
    <Loggers>
        <Root level="info">
            <!-- 对info级别的日志，输出到console -->
            <AppenderRef ref="console" level="info" />
            <!-- 对error级别的日志，输出到err，即上面定义的RollingFile -->
            <AppenderRef ref="err" level="error" />
        </Root>
    </Loggers>
</Configuration>
{% endcode %}
<p>SLF4J加Logback，需要增加logback.xml</p>

{% code %}
package _22javacoreclass;

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
{% endcode %}

<p>logback.xml</p>

{% code %}
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <file>log/output.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>log/output.log.%i</fileNamePattern>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>1MB</MaxFileSize>
        </triggeringPolicy>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="FILE" />
    </root>
</configuration>
{% endcode %}
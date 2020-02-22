---
title: MVC 1.0 Final Release
author: chkal
template: news.html
---

We are very proud to announce that MVC 1.0 Final has been released. You can
get the final version of the specification document and the final API docs 
on the [specification page](/spec/). 
All Maven artifacts are available in the Maven Central repository. 
This includes the API JAR the and final version of Eclipse Krazo.

If you want to learn more about MVC 1.0, have a look at the 
[Installation Guides](/krazo/) which will teach you how to get started 
with your first MVC 1.0 application.

If you are currently using an earlier version of the spec, 
just update your dependencies:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>1.0.0</version>
</dependency>
<dependency>
    <groupId>org.eclipse.krazo</groupId>
    <artifactId>krazo-[jersey|resteasy|cxf]</artifactId>
    <version>1.0.0</version>
</dependency>
```

## What's next?

We are working on transferring the MVC specification to the Eclipse Foundation.
This process will most likely take a few weeks. After that, we will start to
migrate the specification to the `jakarta.mvc` namespace.
Unfortunately the release plan for Jakarta EE 9 doesn't allow new specifications.
Therefore, our goal is that the MVC specification will become part of Jakarta EE 10.
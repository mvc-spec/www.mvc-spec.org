---
title: Install Guide for Java EE
template: page.html
---

## Install Guide for Java EE

MVC is built on top of JAX-RS. This means that Ozark can be run on most application servers without
any additional configuration. You will just need to include the MVC API JAR as well as the Ozark module
for the JAX-RS implementation shipped with your application server.

Ozark requires at least the Java EE 8 Web-Profile or the Eclipse MicroProfile.

Note: The MVC specification and Ozark are under active development. Therefore, you will have to add 
the Sonatype OSS snapshot repository to your POM to get the latest and greatest version. 
Please refer to [Setting up the snapshot repository](install-snapshots.html) for details.

### Required dependencies

The dependencies you need to add to your `pom.xml` file depend on which application server
your are using.

#### Glassfish/Payara

Glassfish comes with Jersey as its JAX-RS implementation. Please add the following dependencies 
to your application:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>{{versions.spec.develop}}</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-jersey</artifactId>
    <version>{{versions.ozark.develop}}</version>
</dependency>
```

### Wildfly and JBoss EAP

Wildfly is using RESTEasy for JAX-RS. So you need to Ozark RESTEasy integration module:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>{{versions.spec.develop}}</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-resteasy</artifactId>
    <version>{{versions.ozark.develop}}</version>
</dependency>
```

### Wildfly Swarm

We currently don't have a dedicated fraction for wildfly Swarm, but you can use the
JAX-RS fraction and add the same dependencies as required for Wildfly:

```xml
<dependency>
    <groupId>org.wildfly.swarm</groupId>
    <artifactId>jaxrs</artifactId>
</dependency>
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>{{versions.spec.develop}}</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-resteasy</artifactId>
    <version>{{versions.ozark.develop}}</version>
</dependency>
```

### Apache TomEE

Apache TomEE uses CXF as the JAX-RS implementation. Unfortunately there are some known bugs in CXF
which are causing trouble for Ozark. The latest CXF release should fix these issues, but Apache TomEE
currently ships with an older CXF release.

If you want to give Ozark on Apache TomEE a try, add the following dependencies to your `pom.xml`:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>{{versions.spec.develop}}</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-core</artifactId>
    <version>{{versions.ozark.develop}}</version>
</dependency>
```

If using CXF with Ozark is causing trouble, you can also manually add RESTEasy to your application
and use this instead of CXF. To do so, use the following depndencies instead.

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>{{versions.spec.develop}}</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-resteasy</artifactId>
    <version>{{versions.ozark.develop}}</version>
</dependency>
<dependency>
    <groupId>org.jboss.resteasy</groupId>
    <artifactId>resteasy-cdi</artifactId>
    <version>3.1.4.Final</version>
</dependency>
<dependency>
    <groupId>org.jboss.resteasy</groupId>
    <artifactId>resteasy-servlet-initializer</artifactId>
    <version>3.1.4.Final</version>
</dependency>
```

That's all. Now you can start developing your first MVC 1.0 application.
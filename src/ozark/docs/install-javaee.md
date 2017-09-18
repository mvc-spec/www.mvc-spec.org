---
title: Install Guide for Java EE
template: page.html
---

## Install Guide for Java EE

MVC is an extension to JAX-RS, Ozark can be run on most application servers without
any configuration. You will need to include the MVC-Spec as well as the Ozark module
for the JAX-RS implementation shipped with your application server.

Ozark requires at least the Java-EE 7 Web-Profile or the Eclipse MicroProfile.

### Glassfish/Payara

Glassfishes comes with Jersey as its JAX-RS implementation. Please add the following
dependencies to your application:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-jersey</artifactId>
    <version>1.0.0-m03-SNAPSHOT</version>
</dependency>
```

### Wildfly and JBoss EAP

Wildfly uses RestEasy for JAX-RS. You need to include the following dependencies:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-resteasy</artifactId>
    <version>1.0.0-m03-SNAPSHOT</version>
</dependency>
```

### Wildfly Swarm

We currently don't have a dedicated fraction for wildfly swarm, but you can use the
JAX-RS fraction with the dependencies from wildfly section above:

```xml
<!-- WildFly Swarm Fractions -->
<dependency>
    <groupId>org.wildfly.swarm</groupId>
    <artifactId>jaxrs</artifactId>
</dependency>
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
<dependency>
    <groupId>org.mvc-spec.ozark</groupId>
    <artifactId>ozark-resteasy</artifactId>
    <version>1.0.0-m03-SNAPSHOT</version>
</dependency>
```

### Apache TomEE

TomEE uses CXF as JAX-RS implementation. Right now there is no Ozark module for that.


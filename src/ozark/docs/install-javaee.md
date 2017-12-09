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

To get around this, we'll demonstrate how to use it with the RestEasy module.

The following pom.xml example that shows the dependency configuration:

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
<dependency>
    <groupId>javax</groupId>
	<artifactId>javaee-web-api</artifactId>
	<version>7.0</version>
    <scope>provided</scope>
</dependency>
<dependency>
	<groupId>org.jboss.resteasy</groupId>
	<artifactId>resteasy-cdi</artifactId>
	<version>3.1.4.Final</version>
</dependency>
<dependency>
	<groupId>org.jboss.resteasy</groupId>
	<artifactId>resteasy-servlet-initializer</artifactId>
	<version> 3.1.4.Final</version>
</dependency>
<dependency>
	<groupId>org.hibernate</groupId>
	<artifactId>hibernate-validator</artifactId>
	<version>5.4.1.Final</version>
</dependency>
```
### 3. Add the bean.xml,context.xml and web.xml file
make sure to add an empty beans.xml file in your /resources/META-INF/ folder to your Web project:

```xml
<?xml version="1.0"?>
<beans xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	   xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
       http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
	   version="1.1" bean-discovery-mode="all">
</beans>
```
to finish create within /webapp/WEB-INF/ the web.xml file with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
    http://java.sun.com/xml/ns/javaee/web-app_3_1.xsd"
	version="3.1">

	<context-param>
    <!--http://docs.jboss.org/resteasy/docs/3.1.4.Final/userguide/html_single/index.html#d4e143 -->
		<param-name>resteasy.injector.factory</param-name>
		<param-value>org.jboss.resteasy.cdi.CdiInjectorFactory</param-value>
	</context-param>
</web-app>
```


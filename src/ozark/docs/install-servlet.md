---
title: Install Guide for Servlet Containers
template: page.html
---

## Install Guide for Servlet Containers

The Ozark MVC implementation is based on Jersey and recently a RestEasy module has been added to work with Widlfly.

In this guide we will run Ozark on Apache Tomcat using the RestEasy module

The following pom.xml example that shows the dependency configuration:

### Apache Tomcat

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
</dependency>
<dependency>
	<groupId>org.jboss.weld.servlet</groupId>
	<artifactId>weld-servlet-core</artifactId>
	<version>2.4.3.Final</version>
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
make sure to add an empty beans.xml file in your /resources/META-INF folder to your Web project:

```xml
<?xml version="1.0"?>
<beans xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	   xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
       http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
	   version="1.1" bean-discovery-mode="all">
</beans>
```
still in the same folder add the context.xml with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context>
   <Manager pathname=""/> 
   <Resource name="BeanManager"
      auth="Container"
      type="javax.enterprise.inject.spi.BeanManager"
      factory="org.jboss.weld.resources.ManagerObjectFactory"/>
</Context>
```
this file is essential for the operation of the CDI in TomCat as described here:[Weld-Doc](http://docs.jboss.org/weld/reference/latest/en-US/html_single/#_tomcat) 

to finish create within /webapp/WEB-INF/ the web.xml file with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
    http://java.sun.com/xml/ns/javaee/web-app_3_1.xsd"
	version="3.1">

	<listener>
		<listener-class>org.jboss.weld.environment.servlet.Listener</listener-class>
	</listener>

	<resource-env-ref>
		<resource-env-ref-name>BeanManager</resource-env-ref-name>
		<resource-env-ref-type>javax.enterprise.inject.spi.BeanManager</resource-env-ref-type>
	</resource-env-ref>

	<context-param>
    <!--http://docs.jboss.org/resteasy/docs/3.1.4.Final/userguide/html_single/index.html#d4e143 -->
		<param-name>resteasy.injector.factory</param-name>
		<param-value>org.jboss.resteasy.cdi.CdiInjectorFactory</param-value>
	</context-param>
</web-app>
```

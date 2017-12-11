---
title: Install Guide for Servlet Containers
template: page.html
---

## Install Guide for Servlet Containers

The simplest way to get started with MVC is to deploy your app to a JavaEE 7 application server. 
In this setup the application server will provider JAX-RS, CDI and Beań Validation implemnetations 
for you. Please refer to [Install Guide for Java EE](install-javaee.html) for details about this setup.

However, there is a large number of users who prefer to run their applications on plain Servlet 
containers like Apache Tomcat and Jetty. In this setup you will have to provider JAX-RS, 
CDI and Bean Validations yourself.

In this guide we will show you how to run Ozark on Apache Tomcat using Weld, RESTEasy and 
Hibernate Validator.

Note: The MVC specification and Ozark are under active development. Therefore, you will have to add 
the Sonatype OSS snapshot repository to your POM to get the latest and greatest version. 
Please refer to [Setting up the snapshot repository](install-snapshots.html) for details.

### Required dependencies

The following `pom.xml` example shows the dependency configuration for your application:

```xml
<!-- Get the API JARs for Java EE 7 -->
<dependency>
    <groupId>javax</groupId>
    <artifactId>javaee-web-api</artifactId>
    <version>7.0</version>
</dependency>

<!-- Weld  -->
<dependency>
    <groupId>org.jboss.weld.servlet</groupId>
    <artifactId>weld-servlet-core</artifactId>
    <version>2.4.3.Final</version>
</dependency>

<!-- RESTEasy -->
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

<!-- Bean Validation -->
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>5.4.1.Final</version>
</dependency>

<!-- MVC + Ozark for RESTEasy-->
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

### Configuration files

Make sure to add an empty `beans.xml` file in your `/src/main/webapp/WEB-INF` folder:

```xml
<?xml version="1.0"?>
<beans xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
       version="1.1" bean-discovery-mode="all">

</beans>
```

Please also add a file called `context.xml` to `src/main/resources/META-INF`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context>

   <Resource name="BeanManager" auth="Container"
             type="javax.enterprise.inject.spi.BeanManager"
             factory="org.jboss.weld.resources.ManagerObjectFactory"/>

</Context>
```

This file `context.xml` is essential for the operation of the CDI in Tomcat as described in
the [Weld documentation](http://docs.jboss.org/weld/reference/latest/en-US/html_single/#tomcat). 

The file to create is called `web.xml` and should be placed in the `src/main/webapp/WEB-INF`
directory:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

  <listener>
    <listener-class>org.jboss.weld.environment.servlet.Listener</listener-class>
  </listener>

  <resource-env-ref>
    <resource-env-ref-name>BeanManager</resource-env-ref-name>
    <resource-env-ref-type>javax.enterprise.inject.spi.BeanManager</resource-env-ref-type>
  </resource-env-ref>

  <!--http://docs.jboss.org/resteasy/docs/3.1.4.Final/userguide/html_single/index.html#d4e143 -->
  <context-param>
    <param-name>resteasy.injector.factory</param-name>
    <param-value>org.jboss.resteasy.cdi.CdiInjectorFactory</param-value>
  </context-param>

</web-app>
```

That's all. Now you can start developing your first MVC 1.0 application.
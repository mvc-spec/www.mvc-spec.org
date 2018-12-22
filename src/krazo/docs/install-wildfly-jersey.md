---
title: Install Guide for Wildfly
template: page.html
---

## Install Guide for Wildfly

Note: This guide is not relevant any more. Today Eclipse Krazo supports Wildfly using the RESTEasy integration module.
However, we decided to keep this guide alive.

The MVC implementation Eclipse Krazo is based on Jersey. This makes is a little bit tricky to get MVC running on Wildfly, because Wildfly provides with RESTEasy, a competing JAX-RS implementation.

To get Eclipse Krazo running together with Wildfly first you need to add the Eclipse Krazo implementation together with the Jersey dependencies to your project. The the following `pom.xml` example showing the dependency configuration:

```xml
<!-- Java EE dependencies -->
<dependency>
    <groupId>javax</groupId>
    <artifactId>javaee-api</artifactId>
    <version>7.0</version>
    <scope>provided</scope>
</dependency>

<!-- MVC dependencies -->
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>{{versions.spec.latest}}</version>
</dependency>
<dependency>
    <groupId>org.eclipse.krazo</groupId>
    <artifactId>krazo-jersey</artifactId>
    <version>{{versions.krazo.latest}}</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jersey.containers</groupId>
    <artifactId>jersey-container-servlet</artifactId>
    <version>2.23.1</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jersey.ext.cdi</groupId>
    <artifactId>jersey-cdi1x</artifactId>
    <version>2.23.1</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jersey.ext</groupId>
    <artifactId>jersey-bean-validation</artifactId>
    <version>2.23.1</version>
    <exclusions>
        <exclusion>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-validator</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

The important part here is to deactivate Jersey hibernate-validation. This can be don with the ‘exclusion’ tag of maven.

In the next step you need to provide two Wildfly deployment descriptors to ensure that the RESTEasy subsystem is deactivated.

### 1. Deactivate Wildfly JAX-RS RestEasy Subsystem

To deactivate RESTEasy add the file `*jboss-deployment-structure.xml*` into the WEB-INF folder with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jboss-deployment-structure xmlns="urn:jboss:deployment-structure:1.2">
    <deployment>
        <exclude-subsystems>
            <subsystem name="jaxrs" />
        </exclude-subsystems>
    </deployment>
</jboss-deployment-structure>
```

### 2. Prevent implizit bean archives without beans.xml

To deactivate bean archives with a beans.xml add the file `*jboss-all.xml*` into the WEB-INF folder with 
the following content:

```xml
<jboss xmlns="urn:jboss:1.0">
     <weld xmlns="urn:jboss:weld:1.0" require-bean-descriptor="true"/>
</jboss>
```

See also: https://docs.jboss.org/author/display/WFLY8/CDI+Reference

### 3. Add the bean.xml file

Finally make sure that your web project contain an empty `beans.xml` file in the WEB-INF folder:

```xml
<?xml version="1.0"?>
<beans xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
       version="1.1" bean-discovery-mode="all">
       
</beans>
```
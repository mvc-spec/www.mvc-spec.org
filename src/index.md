---
title: Home
template: home.html
---

# Overview

Model-View-Controller, or MVC for short, is a common pattern in Web frameworks where it is used 
predominantly to build HTML applications. The model refers to the application’s data, the view to 
the application’s data presentation and the controller to the part of the system responsible for 
managing input, updating models and producing output.

Web UI frameworks can be categorized as action-based or component-based. In an action-based 
framework, HTTP requests are routed to controllers where they are turned into actions by 
application code; in a component-based framework, HTTP requests are grouped and typically 
handled by framework components with little or no interaction from application code. 
In other words, in a component-based framework, the majority of the controller logic is provided 
by the framework instead of the application.

The API defined by this specification falls into the action-based category and is, therefore, 
not intended to be a replacement for component-based frameworks such as Jakarta Faces, 
but simply a different approach to building Web applications on the Jakarta EE platform.

The Jakarta MVC API is layered on top of [Jakarta RESTful Web Services](https://jakarta.ee/specifications/restful-ws/) and integrates 
with existing Jakarta EE technologies like [Jakarta Contexts and Dependency Injection](https://jakarta.ee/specifications/cdi/) and 
[Jakarta Bean Validation](https://jakarta.ee/specifications/bean-validation/).

# Hello World Example

```java
@Path("hello")
public class HelloController {

    @Inject
    private User user;

    @GET
    @Controller
    public String hello(@QueryParam("name") String name) {
        user.setName(name);
        return "hello.jsp";
    }
}
```

# Releases

The latest version is available via Maven:

```xml
<dependency>
  <groupId>jakarta.mvc</groupId>
  <artifactId>jakarta.mvc-api</artifactId>
  <version>2.0.0</version>
</dependency>
```


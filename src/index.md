---
title: Home
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
not intended to be a replacement for component-based frameworks such as JavaServer Faces (JSF), 
but simply a different approach to building Web applications on the Java EE platform.

The MVC API is layered on top of [JAX-RS](https://jax-rs-spec.java.net/) and integrates 
with existing EE technologies like [CDI](https://www.jcp.org/en/jsr/detail?id=365) and 
[Bean Validation](https://jcp.org/en/jsr/detail?id=349).

# HelloWorld Example

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

# Releases

Early Draft Release 2. Available via Maven:

    <dependency>
        <groupId>javax.mvc</groupId>
        <artifactId>javax.mvc-api</artifactId>
        <version>1.0-edr2</version>
    </dependency>


---
title: Eclipse Krazo 1.0.0-Beta1 released
author: chkal
template: news.html
---

We are very proud to announce that we have just release Eclipse Krazo 1.0.0-Beta1. This is a very 
important milestone for several reasons. It is the first release under the Eclipse EE4J umbrella and
it is the first version which passes the MVC 1.0 TCK. Special thanks to everyone for your help with 
getting to this point.

You can get the latest version from Maven Central:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>1.0-pfd</version>
</dependency>
<dependency>
    <groupId>org.eclipse.krazo</groupId>
    <artifactId>krazo-[jersey|resteasy|cxf]</artifactId>
    <version>1.0.0-Beta1</version>
</dependency>
```

## What's new?

The Eclipse Krazo team fixed more than [60 issues](https://github.com/eclipse-ee4j/krazo/milestone/2?closed=1) 
in the last months.

  * Full implementation of the MVC 1.0 "Proposed Final Draft" version of the specification
  * Eclipse Krazo now passes the MVC TCK on Wildfly 18 and on Eclipse Glassfish 5.1 (with the latest Jersey version)
  * Improved compatibility with the different JAX-RS implementations and containers
  * We started to migrate the existing sample applications to an Arqillian based testsuite.
  * New Krazo-specific features like specifying the HTTP method via HTML form parameters
  * Various improvements for the data-binding and validation handling
  * Updated various 3rd party view engines
  * And much more...

You can find a full list of changes in the GitHub issue tracker for the 
[1.0.0-Beta1](https://github.com/eclipse-ee4j/krazo/milestone/2?closed=1) release.

## What's next?

We currently expect that 1.0.0-Beta1 will be that last version before we release 1.0.0. Our next step is to
finalize the paperwork to release the final version of the MVC 1.0 specification via the JCP. We hope that this
will be possible in the next 2-3 weeks.

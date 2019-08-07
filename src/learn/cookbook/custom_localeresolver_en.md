---
title: "Cookbook: Custom LocaleResolver"
template: page.html
---

## Implement custom LocaleResolver with the MVC API
To read the `Locale` of each request the MVC API provides the interface `LocaleResolver`. The specification also requires for each implementation of the API a default implementation of the `LocaleResolver`, which reads the `Locale` to be used from the HTTP header `Accept-Language`.

The following example shows how you can use your own implementation of the `LocaleResolver` to extend the`Locale` resolution. Specifically, the `Locale` is to be read from a query parameter of the URL and can be obtained from the standard `LocalResolver` if missing.

### Preconditions
- Application server
- Java EE 8
- MVC API 1.0
- Eclipse Krazo (for the used application server)
- Maven

### Project layout
A simple web application is used for the example. The project layout for this is as follows:

![Project layout](../../img/cookbook/custom-localeresolver/project_structure.png)

In addition, these are the required Maven dependencies:

```xml
<repositories>
    <repository>
        <id>sonatype-oss-snapshots</id>
        <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        <releases>
            <enabled>false</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>

<dependencies>

    <dependency>
      <groupId>javax.mvc</groupId>
      <artifactId>javax.mvc-api</artifactId>
      <version>{{versions.spec.latest}}</version>
    </dependency>

    <!-- Change if your application server doesn't use Jersey -->
    <dependency>
      <groupId>org.eclipse.krazo</groupId>
      <artifactId>krazo-jersey</artifactId>
      <version>{{versions.krazo.latest}}</version>
    </dependency>

    <dependency>
      <groupId>javax</groupId>
      <artifactId>javaee-api</artifactId>
      <version>8.0</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
```

**Attention**: The project was implemented on Payara 5 and therefore uses the jersey implementation
from Eclipse Krazo. For Wildfly or OpenLiberty / TomEE please use the appropriate artifacts.

### Implementing the LocaleResolver
#### MvcConfigurtion and LangController
The application uses an "empty" JAX-RS application and a controller whose only method returns the `index.jsp` template. This works similar to the *Hello World* example and is therefore not explained in detail.

The template `index.jsp` shows the user the `Locale` set in the request:

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>I18n Index</title>
</head>
<body>
<div id="locale">
    Request locale: <span>${mvc.locale}</span>
</div>
</body>
</html>

```

#### The QueryParamResolver
The `QueryParamLocaleResolver` is developed for reading the `Locale` from a query parameter. This implements the
`LocalResolver` interface of the MVC API and is prioritized directly after the standard implementation. For the evaluation of the `LocaleResolvers` the
implementations are then evaluated in reverse order so that the self-developed `LocaleResolvers` always have priority. 

```java
/**
 * Resolver to get the {@link Locale} to use from the requests query param <i>lang</i>.
 *
 * In case there is no request param with this name, the {@link Locale} will be resolved
 * by a higher prioritised implementation.
 *
 * Example usage:
 * <pre>
 * {@code
 * # Use default locale
 * curl -X GET <your-url>
 *
 * # Set german locale by query param
 * curl -X GET <your-url>?lang=de-DE
 * }
 * </pre>
 * @author Tobias Erdle
 */
@Priority(1)
@ApplicationScoped
public class QueryParamLocaleResolver implements LocaleResolver {

  @Override
  public Locale resolveLocale(final LocaleResolverContext context) {
    final var queryLang = context.getUriInfo()
        .getQueryParameters()
        .getFirst("lang");
    return queryLang != null ? Locale.forLanguageTag(queryLang) : null;
  }
}
```
#### Usage of the QueryParamLocaleResolver
If you now call a URL with the `lang` query parameter and a corresponding locale, this will be placed in the `MvcContext` accordingly.

*curl -X GET <your-url>*
```html
<html>
<head>
    <title>I18n Index</title>
</head>
<body>
<div id="locale">
    <!-- en_US as default locale in authors case -->
    Request locale: en_US
</div>
</body>
</html>

```

*curl -X GET <your-url>?lang=de-DE*
```html
<html>
<head>
    <title>I18n Index</title>
</head>
<body>
<div id="locale">
    Request locale: de_DE
</div>
</body>
</html>

```

*curl -X GET <your-url>?lang=fr*
```html
<html>
<head>
    <title>I18n Index</title>
</head>
<body>
<div id="locale">
    Request locale: fr
</div>
</body>
</html>

```

### Further sources
- [MVC Specification](https://oss.sonatype.org/service/local/repositories/snapshots/content/javax/mvc/javax.mvc-api/1.0-SNAPSHOT/javax.mvc-api-1.0-20190530.105420-89-spec.pdf)
- [Example project](https://github.com/erdlet/mvc-international-example/tree/master/custom-locale-resolver)
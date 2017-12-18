---
title: MVC 1.0 Public Review Draft
author: chkal
template: news.html
---

We are very happy to announce that we submitted the required artifacts for the *Public Review* phase 
to the JCP. This is a huge step for the specification and the first release done by the new 
specification leads. Thanks everyone for your help with getting to this point.

You can get the API from Maven Central:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>1.0-pr</version>
</dependency>
```

The specification document can be downloaded from the [Specification](/spec/) section.

## What's new?

There are many new features in MVC 1.0 since the Early Draft Review 2 version, which was
released quite some time ago. The following sections summarize the most important aspects of 
the new release.

### New license

As you may already know, the specification and reference implementation are now licensed under the
[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). We think that updating the license
was a very important step for making MVC 1.0 a true community specification. The Apache license
will allow you to use the specification and contributing to it without any legal issues.

### Internationalization

MVC 1.0 now supports an API for dealing with I18N aspects. The specification defines the *request locale*
as the locale to use for all locale-dependent operations. MVC will automatically use this locale for 
data type conversion (see below), for validation and binding error messages and more. The request 
locale can also be accessed by calling `mvcContext.getLocale()` on the injected `MvcContext`.

But there is more. MVC 1.0 provides an SPI for resolving the request locale. By default, the request locale
is determined from the HTTP request headers. But if you need more control for the resolving, you
can simply implement the `LocaleResolver` SPI to resolve the locale yourself. This allows you to store
the active locale in the session, automatically infer it from the URL, etc.

### Improved data binding

The MVC 1.0 specification relies on JAX-RS for data binding. Unfortunately the JAX-RS data binding
isn't flexible enough for typical web application requirements. The main problems are that data binding
in JAX-RS isn't locale-aware and that binding and validation errors are fatal and typically result in
a 400 status code being sent to the client.

With MVC 1.0 you will be able to use the `@MvcBinding` annotation to enable MVC specific rules for
data binding. The first difference to traditional JAX-RS data binding is that MVC bindings are 
locale-aware. This means that entering decimal values into web application forms and binding
them to corresponding numerical types in the controller will work out of the box. MVC will 
automatically detect the correct number format depending on your request locale.

Another important feature of MVC data binding is that binding and validation errors don't result in
exceptions being thrown anymore. Instead, such errors are available from the `BindingResult` class
which can be injected into the controller. This allows the controller to check for errors and
handle them in a very specific way. This usually means that the controller will
store error details in the model and render the corresponding view again to show the errors
to the user.

### Much more

There are many more minor changes in this version of the spec, including:

  * New API for generating URLs from the view and from controllers.
  * `CsrfOptions.EXPLICT` is now the default for the CSRF protection.
  * The rules for allowed controller return types have been simplified.
  * Some clarifications regarding sub-resource handling.
  * And much more...

## What's next?

As the name already suggests, the *Public Review Phase* is meant for the community to review the
specification. Therefore, we encourage everyone who is interested in action-based web frameworks
and Java EE / EE4J to have a look at the specification. Any kind of feedback is welcome. Our goal
is to create an API that developers love to use. So if you see any problems with it, let us know. 

Feel free to join our [mailing list](https://groups.google.com/forum/#!forum/jsr371-users) and 
let us know what you think. You can either post your thoughts on the list or file an issue on the 
[issue tracker](https://github.com/mvc-spec/mvc-spec/issues).

And don't forget: MVC 1.0 needs YOUR feedback!

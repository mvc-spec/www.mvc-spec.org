---
title: MVC 1.0 Proposed Final Draft
author: chkal
template: news.html
---

We are very proud to announce that we have submitted the required artifacts for the *Proposed Final Draft* 
to the JCP. This is another very important milestone for finalizing the specification. Special thanks
to everyone for your help with getting to this point.

You can get the API from Maven Central:

```xml
<dependency>
    <groupId>javax.mvc</groupId>
    <artifactId>javax.mvc-api</artifactId>
    <version>1.0-pfd</version>
</dependency>
```

You can download the the 
[specification document](https://repo1.maven.org/maven2/javax/mvc/javax.mvc-api/1.0-pfd/javax.mvc-api-1.0-pfd-spec.pdf)
and the 
[Javadocs](https://javadoc.io/doc/javax.mvc/javax.mvc-api/1.0-pfd) on the [Specification](/spec/) page.

## What's new?

There are actually no big new features in this release. That's mostly because the *Public Review* release 
already contained all the features we had in mind for the specification. Instead, the main goal of the 
last months was to stabilize, simplify and clarify the specification:

  * We discussed many class/interface/method names to check if their current name is precise enough.
    In some cases we decided to change the name if we found a better one.
    The annotation `@CsrfValid` has for example been renamed to `@CsrfProtected`.
  * We changed the overall package structure as we noticed that the old one was inconsistent.
    We removed the `javax.mvc.annotation` package and moved all annotations to the corresponding
    packages like `javax.mvc.security` and `javax.mvc.binding`.
  * We added a new base interface `ParamError` for `BindingError` and `ValidationError` which allowed us
    to dramatically simplify the `BindingResult` interface.  
  * We even removed some interfaces to further simplify the API.
    So we removed the `MvcUriBuilder` interface and now use the JAX-RS `UriBuilder` instead.
  * We improved the overall structure of the specification document.
    This also includes a new way to manage spec assertions which now allows us to check the TCK status
    using the new [TCK coverage report](/spec/tck-coverage/index.html).
  * We also improved the API docs for specification in many places as we think that good documentation is 
    a crucial aspect for a good API.
  * And much more...

You can find a full list of changes in the GitHub issue tracker for the 
[1.0-pfd](https://github.com/mvc-spec/mvc-spec/issues?q=milestone%3A1.0-pfd) release.
The one downside of the cleanup and refactoring is that your sample apps will most likely not work out
of the box if you update your dependencies. But we strongly believe that now is the best time to do such 
refactorings and it is much better to do these now than to keep bad names or an inconsistent structure 
forever.

## What's next?

We have reached a point where we are pretty happy with the specification and don't expect any more changes.
However, this doesn't mean that the spec is perfect. Perhaps we missed something? Maybe some aspect of the
API needs improvement? If so, feel free to tell us. Now is the perfect time to review the specification
and provide feedback. 
Feel free to join our [mailing list](https://groups.google.com/forum/#!forum/jsr371-users) and 
let us know what you think. You can either post your thoughts on the list or file an issue on the 
[issue tracker](https://github.com/mvc-spec/mvc-spec/issues).

The next big task for us is to finish the [TCK](https://github.com/mvc-spec/mvc-tck). 
We currently have a [TCK coverage](/spec/tck-coverage/index.html) of about 41%. So there is still much 
work to do. We are also in the process of transferring the reference implementation to the Eclipse Foundation 
as part of the Eclipse EE4J project. You can follow the process on the 
[proposal page](https://projects.eclipse.org/proposals/eclipse-krazo) for Eclipse Krazo. 

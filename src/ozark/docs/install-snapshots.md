---
title: Setting up the snapshot repository
template: page.html
---

## Setting up the snapshot repository

The MVC specification and Ozark are under active development. Therefore, you will have to add the
Sonatype OSS snapshot repository to your POM to get the latest and greatest version.

To do so, just add the following configuration to your `pom.xml` file:

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
```

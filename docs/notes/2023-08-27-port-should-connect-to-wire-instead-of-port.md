---
title: Port should connect to wire instead of port
author: Xie Yuheng
date: 2023-08-27
---

In a multithread implementation,
port must connect to wire instead of port,
so that parallel updates of the net will not
interfere with each other.

Since JavaScript is singlethread
this does not matter,
but as a reference implementation
port still should connect to wire instead of port.

+++
date = "2017-03-01T17:19:18+09:00"
draft = true
title = "carmesdk logging"
categories = "coding conventions"
+++

cmtsdkは scripting levelのmoduleではなく、enterprise applicationのlibraryです。
enterprise用アプリの開発に慣れていない方には、無駄にloggingが多いと見られるかもしれませんが、
loggingに関するcoding conventionsを以下のように定義します。。



※ 普通はinfo level以上のlogを記録するようにします。

## debug
* when there are input parameters, you can record them.
* when there are return values, you can also record them.
* and when you want to check a value in runtime, you can use debug() function any time freely.

## info
* before executing sql (at repository), record sql
* before and after calling external api (at provider), record the contents of request and response.

## warning
* parameter assertion
* when it is considered to be done by developers

## error
* when it should throws an exception by logic (businesslogic)

## fatal
* when the system is malfunctionaling or it should stop
* when an io exception occurs
* cases such as when db connection fails or config file not found
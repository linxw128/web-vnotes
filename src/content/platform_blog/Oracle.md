---
Title: Oracle
Description: Oracle
Category: "WEB"
PubDate: 2026-1-28
Draft: false
Tags: ["oracle"]
---

## toc

## contents
###  表空间扩容（OA）
查看表空间情况
```SQL
SELECT a.tablespace_name "表空间",
       total / (1024 * 1024) "总大小(MB)",
       free / (1024 * 1024) "剩余大小(MB)",
       (total - free) / (1024 * 1024) "已使用(MB)",
       round((total - free) / total, 4) * 100 "使用率%"
FROM (SELECT tablespace_name, sum(bytes) total
      FROM dba_data_files
      GROUP BY tablespace_name) a,
     (SELECT tablespace_name, sum(bytes) free
      FROM dba_free_space
      GROUP BY tablespace_name) b
WHERE a.tablespace_name = b.tablespace_name
AND a.tablespace_name = 'TS_OA_D';
```

查看数据文件情况
```SQL
SELECT 
    tablespace_name,
    ROUND(bytes / 1024 / 1024, 2) AS size_mb,
    ROUND(maxbytes / 1024 / 1024, 2) AS max_size_mb,
    ROUND((bytes - df.used_space) / 1024 / 1024, 2) AS free_space_mb,
    ROUND(used_space / 1024 / 1024, 2) AS used_space_mb
FROM 
    dba_data_files df;
```

添加表空间文件
```SQL
ALTER TABLESPACE TS_OA_D 
ADD DATAFILE '+DATADG/zhfwdb/datafile/ts_oa_d07.dbf' SIZE 30G;
```

或者扩容（数据文件小于32G的情况）
```SQL
ALTER DATABASE DATAFILE '+DATADG/zhfwdb/datafile/ts_oa_d06.dbf' RESIZE 30G;
```




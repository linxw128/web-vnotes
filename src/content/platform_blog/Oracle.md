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


### 查看数据
#### 人事处

DQZTM（当前状态码）为空 266
``` sql
select * from zfsoft_hrm. Overall where SFZH is null
```

PYLB（聘用类别） = 06 ，状态码依然为在职 44
``` sql
select * from zfsoft_hrm. Overall where PYLB = '06' and DQZTM = '11'
```

SFZH（证件号码为空） 150
``` sql
select * from zfsoft_hrm. Overall where SFZH is null
```

ZGXWM（最高学位码）学位码 669 个为空
``` sql
select * from zfsoft_hrm. Overall where ZGXWM is null and DQZTM = '11'
```

### 备份脚本
```shell 
#!/bin/bash 
retentionday=7
backdir=/backup/rman
backtime=`date +"%Y%m%d"`
deldir=`date -d "${retentionday} days ago" +%Y%m%d`
source /home/oracle/.bash_profile
if [ ! -d ${backdir}/${backtime} ];then
   mkdir -p ${backdir}/${backtime}
else
   rm -rf ${backdir}/${backtime}/*
fi
rman target / log=${backdir}/${backtime}/full_$backtime.log << EOF 
run{
allocate channel c1 device type disk;
allocate channel c2 device type disk;
allocate channel c3 device type disk;
allocate channel c4 device type disk;
sql 'alter system archive log current'; 
backup as compressed backupset full database format '${backdir}/${backtime}/DB_%d_%T_%U'; 
backup archivelog all format '${backdir}/${backtime}/ARCH_%d_%T_%s_%p' delete input;
backup current controlfile format '${backdir}/${backtime}/CTL_%d_%T_%s_%p';
release channel c1;
release channel c2;
release channel c3;
release channel c4;
crosscheck backup;
delete noprompt expired backup;
}
EOF
if [ -d ${backdir}/${deldir} ];then
   rm -rf ${backdir}/${deldir}
fi

```


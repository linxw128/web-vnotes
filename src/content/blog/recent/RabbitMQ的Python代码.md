---
title: RabbitMQ的Python代码
description: RabbitMQ的Python代码
category: WEB
pubDate: 2026-01-25
draft: false
tags:
  - RabbitMQ
---
[Python操作RabbitMQ-CSDN博客](https://hupengcheng.blog.csdn.net/article/details/125847053)

### 基本用法

```
# 生产者
import pika
 
connection=pika.BlockingConnection(pika.ConnectionParameters(host='192.168.10.131'))  
#创建一个链接对象，对象中绑定rabbitmq的IP地址
 
 
channel=connection.channel()        #创建一个频道
 
channel.queue_declare(queue='name1')  #通过这个频道来创建队列，如果MQ中队列存在忽略，没有则创建
 
channel.basic_publish(exchange='',
                      routing_key='name1',   #指定队列名称
                      body='Hello World!')   #往该队列中发送一个消息
print(" [x] Sent 'Hello World!'")
connection.close()         
————————————————
版权声明：本文为CSDN博主「「已注销」」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/lyshark_lyshark/article/details/125847053
```

```
# 消费者
 
import pika
 
connection = pika.BlockingConnection(pika.ConnectionParameters(host='192.168.10.131'))
#创建一个链接对象，对象中绑定rabbitmq的IP地址
 
channel = connection.channel()         #创建一个频道
 
channel.queue_declare(queue='name1')   #通过这个频道来创建队列，如果MQ中队列存在忽略，没有则创建
 
def callback(ch, method, properties, body):   #callback函数负责接收队列里的消息
    print(" [x] Received %r" % body)
 
channel.basic_consume(callback,              #从队列里去消息
                      queue='name1',         #指定队列名
                      no_ack=True)
 
print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
```

![[rabbitmqimage1.png]]
---
title: Llama2大模型下载和使用
description: Llama2大模型下载和使用
category: "AI"
pubDate: 2024-02-25
draft: false
tags: ["ai","LLama"]
cover_image: ""
canonical_url: false
---

Llama2大模型下载和使用


#### 社区及embeding下载

[GitHub - LlamaFamily/Llama-Chinese: Llama中文社区，最好的中文Llama大模型，完全开源可商用](https://github.com/LlamaFamily/Llama-Chinese)

打开网址：[魔搭社区](https://modelscope.cn/models/FlagAlpha/Atom-7B-Chat/files)

选择“模型文件”

支持两种下载方式

SDK下载：

```python
#模型下载
from modelscope import snapshot_download
model_dir = snapshot_download('FlagAlpha/Atom-7B-Chat')
```

Git下载

```shell
git clone https://www.modelscope.cn/FlagAlpha/Atom-7B-Chat.git
```

默认下载在[魔搭社区](https://modelscope.cn/docs/模型的下载)

~/.cache/modelscope/hub

#### text-generation-webui

> 也可以使用langchain-chatchat

github上下载下来
把模型移动到text-generation-webui/models文件夹下
运行text-generation-webui，这会创建虚拟环境并下载大量的python包
进入网页，点击模型，选择模型，加载


#### 使用

1 装载模型
2 chat


#### macos 内存不足解决办法

使用llama.cpp

https://agi-sphere.com/install-llama-mac/
https://zhuanlan.zhihu.com/p/651168655

大致过程如下：
- 转换：python3 convert.py FlagAlpha/Atom-7B-Chat
- 量化：./quantize FlagAlpha/Atom-7B-Chat/ggml-model-f16.gguf FlagAlpha/Atom-7B-Chat/ggml-model-q4_0.bin q4_0
- 装载： ./main -m ./ggml-model-q4_0.bin --color -f prompts/alpaca.txt -ins -c 2048 --temp 0.2 -n 256 --repeat_penalty 1.3

注意1：使用python3.12会报错如下：
raise BadZipFile("Bad CRC-32 for file %r" % self.name)
zipfile.BadZipFile: Bad CRC-32 for file 'pytorch_model-00001-of-00002/data/1'
需回退版本到3.10:
conda install python==3.10

注意2：如果是使用text-generation-webui装载ggml模型时需要注意：
 - 装载器要选择llama.cpp，否则会装载失败
 - chat选项卡的mode要选择chat-instruct

#### rag
https://juejin.cn/post/7309341734207750182

waiting
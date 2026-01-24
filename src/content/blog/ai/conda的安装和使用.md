---
title: conda的安装和使用
description: conda的安装和使用
category: "AI"
pubDate: 2024-02-25
draft: false
tags: ["ai","conda"]
cover_image: ""
canonical_url: false
---

## 安装conda

安装miniconda in macos的文档：
[Installing conda &#8212; conda 24.1.3.dev33 documentation](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)

#### 静默安装

```shell
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh -O ~/miniconda.sh
bash ~/miniconda.sh -b -p $HOME/miniconda
```

参数解释：
To run the [silent installation](https://conda.io/projects/conda/en/latest/glossary.html#silent-mode-glossary) of Miniconda for macOS or Linux, specify the -b and -p arguments of the bash installer. The following arguments are supported:

- `-b`: Batch mode with no PATH modifications to shell scripts. Assumes that you agree to the license agreement. Does not edit shell scripts such as `.bashrc`, `.bash_profile`, `.zshrc`, etc.
- `-p`: Installation prefix/path.
- `-f`: Force installation even if prefix `-p` already exists.

注意：安装完成后需要初始化，这样每次shell进入会默认进入到base环境
```shell
source miniconda/bin/activate
conda init --all
```

>  In order to initialize after the installation process is done, first run `source<path to conda>/bin/activate` and then run `conda init --all`.

#### 其他命令
升级：conda update conda
卸载：rm -rf ~/miniconda

## 使用conda
[Getting started with conda &#8212; conda 24.1.3.dev33 documentation](https://conda.io/projects/conda/en/latest/user-guide/getting-started.html)

创建环境：
conda create -n <env-name>

创建环境时加包：
conda create -n myenvironment python numpy pandas

列出环境：
conda info --envs

安装包：
可以先激活环境再装，也可以不激活情况下使用--name myenvironment指定环境安装包
```shell
# via environment activation
conda activate myenvironment
conda install matplotlib

# via command line option
conda install --name myenvironment matplotlib
```

退出环境：
conda deactiavte



#### 安装报错处理
conda install --yes --file requirements.txt

PackagesNotFoundError: The following packages are not available from current channels:

conda config --append channels conda-forge




LibMambaUnsatisfiableError: Encountered problems while solving
conda config --set channel_priority flexible

conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
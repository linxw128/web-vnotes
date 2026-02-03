---
title: chatbot_by_python
description: chatbot_by_python
category: AI
pubDate: 2024-02-25
draft: false
tags:
  - ai
  - conda
cover_image: ""
canonical_url: false
---

import streamlit as st
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

# 初始化会话状态
if "messages" not in st.session_state:
    st.session_state.messages = []

if "memory" not in st.session_state:
    st.session_state.memory = ConversationBufferMemory(input_key="question", memory_key="history")

if "llm_chain" not in st.session_state:
    # 创建 Ollama 实例
    llm = Ollama(model="qwen2.5")  # 可以根据需要替换为其他模型

    # 定义提示模板
    # prompt_template = """
    # {history}
    # 用户: {question}
    # 回答:"""
    prompt_template = """
    {history}
    {question}"""
    prompt = PromptTemplate(
        template=prompt_template, input_variables=["history", "question"]
    )

    # 创建带有记忆的聊天链
    st.session_state.llm_chain = LLMChain(
        llm=llm,
        prompt=prompt,
        memory=st.session_state.memory
    )

# Streamlit 应用界面
st.title("聊天机器人")

# 显示聊天记录
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# 用户输入
if prompt := st.chat_input("请输入你的问题："):
    # 添加用户消息到会话状态
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # 调用聊天链获取回答（流式输出）
    with st.chat_message("assistant"):
        response_placeholder = st.empty()  # 创建一个占位符用于流式输出
        full_response = ""  # 用于存储完整的回答

        # 假设 Ollama 支持流式输出
        for chunk in st.session_state.llm_chain.run(question=prompt, stream=True):
            full_response += chunk  # 逐步追加输出
            response_placeholder.markdown(full_response)  # 更新占位符内容

    # 添加模型回答到会话状态
    st.session_state.messages.append({"role": "assistant", "content": full_response})
# Component Checker

一款 Figma 插件，用于图标规范检查与设计文档生成。

## 功能

### 规范检查
检测图标命名、Vector 图层数量、填充规则（Fill Rule）、约束设置（Constraints）等规范问题，并支持一键修复。
- **自动修复**：批量修复 Constraints、Vector 命名、重复路径等常见问题
- **轮廓化**：将图标描边转为填充路径，合并所有路径为单一 Vector

### AI 描述
调用 Google Gemini API，为选中图标批量生成语义关键词描述，写回 Figma 组件属性。

### 设计规范
基于选中组件，结合知识库上下文，调用 AI 生成标准设计规范 JSON，并一键写入 Figma 画布生成可交付的规范帧（Spec Frame）。
- **知识库**：支持导入 `.md` / `.json` 文件作为规范生成的参考上下文
- **多轮对话**：可在生成后继续追问，迭代完善规范内容
- **写入 Figma**：将规范渲染为 1440px 标准布局帧，包含概述、变体、交互说明、显示规则等分区

## 使用方式

1. 在 Figma 桌面端，通过 `Plugins > Development > Import plugin from manifest...` 加载本地 `manifest.json`
2. 选中一个或多个 Component 节点
3. 切换至对应标签页使用各功能

> **注意**：首次使用需要在 `manifest.json` 中填入你的 Figma Plugin ID（替换 `REPLACE_WITH_YOUR_PLUGIN_ID`）。Plugin ID 在 Figma 开发者后台创建插件时生成。

## API 密钥配置

点击插件右上角 🔑 按钮可分别配置两个 AI 功能的密钥：

| 功能 | 密钥格式 | 说明 |
|------|----------|------|
| AI 描述 | `AIza...` | Google Gemini API 密钥 |
| 设计规范 | `sk-...` | AthenAI 密钥 |

密钥经过 AES-GCM 加密后存储在 Figma `clientStorage` 中，不会明文保存。

## 第三方代码声明

本项目 `ui.html` 中的填充规则检测相关函数（`fillRuleHitTest`、贝塞尔曲线算法等）参考并改编自 [figma-fill-rule-editor](https://github.com/nicktindall/figma-fill-rule-editor)（MIT License）。

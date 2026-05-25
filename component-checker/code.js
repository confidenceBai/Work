// @ts-nocheck

const LAYER_NAME = "Vector";

// 显示插件界面              

figma.showUI(__html__, {
  width: 520,
  height: 720,

});

// 调试日志函数（生产环境设为 false）
const DEBUG = false;
function debug(message) {
  if (DEBUG) console.log(message);
}

/**
 * 主要检查函数：检查选中的 icon 是否符合规范
 * 检查项包括：
 * 1. 命名重复
 * 2. 图层数量和命名
 * 3. 填充规则
 * 4. Constraints 设置
 */
async function checkIconRules() {
  try {
    debug("开始检查图标");
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      debug("未选择任何图标");
      figma.ui.postMessage({ 
        type: "check-results", 
        results: [],
        hasIssues: false 
      });
      return;
    }

    debug(`选中了 ${selection.length} 个节点`);
    
    // 优化1: 预先获取当前页面下的所有组件名称，用于查重检查
    const allComponents = await figma.currentPage.findAll(n => n.type === "COMPONENT");
    const componentNameMap = new Map();
    allComponents.forEach(comp => {
      const count = componentNameMap.get(comp.name) || 0;
      componentNameMap.set(comp.name, count + 1);
    });

    let allResults = [];
    let hasIssues = false;
    let total = selection.length;
    let current = 0;
    let batchResults = [];  // 用于批量发送结果
    const BATCH_SIZE = 10;  // 每10个图标发送一次结果

    // 检查每个选中的节点
    for (const node of selection) {
      if (node.type !== "COMPONENT") {
        current++;
        continue;
      }

      const result = {
        name: node.name,
        issues: [],
        nodeId: node.id
      };

      // 优化2: 使用预先准备的Map进行查重检查
      if (componentNameMap.get(node.name) > 1) {
        result.issues.push(`⚠️ 发现重复的命名: ${node.name}`);
      }

      // 优化3: 合并图层检查逻辑，减少遍历次数
      if (!node.children || node.children.length === 0) {
        result.issues.push("⚠️ 组件内没有子图层");
      } else {
        // 检查可见的 Vector 图层
        const vectors = [];
        node.findAll(n => {
          if (n.type === "VECTOR") {
            // 检查从当前节点到根节点的可见性
            let current = n;
            let isReallyVisible = n.visible;
            while (isReallyVisible && current.parent && current.parent !== node) {
              current = current.parent;
              isReallyVisible = isReallyVisible && current.visible;
            }
            if (isReallyVisible) {
              vectors.push(n);
            }
          }
        });
        
        if (vectors.length === 0) {
          result.issues.push("⚠️ 组件中没有找到可见的 Vector 图层");
        } else if (vectors.length > 1) {
          result.issues.push(`⚠️ 组件中存在 ${vectors.length} 个可见的 Vector 图层，应该只有 1 个`);
        } else {
          // 只检查唯一的可见 Vector 图层
          const vector = vectors[0];
          if (vector.name !== "Vector") {
            result.issues.push(`⚠️ 可见的 Vector 图层命名不规范: "${vector.name}" 应该命名为 "Vector"`);
          }
          // 新增: 检查 constraints 是否为 SCALE
          if (vector.constraints.horizontal !== "SCALE" || vector.constraints.vertical !== "SCALE") {
            result.issues.push("⚠️ 可见的 Vector 图层的 constraints 设置不正确，应为 Scale");
          }
          // 新增: 检查填充规则是否为 NONZERO
          const hasNonZeroFill = vector.vectorPaths.every(path => path.windingRule === "NONZERO");
          if (!hasNonZeroFill) {
            result.issues.push("⚠️ 可见的 Vector 图层的填充规则不正确，应为 NONZERO");
          }
          // 在检查 Vector 图层的地方修改检查逻辑
          if (vectors.length === 1) {
            const vector = vectors[0];
            // 检查重复的路径
            const pathDataMap = new Map();
            vector.vectorPaths.forEach((path, index) => {
              const pathKey = path.data; // 使用路径数据作为key
              if (!pathDataMap.has(pathKey)) {
                pathDataMap.set(pathKey, [index]);
              } else {
                pathDataMap.get(pathKey).push(index);
              }
            });

            // 检查是否有重复路径
            for (const [pathData, indices] of pathDataMap) {
              if (indices.length > 1) {
                result.issues.push(`⚠️ Vector 图层包含 ${indices.length} 个相同的路径，应该删除重复路径`);
                break;
              }
            }
          }
        }
      }

      result.hasIssues = result.issues.length > 0;
      hasIssues = hasIssues || result.hasIssues;
      allResults.push(result);
      batchResults.push(result);
      current++;

      // 优化4: 批量发送结果，减少通信次数
      if (batchResults.length >= BATCH_SIZE || current === total) {
        figma.ui.postMessage({
          type: "check-results",
          results: batchResults,
          hasIssues,
          isPartial: current < total,
          total,
          current
        });
        batchResults = [];
      }
    }

    // 发送最终结果
    debug("检查完成，发送最终结果");
    figma.ui.postMessage({
      type: "check-results",
      results: allResults,
      hasIssues,
      isPartial: false,
      total,
      current
    });

  } catch (error) {
    debug(`检查过程发生错误: ${error.message}`);
    figma.ui.postMessage({ type: 'error', message: error.message });
  }
}

/**
 * 打开填充规则编辑器：选中Vector图层并打开编辑器弹窗
 */
function openFillRuleEditor() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify("请先选择至少一个图标");
    return;
  }

  // 查找第一个包含Vector图层的节点
  let targetVector = null;
  for (const node of selection) {
    const vectors = [];
    node.findAll(n => {
      if (n.type === "VECTOR") {
        // 检查从当前节点到根节点的可见性
        let current = n;
        let isReallyVisible = n.visible;
        while (isReallyVisible && current.parent && current.parent !== node) {
          current = current.parent;
          isReallyVisible = isReallyVisible && current.visible;
        }
        if (isReallyVisible) {
          vectors.push(n);
        }
      }
    });
    
    if (vectors.length > 0) {
      targetVector = vectors[0]; // 选择第一个Vector图层
      break;
    }
  }

  if (!targetVector) {
    figma.notify("未找到Vector图层");
    return;
  }

  // 选中Vector图层
  figma.currentPage.selection = [targetVector];
  
  // 发送Vector图层数据到UI
  figma.ui.postMessage({
    type: "open-fill-rule-editor",
    node: {
      id: targetVector.id,
      vectorNetwork: targetVector.vectorNetwork
    }
  });
}

/**
 * 修复 Constraints：将所有选中图标的 Vector 图层约束设置为 SCALE
 * 确保图标在改变大小时能够等比例缩放
 */
async function fixConstraints() {
  const selection = figma.currentPage.selection;

  selection.forEach((node) => {
    const vectors = node.findAll((n) => n.type === "VECTOR");
    vectors.forEach((vector) => {
      // 检查从当前节点到根节点的可见性
      let current = vector;
      let isReallyVisible = vector.visible;
      while (isReallyVisible && current.parent && current.parent !== node) {
        current = current.parent;
        isReallyVisible = isReallyVisible && current.visible;
      }
      if (isReallyVisible) {
        vector.constraints = {
          horizontal: "SCALE",
          vertical: "SCALE",
        };
      }
    });
  });

  figma.notify("已修复 Constraints 设置");
  checkIconRules();
}



/**
 * 修复命名：修改选中图标的名称
 * @param {string} newName - 新的图标名称
 */
async function fixName(newName) {
  const selection = figma.currentPage.selection;
  if (selection.length > 0) {
    selection[0].name = newName;
    figma.notify("已修改图标名称");
    checkIconRules();
  }
}

/**
 * 修复 Vector 图层命名：将所有选中图标的可见 Vector 图层重命名为 "Union"
 */
async function fixVectorNames() {
  const selection = figma.currentPage.selection;

  selection.forEach((node) => {
    const vectors = [];
    node.findAll(n => {
      if (n.type === "VECTOR") {
        // 检查从当前节点到根节点的可见性
        let current = n;
        let isReallyVisible = n.visible;
        while (isReallyVisible && current.parent && current.parent !== node) {
          current = current.parent;
          isReallyVisible = isReallyVisible && current.visible;
        }
        if (isReallyVisible) {
          vectors.push(n);
        }
      }
    });
    
      vectors.forEach((vector) => {
      vector.name = LAYER_NAME;
      });
  });

  figma.notify("已修复可见 Vector 图层命名");
  checkIconRules();
}

/**
 * 获取节点的可见填充
 * @param {SceneNode} node 场景节点
 * @returns {Paint[]} 返回可见的填充数组
 */
function getVisibleFills(node) {
  try {
    // 添加节点存在性检查
    if (!node || node.removed) {
      return [];
    }
    
    const isVisible = (fill) => fill.visible !== false;
    if ("fills" in node && 
        Array.isArray(node.fills) && 
        node.fills.length > 0 && 
        node.fills.some(isVisible)) {
      return [...node.fills].filter(isVisible);
    }
    return [];
  } catch (error) {
    if (DEBUG) console.error("获取填充时出错:", error);
    return [];
  }
}

/**
 * 计算两个节点之间的绝对位置差异
 */
function getAbsoluteTransformDiff(a, b) {
  const aTransform = "absoluteTransform" in a ? a.absoluteTransform : [[1, 0, 0], [0, 1, 0]];
  const bTransform = "absoluteTransform" in b ? b.absoluteTransform : [[1, 0, 0], [0, 1, 0]];
  return {
    x: bTransform[0][2] - aTransform[0][2],
    y: bTransform[1][2] - aTransform[1][2],
  };
}

/**
 * 轮廓化并合并图标，同时保留原始图层
 * 功能：
 * 1. 将描边转换为填充轮廓
 * 2. 合并所有路径
 * 3. 保持原有填充颜色
 * 4. 在原节点内保留原始图层到隐藏的组中
 */
async function outlineAndFlatten() {
  try {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) return;

    for (const node of selection) {
      if (node.type !== "COMPONENT" && node.type !== "FRAME") continue;

      // 计算所有子图层的边界框
      let minX = Infinity, minY = Infinity;
      node.children.forEach(child => {
        minX = Math.min(minX, child.x);
        minY = Math.min(minY, child.y);
      });

      // 保存原始子图层到隐藏组
      const clonedChildren = node.children.map(child => {
        const clone = child.clone();
        // 保持相对于原始位置
        clone.x = child.x - minX;
        clone.y = child.y - minY;
        return clone;
      });
      
      // 创建原始图层组并设置正确的相对位置
      const originalGroup = figma.group(clonedChildren, node);
      originalGroup.name = "Original Layers";
      originalGroup.visible = false;
      // 设置组的位置为计算出的最小边界位置
      originalGroup.x = minX;
      originalGroup.y = minY;
      
      // 重新获取需要处理的节点
      let workingList = [...node.findAll(n => n !== originalGroup && n.parent !== originalGroup)];
      let fillToUse = null;

      // 处理描边和子节点
      for (let i = 0; i < workingList.length; i++) {
        const current = workingList[i];
        if (!current || current.removed) continue;
        if (current === originalGroup || current.parent === originalGroup) continue;
        
        const parent = current.parent;
        const isTopLevel = current.parent === node;

        // 处理子节点
        if ("children" in current && current.type !== "BOOLEAN_OPERATION") {
          workingList.push(...current.children);

          if (!isTopLevel) {
            for (const child of current.children) {
              const diff = getAbsoluteTransformDiff(parent, child);
              parent.appendChild(child);
              child.x = diff.x;
              child.y = diff.y;
            }
            if (!current.removed) {
              current.remove();
            }
            workingList.splice(i, 1);
            i--;
          }
        }

        // 处理描边
        if ("outlineStroke" in current) {
          const outlineNode = current.outlineStroke();
          if (outlineNode) {
            parent.appendChild(outlineNode);
            workingList.push(outlineNode);

            const visibleFills = getVisibleFills(current);
            if (!visibleFills.length) {
              current.remove();
              workingList.splice(i, 1);
              i--;
            }
          }
        }

        // 获取第一个有效的填充颜色
        if (!fillToUse) {
          const visibleFills = getVisibleFills(current);
          if (visibleFills.length > 0) {
            fillToUse = visibleFills;
          }
        }
      }

      // 如果没有找到填充颜色，使用默认灰色
      if (!fillToUse) {
        fillToUse = [{
          type: "SOLID",
          color: { r: 0.5, g: 0.5, b: 0.5 },
        }];
      }

      // 执行合并操作
      const initialFlatten = figma.flatten(workingList);
      const clonedFlatten = initialFlatten.clone();
      node.appendChild(clonedFlatten);
      clonedFlatten.x = initialFlatten.x;
      clonedFlatten.y = initialFlatten.y;

      const union = figma.union([initialFlatten, clonedFlatten], node);
      const finalFlatten = figma.flatten([union]);

      // 设置最终属性
      finalFlatten.constraints = {
        horizontal: "SCALE",
        vertical: "SCALE"
      };
      finalFlatten.fills = fillToUse;
      finalFlatten.name = LAYER_NAME;

      // 移除所有原始可见图层（除了新创建的和原始隐藏组）
      node.children.forEach(child => {
        if (child !== finalFlatten && child !== originalGroup) {
          child.remove();
        }
      });
    }

    await checkIconRules();
    figma.notify("轮廓化完成，原始图层已保存在隐藏组中");
  } catch (error) {
    if (DEBUG) console.error("轮廓化处理错误:", error);
    figma.notify("处理过程中出现错误", { error: true });
  }
}

/**
 * 修复 Vector 图层的重复路径问题：删除重复的相同路径
 */
async function fixVectorPaths() {
  const selection = figma.currentPage.selection;
  
  selection.forEach((node) => {
    const vectors = node.findAll(n => {
      if (n.type === "VECTOR") {
        // 检查从当前节点到根节点的可见性
        let current = n;
        let isReallyVisible = n.visible;
        while (isReallyVisible && current.parent && current.parent !== node) {
          current = current.parent;
          isReallyVisible = isReallyVisible && current.visible;
        }
        return isReallyVisible;
      }
      return false;
    });

    vectors.forEach((vector) => {
      // 使用 Map 来跟踪唯一的路径
      const uniquePaths = new Map();
      vector.vectorPaths.forEach((path) => {
        const pathKey = path.data;
        if (!uniquePaths.has(pathKey)) {
          uniquePaths.set(pathKey, path);
        }
      });

      // 只保留唯一的路径
      vector.vectorPaths = Array.from(uniquePaths.values());
    });
  });

  figma.notify("已移除重复的路径");
  checkIconRules();
}



// ── 单节点辅助修复函数（不依赖 selection）──

function getVisibleVectors(node) {
  const vectors = [];
  node.findAll(n => {
    if (n.type !== "VECTOR") return false;
    let cur = n, visible = n.visible;
    while (visible && cur.parent && cur.parent !== node) {
      cur = cur.parent;
      visible = visible && cur.visible;
    }
    if (visible) vectors.push(n);
    return false;
  });
  return vectors;
}

function applyFillRuleFixToNode(node) {
  getVisibleVectors(node).forEach(vector => {
    vector.vectorPaths = vector.vectorPaths.map(p => Object.assign({}, p, { windingRule: "NONZERO" }));
  });
}

function applyConstraintsFixToNode(node) {
  getVisibleVectors(node).forEach(vector => {
    vector.constraints = { horizontal: "SCALE", vertical: "SCALE" };
  });
}

function applyVectorNamesFixToNode(node) {
  getVisibleVectors(node).forEach(vector => { vector.name = LAYER_NAME; });
}

function applyVectorPathsFixToNode(node) {
  getVisibleVectors(node).forEach(vector => {
    const seen = new Map();
    vector.vectorPaths.forEach(p => { if (!seen.has(p.data)) seen.set(p.data, p); });
    vector.vectorPaths = Array.from(seen.values());
  });
}

async function fixAll(nodeIds, renames) {
  const renameMap = new Map((renames || []).map(r => [r.nodeId, r.newName]));
  nodeIds.forEach(id => {
    const node = figma.getNodeById(id);
    if (!node) return;
    applyConstraintsFixToNode(node);
    applyVectorNamesFixToNode(node);
    applyVectorPathsFixToNode(node);
    if (renameMap.has(id)) node.name = renameMap.get(id);
  });
  figma.notify("一键修复完成");
  checkIconRules();
}

async function getNodeImages(nodeIds) {
  const items = [];
  for (const id of nodeIds) {
    const node = figma.getNodeById(id);
    if (!node) continue;
    try {
      const bytes = await node.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 2 } });
      items.push({ nodeId: id, name: node.name, imageData: figma.base64Encode(bytes) });
    } catch (e) {
      items.push({ nodeId: id, name: node.name, imageData: null });
    }
  }
  figma.ui.postMessage({ type: "node-images", items });
}

/**
 * 消息处理器：处理来自 UI 的各种操作请求
 * - check-icons: 检查图标规范
 * - fix-all: 一键修复所有问题
 * - fix-fill-rule: 修复填充规则
 * - fix-constraints: 修复约束设置
 * - fix-name: 修复命名
 * - fix-vector-names: 修复 Vector 图层命名
 * - outline: 轮廓化并合并图标
 * - fix-vector-paths: 修复 Vector 图层的多路径问题
 */
// 添加处理 description 生成的代码
// 在文件顶部添加 arrayBufferToBase64 函数定义
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return figma.base64Encode(binary);
}

async function generateDescription() {
  try {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.notify("请先选择至少一个图标");
      return;
    }
    
    const nodesToProcess = selection.filter(node => ('description' in node));
    
    if (nodesToProcess.length === 0) {
      figma.notify("选中的节点不支持生成描述");
      return;
    }
    
    // 通知UI开始批量处理
    figma.ui.postMessage({
      type: 'start-batch-analysis',
      total: nodesToProcess.length
    });
    
    // 处理过滤后的节点
    for (let i = 0; i < nodesToProcess.length; i++) {
      const node = nodesToProcess[i];
      
      // 导出图标为 PNG
      const bytes = await node.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: 4 }
      });
      
      const base64Image = figma.base64Encode(bytes);
      
      // 发送到 UI 进行分析
      figma.ui.postMessage({
        type: 'analyze',
        imageData: base64Image,
        nodeId: node.id,
        name: node.name,
        current: i + 1,
        total: nodesToProcess.length
      });
      
      // 如果是批量处理，每处理5个暂停一下，避免API限制
      if (nodesToProcess.length > 5 && i > 0 && i % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
    
  } catch (error) {
    debug(`生成描述时出错: ${error.message}`);
    figma.notify(`生成描述失败: ${error.message}`);
  }
}

// 处理 UI 发来的更新描述请求
function updateDescription(description, nodeId) {
  try {
    // 查找对应的节点
    const node = figma.getNodeById(nodeId);
    if (!node) {
      figma.notify("找不到对应的节点");
      return;
    }
    
    // 更新节点的描述
    if ('description' in node) {
      node.description = description;
      figma.notify("已更新图标描述");
    } else {
      figma.notify("该节点不支持添加描述");
    }
  } catch (error) {
    debug(`更新描述时出错: ${error.message}`);
    figma.notify(`更新描述失败: ${error.message}`);
  }
}

// ── 表格自适应列宽算法（移植自 Markdown Plugin）────────────────
// table 为二维数组（第一行为表头），基于列内容长度计算权重
function calcSpecTableWeights(table) {
  if (!table || table.length === 0) return [];
  const colCount = table[0].length;
  const weights = new Array(colCount).fill(0);
  for (let c = 0; c < colCount; c++) {
    let totalLength = 0;
    let numericCount = 0;
    let longContentCount = 0;
    for (let r = 0; r < table.length; r++) {
      const content = String(table[r][c] || '');
      totalLength += content.length;
      if (/^\s*[\d.,+-]+\s*$/.test(content)) numericCount++;
      const chineseChars = (content.match(/[一-龥]/g) || []).length;
      const englishChars = content.length - chineseChars;
      const effectiveLength = chineseChars * 1.8 + englishChars;
      if (effectiveLength > 30 || content.includes('http') || content.includes('www.')) longContentCount++;
    }
    let weight = Math.max(1, totalLength / table.length);
    if (numericCount > table.length / 2) weight *= 0.7;
    if (longContentCount > 0) weight *= (1 + 0.1 * Math.min(longContentCount, 5));
    weights[c] = weight;
  }
  return weights;
}

function calcSpecTableWidths(weights, totalWidth) {
  const colCount = weights.length;
  if (colCount === 0) return [];
  const sum = weights.reduce((a, b) => a + b, 0);
  const minColWidth = colCount > 5 ? Math.max(80, 200 - (colCount - 5) * 20) : 100;
  const availableMaxWidth = Math.max(totalWidth / colCount * 2, 200);
  const maxColWidth = Math.min(400, availableMaxWidth);
  const effectiveTotalWidth = Math.max(totalWidth, colCount * minColWidth);
  const columnWidths = weights.map(w =>
    Math.min(maxColWidth, Math.max(minColWidth, Math.round((w / sum) * effectiveTotalWidth)))
  );
  let currentTotal = columnWidths.reduce((a, b) => a + b, 0);
  if (currentTotal !== effectiveTotalWidth) {
    const diff = effectiveTotalWidth - currentTotal;
    if (Math.abs(diff) < colCount) {
      columnWidths[0] += diff;
    } else {
      const adjustPerCol = diff / colCount;
      for (let i = 0; i < colCount; i++) {
        columnWidths[i] += Math.round(adjustPerCol * (weights[i] / sum) * colCount);
      }
      columnWidths[0] += effectiveTotalWidth - columnWidths.reduce((a, b) => a + b, 0);
    }
  }
  return columnWidths;
}

// ── createSpecFrame: 生成设计规范 Frame ──
async function createSpecFrame(specJson, componentId, componentName, preComposition) {
  // Font loading: try PingFang SC → Inter → Roboto
  let fontFamily = 'PingFang SC';
  let boldStyle = 'Semibold';
  try {
    await figma.loadFontAsync({ family: 'PingFang SC', style: 'Regular' });
    await figma.loadFontAsync({ family: 'PingFang SC', style: 'Semibold' });
  } catch (e) {
    try {
      fontFamily = 'Inter';
      boldStyle = 'Bold';
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
    } catch (e2) {
      try {
        fontFamily = 'Roboto';
        boldStyle = 'Bold';
        await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Roboto', style: 'Bold' });
      } catch (e3) {
        figma.notify('无法加载字体，使用默认字体');
        fontFamily = null;
      }
    }
  }
  // Table/Cell 组件使用 JetBrains Maple Mono，预加载以避免写入文本时报错
  try {
    await figma.loadFontAsync({ family: 'JetBrains Maple Mono', style: 'Medium' });
    await figma.loadFontAsync({ family: 'JetBrains Maple Mono', style: 'Regular' });
  } catch (e) { /* 非致命：字体不存在时组件内部文本保持原样 */ }
  try {
    await figma.loadFontAsync({ family: 'PingFang SC', style: 'Medium' });
  } catch (e) { /* 非致命 */ }

  // ── Color tokens ─────────────────────────────
  const C = {
    white:         { r: 1,    g: 1,    b: 1    },
    titleBarBg:    { r: 0.11, g: 0.11, b: 0.118 },
    titleText:     { r: 1,    g: 1,    b: 1    },
    titleMeta:     { r: 0.55, g: 0.55, b: 0.58  },
    secTitle:      { r: 0.11, g: 0.11, b: 0.118 },
    bodyText:      { r: 0.2,  g: 0.2,  b: 0.22  },
    mutedText:     { r: 0.5,  g: 0.5,  b: 0.52  },
    accentBlue:    { r: 0.27, g: 0.38, b: 0.95  },
    tableHdrBg:    { r: 0.953,g: 0.953,b: 0.961 },
    tableHdrText:  { r: 0.38, g: 0.38, b: 0.41  },
    tableBorder:   { r: 0.867,g: 0.867,b: 0.886 },
    demoBg:        { r: 0.961,g: 0.961,b: 0.969 },
    tagBoolBg:     { r: 1.0,  g: 0.929,b: 0.843 },
    tagBoolFg:     { r: 0.75, g: 0.42, b: 0.0   },
    tagStrBg:      { r: 0.867,g: 0.929,b: 1.0   },
    tagStrFg:      { r: 0.1,  g: 0.42, b: 0.82  },
    tagNumBg:      { r: 0.867,g: 0.973,b: 0.886 },
    tagNumFg:      { r: 0.08, g: 0.52, b: 0.18  },
    tagDefaultBg:  { r: 0.922,g: 0.922,b: 0.941 },
    tagDefaultFg:  { r: 0.35, g: 0.35, b: 0.4   },
  };

  // ── Hex → Figma RGB ───────────────────────────
  function hexToRgb(hex) {
    const h = (hex || '#888888').replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const n = parseInt(full, 16);
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
  }

  // ── Text helper ───────────────────────────────
  function tx(content, size, bold) {
    const t = figma.createText();
    if (fontFamily) {
      t.fontName = { family: fontFamily, style: bold ? boldStyle : 'Regular' };
    }
    t.fontSize = size;
    t.characters = String(content || '');
    return t;
  }

  // ── Root frame (no padding — title bar is edge-to-edge) ──
  const frame = figma.createFrame();
  frame.name = '设计规范 · ' + (componentName || '未命名');
  frame.resize(1440, 100);
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.paddingTop = 0;
  frame.paddingBottom = 0;
  frame.paddingLeft = 0;
  frame.paddingRight = 0;
  frame.itemSpacing = 0;
  frame.fills = [{ type: 'SOLID', color: C.white }];

  // ── Title bar ─────────────────────────────────
  const titleBar = figma.createFrame();
  titleBar.name = 'TitleBar';
  titleBar.layoutMode = 'VERTICAL';
  titleBar.primaryAxisSizingMode = 'AUTO';
  titleBar.counterAxisSizingMode = 'FIXED';
  titleBar.layoutAlign = 'STRETCH';
  titleBar.paddingTop = 32;
  titleBar.paddingBottom = 32;
  titleBar.paddingLeft = 80;
  titleBar.paddingRight = 80;
  titleBar.itemSpacing = 8;
  titleBar.fills = [{ type: 'SOLID', color: C.titleBarBg }];

  const titleTxt = tx(componentName || '组件', 28, true);
  titleTxt.layoutAlign = 'STRETCH';
  titleTxt.fills = [{ type: 'SOLID', color: C.titleText }];
  titleBar.appendChild(titleTxt);

  const today = new Date();
  const dateStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');
  const metaTxt = tx('设计规范   ·   更新时间: ' + dateStr, 13, false);
  metaTxt.layoutAlign = 'STRETCH';
  metaTxt.fills = [{ type: 'SOLID', color: C.titleMeta }];
  titleBar.appendChild(metaTxt);

  frame.appendChild(titleBar);

  // ── Body wrapper (padded content area) ───────
  const body = figma.createFrame();
  body.name = 'Body';
  body.layoutMode = 'VERTICAL';
  body.primaryAxisSizingMode = 'AUTO';
  body.counterAxisSizingMode = 'FIXED';
  body.layoutAlign = 'STRETCH';
  body.paddingTop = 60;
  body.paddingBottom = 80;
  body.paddingLeft = 80;
  body.paddingRight = 80;
  body.itemSpacing = 56;
  body.fills = [{ type: 'SOLID', color: C.white }];
  frame.appendChild(body);

  // ── Section builder ───────────────────────────
  function makeSec(title) {
    const sec = figma.createFrame();
    sec.name = title;
    sec.layoutMode = 'VERTICAL';
    sec.primaryAxisSizingMode = 'AUTO';
    sec.counterAxisSizingMode = 'FIXED';
    sec.layoutAlign = 'STRETCH';
    sec.itemSpacing = 20;
    sec.fills = [];

    // Section title row with left accent bar
    const titleRow = figma.createFrame();
    titleRow.name = 'SectionTitleRow';
    titleRow.layoutMode = 'HORIZONTAL';
    titleRow.primaryAxisSizingMode = 'AUTO';
    titleRow.counterAxisSizingMode = 'AUTO';
    titleRow.counterAxisAlignItems = 'CENTER';
    titleRow.itemSpacing = 10;
    titleRow.fills = [];

    const accent = figma.createRectangle();
    accent.name = 'accent';
    accent.resize(4, 22);
    accent.cornerRadius = 2;
    accent.fills = [{ type: 'SOLID', color: C.accentBlue }];
    titleRow.appendChild(accent);

    const hText = tx(title, 22, true);
    hText.fills = [{ type: 'SOLID', color: C.secTitle }];
    titleRow.appendChild(hText);

    sec.appendChild(titleRow);

    // Thin divider below title
    const div = figma.createRectangle();
    div.name = 'divider';
    div.resize(1, 1);
    div.layoutAlign = 'STRETCH';
    div.fills = [{ type: 'SOLID', color: C.tableBorder }];
    sec.appendChild(div);

    return sec;
  }


  // ── Type tag chip ─────────────────────────────
  function makeTypeChip(typeStr) {
    const lower = (typeStr || '').toLowerCase().trim();
    let bg = C.tagDefaultBg, fg = C.tagDefaultFg;
    if (lower === 'boolean' || lower === 'bool') { bg = C.tagBoolBg; fg = C.tagBoolFg; }
    else if (lower === 'string') { bg = C.tagStrBg; fg = C.tagStrFg; }
    else if (lower === 'number' || lower === 'int' || lower === 'float' || lower === 'enum') {
      bg = C.tagNumBg; fg = C.tagNumFg;
    }
    const chip = figma.createFrame();
    chip.name = 'TypeTag';
    chip.layoutMode = 'HORIZONTAL';
    chip.primaryAxisSizingMode = 'AUTO';
    chip.counterAxisSizingMode = 'AUTO';
    chip.primaryAxisAlignItems = 'CENTER';
    chip.counterAxisAlignItems = 'CENTER';
    chip.paddingLeft = 8;
    chip.paddingRight = 8;
    chip.paddingTop = 3;
    chip.paddingBottom = 3;
    chip.cornerRadius = 4;
    chip.fills = [{ type: 'SOLID', color: bg }];
    const t = tx(typeStr || '', 12, false);
    t.fills = [{ type: 'SOLID', color: fg }];
    chip.appendChild(t);
    return chip;
  }

  // ── Numbered list item ────────────────────────
  function makeListItem(idx, label, desc) {
    const item = figma.createFrame();
    item.name = 'item-' + idx;
    item.layoutMode = 'VERTICAL';
    item.primaryAxisSizingMode = 'AUTO';
    item.counterAxisSizingMode = 'FIXED';
    item.layoutAlign = 'STRETCH';
    item.itemSpacing = 4;
    item.fills = [];

    const labelTxt = tx(idx + '.  ' + label, 14, true);
    labelTxt.layoutAlign = 'STRETCH';
    labelTxt.fills = [{ type: 'SOLID', color: C.bodyText }];
    item.appendChild(labelTxt);

    if (desc) {
      const descTxt = tx(desc, 13, false);
      descTxt.layoutAlign = 'STRETCH';
      descTxt.fills = [{ type: 'SOLID', color: C.mutedText }];
      item.appendChild(descTxt);
    }
    return item;
  }

  // ── Sub-heading (for interaction sub-categories) ──
  function makeSubHeading(label) {
    const t = tx(label, 15, true);
    t.layoutAlign = 'STRETCH';
    t.fills = [{ type: 'SOLID', color: C.secTitle }];
    return t;
  }

  // ── Structural index diagram (component instance + Info badge instances) ──
  async function makeAnnotatedIndex(compNode, items, infoCompNode) {
    const PAD = 48;
    const BADGE_LINE_H = 24;
    const BADGE_BOX_H = 28;
    const BADGE_AREA_H = BADGE_BOX_H + BADGE_LINE_H; // 52 — used for container height when Info unavailable
    const HIGHLIGHT = { r: 1, g: 0.773, b: 0 };     // #FFC500
    const LINE_CLR  = { r: 0.6, g: 0.6, b: 0.65 };

    // Resolve the direction=Top, subInfo=False variant from the Info COMPONENT_SET
    let topVariant = null;
    if (infoCompNode) {
      if (infoCompNode.type === 'COMPONENT_SET') {
        topVariant = infoCompNode.children.find(c =>
          c.type === 'COMPONENT' &&
          c.name.toLowerCase().includes('top') &&
          c.name.toLowerCase().includes('false')
        ) || infoCompNode.children.find(c =>
          c.type === 'COMPONENT' && c.name.toLowerCase().includes('top')
        ) || infoCompNode.defaultVariant;
      } else if (infoCompNode.type === 'COMPONENT') {
        topVariant = infoCompNode;
      }
    }

    async function makeNativeBadge(num) {
      const wrap = figma.createFrame();
      wrap.layoutMode = 'VERTICAL';
      wrap.primaryAxisSizingMode = 'AUTO';
      wrap.counterAxisSizingMode = 'AUTO';
      wrap.primaryAxisAlignItems = 'CENTER';
      wrap.counterAxisAlignItems = 'CENTER';
      wrap.itemSpacing = 0;
      wrap.fills = [];
      wrap.clipsContent = false;

      const bubble = figma.createFrame();
      bubble.layoutMode = 'HORIZONTAL';
      bubble.primaryAxisSizingMode = 'AUTO';
      bubble.counterAxisSizingMode = 'AUTO';
      bubble.primaryAxisAlignItems = 'CENTER';
      bubble.counterAxisAlignItems = 'CENTER';
      bubble.paddingTop = 4; bubble.paddingBottom = 4;
      bubble.paddingLeft = 8; bubble.paddingRight = 8;
      bubble.cornerRadius = 6;
      bubble.fills = [{ type: 'SOLID', color: HIGHLIGHT }];
      const numTx = tx(String(num), 12, true);
      numTx.fills = [{ type: 'SOLID', color: { r: 0, g: 0.012, b: 0.055 } }];
      bubble.appendChild(numTx);
      wrap.appendChild(bubble);

      const line = figma.createRectangle();
      line.resize(1.5, BADGE_LINE_H);
      line.fills = [{ type: 'SOLID', color: LINE_CLR }];
      wrap.appendChild(line);
      return wrap;
    }

    // Create an Info badge instance or fall back to native badge
    async function makeBadge(num) {
      if (topVariant) {
        try {
          const inst = topVariant.createInstance();
          const textNodes = inst.findAll(n => n.type === 'TEXT');
          const mainText = textNodes[0];
          if (mainText) {
            await figma.loadFontAsync(mainText.fontName);
            mainText.characters = String(num);
          }
          return inst;
        } catch (e) {
          console.warn('Info 实例创建失败，降级为 native badge:', e.message);
        }
      }
      return makeNativeBadge(num);
    }

    const inst = compNode.createInstance();
    const instW = inst.width, instH = inst.height;
    const n = items.length;
    const frameW = Math.max(instW + PAD * 2, 1280);

    // Measure badge height dynamically from the first badge
    let badgeAreaH = BADGE_AREA_H;
    if (n > 0 && topVariant) {
      try {
        const probe = topVariant.createInstance();
        badgeAreaH = probe.height;
        probe.remove();
      } catch (e) { /* keep default */ }
    }
    const frameH = instH + badgeAreaH + PAD * 2;

    const container = figma.createFrame();
    container.name = 'StructuralIndexDemo';
    container.layoutMode = 'NONE';
    container.clipsContent = false;
    container.layoutAlign = 'STRETCH';
    container.cornerRadius = 8;
    container.fills = [{ type: 'SOLID', color: C.demoBg }];
    container.resize(frameW, frameH);

    const instOffsetX = (frameW - instW) / 2;
    inst.x = instOffsetX;
    inst.y = badgeAreaH + PAD;
    container.appendChild(inst);

    if (n > 0) {
      for (let i = 0; i < n; i++) {
        const item = items[i];
        const badgeXCenter = (item && item.x != null)
          ? instOffsetX + item.x + item.w / 2
          : instOffsetX + (instW / (n + 1)) * (i + 1);
        const badge = await makeBadge(i + 1);
        badge.x = badgeXCenter - badge.width / 2;
        badge.y = PAD / 2;
        container.appendChild(badge);
      }
    }
    return container;
  }

  // ── Variant preview column (instance + label) ─
  function makeInstanceColumn(instance, labelText) {
    const col = figma.createFrame();
    col.name = 'VariantCol-' + labelText;
    col.layoutMode = 'VERTICAL';
    col.primaryAxisSizingMode = 'AUTO';
    col.counterAxisSizingMode = 'AUTO';
    col.primaryAxisAlignItems = 'CENTER';
    col.counterAxisAlignItems = 'CENTER';
    col.itemSpacing = 12;
    col.paddingTop = 32;
    col.paddingBottom = 32;
    col.paddingLeft = 24;
    col.paddingRight = 24;
    col.fills = [];
    col.appendChild(instance);
    const lbl = tx(labelText, 11, false);
    lbl.fills = [{ type: 'SOLID', color: C.mutedText }];
    col.appendChild(lbl);
    return col;
  }

  // ── Fallback table cell builder (used when component import fails) ──
  function makeCell(content, size, bold, bgColor, fgColor) {
    const cell = figma.createFrame();
    cell.name = 'cell';
    cell.layoutMode = 'HORIZONTAL';
    cell.primaryAxisSizingMode = 'FIXED';
    cell.counterAxisSizingMode = 'AUTO';
    cell.layoutGrow = 1;
    cell.paddingLeft = 16; cell.paddingRight = 16;
    cell.paddingTop = 10; cell.paddingBottom = 10;
    cell.fills = bgColor ? [{ type: 'SOLID', color: bgColor }] : [];
    cell.strokes = [{ type: 'SOLID', color: C.tableBorder }];
    cell.strokeWeight = 1;
    cell.strokeAlign = 'INSIDE';
    const t = tx(content, size, bold);
    t.layoutSizingHorizontal = 'FILL';
    t.textAutoResize = 'HEIGHT';
    t.fills = [{ type: 'SOLID', color: fgColor || C.bodyText }];
    cell.appendChild(t);
    return cell;
  }

  // ── Table/Cell 组件导入（人事线业务组件_设计规范 文件）────────────
  // 前置步骤：在文件 KW36UBaPZAIwybt8F570KE 内运行以下脚本获取 published key：
  //   console.log('TH key:', figma.getNodeById('5136:39002').key);
  //   console.log('TD key:', figma.getNodeById('5136:39006').key);
  //   console.log('TD blue tag key:', figma.getNodeById('5136:39011').key);
  //   console.log('TD grey tag key:', figma.getNodeById('5183:332445').key);
  // 将输出结果填入下方常量：
  const TABLE_TH_KEY = '1a6803e2b14da453de4792a93efd1d570452c32c'; // type=th, showText=true, showTag=false
  const TABLE_TD_KEY = '443d257aa460bdd4ec3ef87390bd37aa9743618e'; // type=td, showText=true, showTag=false
  const TABLE_TD_TAG_BLUE_KEY = ''; // type=td, showTag=true, tagColor=blue（节点 5136:39011）
  const TABLE_TD_TAG_GREY_KEY = ''; // type=td, showTag=true, tagColor=grey（节点 5183:332445）

  // ── Info 标注组件（人事线业务组件_设计规范 文件）──────────────
  // 前置步骤：在文件 KW36UBaPZAIwybt8F570KE 内运行以下脚本获取 published key：
  //   console.log('Info key:', figma.getNodeById('5200:342304').key);
  // 将输出结果填入下方常量：
  const INFO_COMP_KEY = ''; // Info 标注组件 COMPONENT_SET（节点 5200:342304）

  async function importTableCellComponents() {
    let thComp = null, tdComp = null, tdTagBlueComp = null, tdTagGreyComp = null;
    try {
      thComp        = await figma.importComponentByKeyAsync(TABLE_TH_KEY);
      tdComp        = await figma.importComponentByKeyAsync(TABLE_TD_KEY);
      if (TABLE_TD_TAG_BLUE_KEY) tdTagBlueComp = await figma.importComponentByKeyAsync(TABLE_TD_TAG_BLUE_KEY);
      if (TABLE_TD_TAG_GREY_KEY) tdTagGreyComp = await figma.importComponentByKeyAsync(TABLE_TD_TAG_GREY_KEY);
    } catch (e) {
      console.warn('importComponentByKeyAsync 失败，降级到 getNodeById:', e.message);
    }
    if (!thComp)        thComp        = figma.getNodeById('5136:39002');
    if (!tdComp)        tdComp        = figma.getNodeById('5136:39006');
    if (!tdTagBlueComp) tdTagBlueComp = figma.getNodeById('5136:39011');
    if (!tdTagGreyComp) tdTagGreyComp = figma.getNodeById('5183:332445');
    return { thComp, tdComp, tdTagBlueComp, tdTagGreyComp };
  }

  async function importInfoComponent() {
    let infoComp = null;
    try {
      if (INFO_COMP_KEY) infoComp = await figma.importComponentByKeyAsync(INFO_COMP_KEY);
    } catch (e) {
      console.warn('importInfoComponent 失败，降级到 getNodeById:', e.message);
    }
    if (!infoComp) infoComp = figma.getNodeById('5200:342304');
    return infoComp;
  }

  // ── 文本节点遍历（移植自 Markdown Plugin）─────────────────────
  function findAllTextNodes(node, arr = []) {
    if (node.type === 'TEXT') arr.push(node);
    if ('children' in node) {
      for (const child of node.children) findAllTextNodes(child, arr);
    }
    return arr;
  }

  // 将文本节点设为横向 fill + 竖向自动高度，使内容换行
  async function setTextNodeToFill(textNode) {
    if (!textNode || textNode.type !== 'TEXT') return;
    try {
      await figma.loadFontAsync(textNode.fontName);
      const content = textNode.characters;
      textNode.layoutSizingHorizontal = 'FILL';
      textNode.textAutoResize = 'HEIGHT';
      textNode.characters = content;
    } catch (e) {
      console.error('setTextNodeToFill 失败:', e);
    }
  }

  // 根据文本实际高度重新计算并调整单元格实例高度
  // Table/Cell 组件内边距：上下各 16px → 垂直内边距合计 32px
  async function recalcCellHeight(instance, textNode) {
    if (!instance || !textNode) return instance ? instance.height : 56;
    try {
      const required = textNode.height + 32;
      if (required > instance.height) instance.resize(instance.width, required);
      return instance.height;
    } catch (e) {
      console.error('recalcCellHeight 失败:', e);
      return instance.height;
    }
  }

  // ── 通用表格构建（两遍：创建实例 → 填文本 + 归一化行高）────────
  // tableName: 表格 frame 名称；headers: 字符串数组；dataRows: 二维字符串数组
  // colWidths: 各列像素宽度数组；thComp/tdComp: 组件节点
  async function makeSpecTable(tableName, headers, dataRows, colWidths, thComp, tdComp, tagCellMap = null) {
    const colCount = headers.length;

    // 探测默认单元格高度
    let defaultCellHeight = 56; // Table/Cell 设计规范默认高度（24px 行高 + 16+16 内边距）
    if (thComp) {
      try {
        const probe = thComp.createInstance();
        defaultCellHeight = probe.height;
        probe.remove();
      } catch (e) { /* 使用回退值 */ }
    }

    // 表格外层 frame（与原有表格样式一致）
    const tableFrame = figma.createFrame();
    tableFrame.name = tableName || 'Table';
    tableFrame.layoutMode = 'VERTICAL';
    tableFrame.primaryAxisSizingMode = 'AUTO';
    tableFrame.counterAxisSizingMode = 'FIXED';
    tableFrame.layoutAlign = 'STRETCH';
    tableFrame.itemSpacing = 0;
    tableFrame.fills = [];
    tableFrame.cornerRadius = 6;
    tableFrame.clipsContent = true;
    tableFrame.strokes = [{ type: 'SOLID', color: C.tableBorder }];
    tableFrame.strokeWeight = 1;
    tableFrame.strokeAlign = 'OUTSIDE';

    // 若组件导入失败则降级到原始 makeCell 实现
    if (!thComp || !tdComp) {
      const hRow = figma.createFrame();
      hRow.name = 'Header';
      hRow.layoutMode = 'HORIZONTAL';
      hRow.primaryAxisSizingMode = 'FIXED';
      hRow.counterAxisSizingMode = 'AUTO';
      hRow.layoutAlign = 'STRETCH';
      hRow.itemSpacing = 0;
      hRow.fills = [];
      headers.forEach((col, c) => {
        const cell = makeCell(col, 13, true, C.tableHdrBg, C.tableHdrText);
        cell.layoutGrow = 0;
        cell.resize(colWidths[c], cell.height);
        cell.layoutSizingHorizontal = 'FIXED';
        hRow.appendChild(cell);
      });
      tableFrame.appendChild(hRow);
      dataRows.forEach((row, i) => {
        const dRow = figma.createFrame();
        dRow.name = 'Row-' + i;
        dRow.layoutMode = 'HORIZONTAL';
        dRow.primaryAxisSizingMode = 'FIXED';
        dRow.counterAxisSizingMode = 'AUTO';
        dRow.layoutAlign = 'STRETCH';
        dRow.itemSpacing = 0;
        dRow.fills = i % 2 === 1 ? [{ type: 'SOLID', color: { r: 0.988, g: 0.988, b: 0.996 } }] : [];
        row.forEach((cellVal, c) => {
          const cell = makeCell(String(cellVal || ''), 13, false, null, C.bodyText);
          cell.layoutGrow = 0;
          cell.resize(colWidths[c], cell.height);
          cell.layoutSizingHorizontal = 'FIXED';
          dRow.appendChild(cell);
        });
        tableFrame.appendChild(dRow);
      });
      return tableFrame;
    }

    // ── 第一遍：创建组件实例 ─────────────────────────────────
    const allInstances = []; // [rowIdx][colIdx]

    // 表头行
    const headerRow = figma.createFrame();
    headerRow.name = 'Header';
    headerRow.layoutMode = 'HORIZONTAL';
    headerRow.primaryAxisSizingMode = 'AUTO';
    headerRow.counterAxisSizingMode = 'AUTO';
    headerRow.layoutAlign = 'STRETCH';
    headerRow.itemSpacing = 0;
    headerRow.fills = [];
    const headerInsts = [];
    for (let c = 0; c < colCount; c++) {
      const inst = thComp.createInstance();
      inst.resize(colWidths[c], defaultCellHeight);
      headerRow.appendChild(inst);
      headerInsts.push(inst);
    }
    tableFrame.appendChild(headerRow);
    allInstances.push(headerInsts);

    // 数据行
    for (let r = 0; r < dataRows.length; r++) {
      const rowFrame = figma.createFrame();
      rowFrame.name = 'Row-' + r;
      rowFrame.layoutMode = 'HORIZONTAL';
      rowFrame.primaryAxisSizingMode = 'AUTO';
      rowFrame.counterAxisSizingMode = 'AUTO';
      rowFrame.layoutAlign = 'STRETCH';
      rowFrame.itemSpacing = 0;
      rowFrame.fills = [];
      const rowInsts = [];
      for (let c = 0; c < colCount; c++) {
        const cellVal = dataRows[r][c];
        const tagComp = (tagCellMap && tagCellMap[c] && tagCellMap[c][String(cellVal)]) || null;
        const inst = (tagComp || tdComp).createInstance();
        inst.resize(colWidths[c], defaultCellHeight);
        rowFrame.appendChild(inst);
        rowInsts.push(inst);
      }
      tableFrame.appendChild(rowFrame);
      allInstances.push(rowInsts);
    }

    // ── 第二遍：填文本 + 自适应行高 ──────────────────────────
    const allRows = [headers, ...dataRows];
    const rowHeights = new Array(allRows.length).fill(defaultCellHeight);

    for (let r = 0; r < allRows.length; r++) {
      for (let c = 0; c < colCount; c++) {
        const instance = allInstances[r][c];
        const content = String(allRows[r][c] || '');
        const textNodes = findAllTextNodes(instance, []);
        if (textNodes.length === 0) continue;
        const firstTextNode = textNodes[0];
        try {
          await figma.loadFontAsync(firstTextNode.fontName);
        } catch (fontErr) {
          if (fontFamily) {
            const isBold = r === 0;
            firstTextNode.fontName = { family: fontFamily, style: isBold ? boldStyle : 'Regular' };
          } else {
            console.error(`表格单元格 [${r},${c}] 无可用字体:`, fontErr);
            continue;
          }
        }
        try {
          firstTextNode.characters = content;
          await setTextNodeToFill(firstTextNode);
          const newH = await recalcCellHeight(instance, firstTextNode);
          if (newH > rowHeights[r]) rowHeights[r] = newH;
        } catch (e) {
          console.error(`表格单元格 [${r},${c}] 写入失败:`, e);
        }
      }
      // 每处理完一行就 yield，避免阻塞主线程
      if (r % 5 === 4) await new Promise(res => setTimeout(res, 0));
    }

    // 归一化：同行所有单元格高度一致
    for (let r = 0; r < allRows.length; r++) {
      for (let c = 0; c < colCount; c++) {
        const instance = allInstances[r][c];
        if (instance.height !== rowHeights[r]) {
          try { instance.resize(instance.width, rowHeights[r]); } catch (e) { /* ignore */ }
        }
      }
    }

    return tableFrame;
  }

  // ── 导入 Table/Cell 组件（一次性，供全部表格复用）────────────
  const { thComp, tdComp, tdTagBlueComp, tdTagGreyComp } = await importTableCellComponents();
  const infoComp = await importInfoComponent();
  // 表格可用宽度 = 1440 body 宽 − 左右各 80px 内边距
  const SPEC_TABLE_WIDTH = 1280;

  // ─────────────────────────────────────────────
  // Section: 概述
  // ─────────────────────────────────────────────
  if (specJson && specJson.overview) {
    const sec = makeSec('概述');
    const ov = specJson.overview;

    if (ov.description) {
      const descTxt = tx(ov.description, 15, false);
      descTxt.layoutAlign = 'STRETCH';
      descTxt.fills = [{ type: 'SOLID', color: C.bodyText }];
      sec.appendChild(descTxt);
    }

    if (ov.props && ov.props.length > 0) {
      const propsHeaders = ['属性名', '类型', '默认值', '说明'];
      const propsDataRows = ov.props.map(p => [
        p.name || '',
        p.type || '',
        String(p.defaultValue != null ? p.defaultValue : (p.default != null ? p.default : '—')),
        p.desc || ''
      ]);
      const propsWidths = calcSpecTableWidths(
        calcSpecTableWeights([propsHeaders, ...propsDataRows]),
        SPEC_TABLE_WIDTH
      );
      const propsTagCellMap = {
        1: { 'VARIANT': tdTagBlueComp, 'BOOLEAN': tdTagGreyComp },
        2: { 'true': tdTagBlueComp, 'false': tdTagGreyComp },
      };
      const propsTable = await makeSpecTable('Props Table', propsHeaders, propsDataRows, propsWidths, thComp, tdComp, propsTagCellMap);
      sec.appendChild(propsTable);
    }
    body.appendChild(sec);
  }

  // ─────────────────────────────────────────────
  // Section: 组件构成
  // ─────────────────────────────────────────────
  if (specJson && specJson.composition && specJson.composition.length > 0) {
    const sec = makeSec('组件构成');

    // Structural index diagram: component preview with numbered Info badges
    try {
      const compNode = figma.getNodeById(componentId);
      if (compNode) {
        const diagramItems = (preComposition && preComposition.length > 0)
          ? preComposition
          : specJson.composition;
        const diagram = await makeAnnotatedIndex(compNode, diagramItems, infoComp);
        if (diagram) sec.appendChild(diagram);
      }
    } catch (e) {
      console.warn('结构索引生成失败，跳过:', e.message);
    }

    const compHeaders = ['构成', '是否必须', '说明'];
    const rawAiComp = specJson.composition || [];
    const compositionSource = (preComposition && preComposition.length > 0)
      ? preComposition.map((pre, i) => {
          const ai = rawAiComp[i] || {};
          return { part: ai.part || pre.name, required: ai.required || '', desc: ai.desc || '' };
        })
      : rawAiComp;
    const compDataRows = compositionSource.map(c => [c.part || '', c.required || '', c.desc || '']);
    const compWidths = calcSpecTableWidths(
      calcSpecTableWeights([compHeaders, ...compDataRows]),
      SPEC_TABLE_WIDTH
    );
    const compTable = await makeSpecTable('Composition Table', compHeaders, compDataRows, compWidths, thComp, tdComp);
    sec.appendChild(compTable);
    body.appendChild(sec);
  }

  // ─────────────────────────────────────────────
  // Section: 颜色规范 (conditional)
  // ─────────────────────────────────────────────
  if (specJson && specJson.color_tokens && specJson.color_tokens.length > 0) {
    const sec = makeSec('颜色规范');

    const tokenList = figma.createFrame();
    tokenList.name = 'ColorTokenList';
    tokenList.layoutMode = 'VERTICAL';
    tokenList.primaryAxisSizingMode = 'AUTO';
    tokenList.counterAxisSizingMode = 'FIXED';
    tokenList.layoutAlign = 'STRETCH';
    tokenList.itemSpacing = 12;
    tokenList.fills = [];

    specJson.color_tokens.forEach(ct => {
      const row = figma.createFrame();
      row.name = 'ColorToken-' + (ct.token || '');
      row.layoutMode = 'HORIZONTAL';
      row.primaryAxisSizingMode = 'AUTO';
      row.counterAxisSizingMode = 'AUTO';
      row.counterAxisAlignItems = 'CENTER';
      row.itemSpacing = 16;
      row.fills = [];

      const swatch = figma.createRectangle();
      swatch.name = 'Swatch';
      swatch.resize(32, 20);
      swatch.cornerRadius = 4;
      swatch.strokes = [{ type: 'SOLID', color: C.tableBorder }];
      swatch.strokeWeight = 1;
      swatch.strokeAlign = 'INSIDE';
      try {
        swatch.fills = [{ type: 'SOLID', color: hexToRgb(ct.colorHex) }];
      } catch (e) {
        swatch.fills = [{ type: 'SOLID', color: C.demoBg }];
      }
      row.appendChild(swatch);

      const tokenTxt = tx(ct.token || '', 13, true);
      tokenTxt.fills = [{ type: 'SOLID', color: C.bodyText }];
      row.appendChild(tokenTxt);

      const hexTxt = tx(ct.colorHex || '', 12, false);
      hexTxt.fills = [{ type: 'SOLID', color: C.mutedText }];
      row.appendChild(hexTxt);

      if (ct.desc) {
        const descTxt = tx(ct.desc, 12, false);
        descTxt.fills = [{ type: 'SOLID', color: C.mutedText }];
        row.appendChild(descTxt);
      }

      tokenList.appendChild(row);
    });

    sec.appendChild(tokenList);
    body.appendChild(sec);
  }

  // ─────────────────────────────────────────────
  // Section: 组件预览
  // ─────────────────────────────────────────────
  try {
    const compNode = figma.getNodeById(componentId);
    if (compNode && (compNode.type === 'COMPONENT' || compNode.type === 'COMPONENT_SET')) {
      const sec = makeSec('组件预览');

      const demoBlock = figma.createFrame();
      demoBlock.name = 'Demo';
      demoBlock.layoutMode = 'HORIZONTAL';
      demoBlock.primaryAxisSizingMode = 'AUTO';
      demoBlock.counterAxisSizingMode = 'AUTO';
      demoBlock.primaryAxisAlignItems = 'CENTER';
      demoBlock.counterAxisAlignItems = 'CENTER';
      demoBlock.paddingTop = 48;
      demoBlock.paddingBottom = 48;
      demoBlock.paddingLeft = 48;
      demoBlock.paddingRight = 48;
      demoBlock.itemSpacing = 24;
      demoBlock.cornerRadius = 8;
      demoBlock.fills = [{ type: 'SOLID', color: C.demoBg }];

      if (compNode.type === 'COMPONENT') {
        demoBlock.appendChild(makeInstanceColumn(compNode.createInstance(), compNode.name));
      } else if (compNode.type === 'COMPONENT_SET' && compNode.children && compNode.children.length > 0) {
        const toShow = compNode.children.slice(0, 6);
        toShow.forEach(child => {
          const rawName = child.name || '';
          const label = rawName.split(',').map(part => {
            const kv = part.trim().split('=');
            return kv.length === 2 ? kv[1].trim() : part.trim();
          }).join(' · ');
          demoBlock.appendChild(makeInstanceColumn(child.createInstance(), label));
        });
      }

      sec.appendChild(demoBlock);
      body.appendChild(sec);
    }
  } catch (e) {
    // Skip preview if component not found
  }

  // ─────────────────────────────────────────────
  // Section: 类型与用法
  // ─────────────────────────────────────────────
  if (specJson && specJson.variants && specJson.variants.length > 0) {
    const sec = makeSec('类型与用法');

    try {
      const n = figma.getNodeById(componentId);
      if (n && n.type === 'COMPONENT_SET' && n.children && n.children.length > 0) {
        const demoRow = figma.createFrame();
        demoRow.name = 'VariantsDemo';
        demoRow.layoutMode = 'HORIZONTAL';
        demoRow.primaryAxisSizingMode = 'AUTO';
        demoRow.counterAxisSizingMode = 'AUTO';
        demoRow.primaryAxisAlignItems = 'MIN';
        demoRow.counterAxisAlignItems = 'MIN';
        demoRow.layoutWrap = 'WRAP';
        demoRow.itemSpacing = 0;
        demoRow.counterAxisSpacing = 0;
        demoRow.paddingTop = 40;
        demoRow.paddingBottom = 40;
        demoRow.paddingLeft = 40;
        demoRow.paddingRight = 40;
        demoRow.cornerRadius = 8;
        demoRow.fills = [{ type: 'SOLID', color: C.demoBg }];
        n.children.slice(0, 12).forEach(child => {
          const rawName = child.name || '';
          const label = rawName.split(',').map(part => {
            const kv = part.trim().split('=');
            return kv.length === 2 ? kv[1].trim() : part.trim();
          }).join(' · ');
          demoRow.appendChild(makeInstanceColumn(child.createInstance(), label));
        });
        sec.appendChild(demoRow);
      }
    } catch (e) { /* 实例创建失败时跳过实例展示区 */ }

    const list = figma.createFrame();
    list.name = 'List';
    list.layoutMode = 'VERTICAL';
    list.primaryAxisSizingMode = 'AUTO';
    list.counterAxisSizingMode = 'FIXED';
    list.layoutAlign = 'STRETCH';
    list.itemSpacing = 24;
    list.fills = [];
    specJson.variants.forEach((v, i) => {
      const descParts = [v.description, v.usage ? '使用场景：' + v.usage : ''].filter(Boolean).join('\n');
      list.appendChild(makeListItem(i + 1, v.name || '', descParts || null));
    });
    sec.appendChild(list);
    body.appendChild(sec);
  }

  // ─────────────────────────────────────────────
  // Section: 交互说明
  // ─────────────────────────────────────────────
  if (specJson && specJson.interaction) {
    const sec = makeSec('交互说明');
    const inter = specJson.interaction;
    if (inter.states && !Array.isArray(inter.states)) inter.states = [inter.states];
    if (inter.behaviors && !Array.isArray(inter.behaviors)) inter.behaviors = [inter.behaviors];
    if (inter.edge_cases && !Array.isArray(inter.edge_cases)) inter.edge_cases = [inter.edge_cases];

    if (inter.states && inter.states.length > 0) {
      sec.appendChild(makeSubHeading('状态'));
      inter.states.forEach((s, i) => sec.appendChild(makeListItem(i + 1, s, null)));
    }
    if (inter.behaviors && inter.behaviors.length > 0) {
      sec.appendChild(makeSubHeading('行为'));
      inter.behaviors.forEach((b, i) => sec.appendChild(makeListItem(i + 1, b, null)));
    }
    if (inter.edge_cases && inter.edge_cases.length > 0) {
      sec.appendChild(makeSubHeading('边界条件'));
      inter.edge_cases.forEach((e, i) => sec.appendChild(makeListItem(i + 1, e, null)));
    }
    body.appendChild(sec);
  }

  // ─────────────────────────────────────────────
  // Section: 显示规则
  // ─────────────────────────────────────────────
  if (specJson && specJson.display_rules && specJson.display_rules.length > 0) {
    const sec = makeSec('显示规则');
    specJson.display_rules.forEach((r, i) => {
      sec.appendChild(makeListItem(i + 1, r.rule || '', r.desc || null));
    });
    body.appendChild(sec);
  }

  // ─────────────────────────────────────────────
  // Section: 内容规则
  // ─────────────────────────────────────────────
  if (specJson && specJson.content_rules && specJson.content_rules.length > 0) {
    const sec = makeSec('内容规则');

    const crHeaders = ['字段', '默认值', '显示规则', '截断处理'];
    const crDataRows = specJson.content_rules.map(r => [
      r.field || '',
      r.default || '—',
      r.display || '',
      r.truncation || '—'
    ]);
    const crWidths = calcSpecTableWidths(
      calcSpecTableWeights([crHeaders, ...crDataRows]),
      SPEC_TABLE_WIDTH
    );
    const crTable = await makeSpecTable('ContentRules Table', crHeaders, crDataRows, crWidths, thComp, tdComp);
    sec.appendChild(crTable);
    body.appendChild(sec);
  }

  figma.viewport.scrollAndZoomIntoView([frame]);
  return { frameName: frame.name };
}

// ── Helper: RGB to hex color ──
function rgbToHex(r, g, b, a) {
  const toHex = v => Math.round(v * 255).toString(16).padStart(2, '0');
  const hex = '#' + toHex(r) + toHex(g) + toHex(b);
  return (a !== undefined && a < 1) ? hex + toHex(a) : hex;
}

// ── Helper: Extract layer styles recursively ──
function extractLayerStyles(node, depth, maxDepth) {
  if (depth > maxDepth) return null;
  const r = { name: node.name, type: node.type };
  if ('width' in node) r.width = Math.round(node.width);
  if ('height' in node) r.height = Math.round(node.height);
  if ('cornerRadius' in node && node.cornerRadius !== 0) r.cornerRadius = node.cornerRadius;
  if ('fills' in node && Array.isArray(node.fills) && node.fills.length > 0) {
    r.fills = node.fills.filter(f => f.visible !== false).map(f => {
      if (f.type === 'SOLID') return { type: 'SOLID', hex: rgbToHex(f.color.r, f.color.g, f.color.b, f.opacity), opacity: f.opacity !== undefined ? f.opacity : 1 };
      if (f.type === 'IMAGE') return null;
      return { type: f.type };
    }).filter(Boolean);
  }
  if (node.children && node.children.length > 0) {
    r.children = node.children.map(c => extractLayerStyles(c, depth + 1, maxDepth)).filter(Boolean);
  }
  return r;
}

// ── Helper: Extract composition items (INSTANCE-type whitelist) ──
function extractCompositionItems(node) {
  const SKIP = /^(bg|background|spacer|mask|divider|separator|_|border|shadow|overlay)/i;
  const AUTO_NAME = /^(Frame|Group|Rectangle|Vector|Ellipse|Polygon|Star|Line|Arrow|Text|Image|Component|Path|Stroke)\s+\d+$/i;
  const source = (node.type === 'COMPONENT_SET')
    ? (node.defaultVariant || node.children[0])
    : node;
  if (!source || !source.children) return [];
  const items = [];
  function pushItem(child) {
    if (items.length >= 12) return;
    items.push({
      index: items.length + 1,
      name: child.name,
      x: Math.round(child.x),
      y: Math.round(child.y),
      w: Math.round(child.width),
      h: Math.round(child.height)
    });
  }
  function walk(n, depth) {
    if (depth > 2 || !n.children || items.length >= 12) return;
    for (const child of n.children) {
      if (child.type === 'INSTANCE' && !SKIP.test(child.name)) {
        pushItem(child);
      } else if (child.type === 'TEXT' && depth <= 1 && !SKIP.test(child.name) && !AUTO_NAME.test(child.name)) {
        pushItem(child);
      } else if (child.children) {
        walk(child, depth + 1);
      }
    }
  }
  walk(source, 0);
  return items;
}

// 在主消息处理函数中添加新的消息类型处理
figma.ui.onmessage = async (msg) => {
  debug(`收到消息: ${msg.type}`);
  
  switch (msg.type) {
    case "ui-ready":
      debug("UI 已就绪");
      figma.ui.postMessage({ type: "init-complete" });
      break;
      
    case "check-icons":
      debug("开始检查图标");
      await checkIconRules();
      break;
      
    case "fix-fill-rule":
      debug("打开填充规则编辑器");
      openFillRuleEditor();
      break;
      
    case "fix-constraints":
      debug("开始修复约束");
      await fixConstraints();
      break;
      
    case "fix-name":
      debug("开始修复命名");
      await fixName(msg.newName);
      break;
      
    case "select-node":
      debug("选中并定位到图标");
      const node = figma.getNodeById(msg.nodeId);
      if (node) {
        // 清除当前选中
        figma.currentPage.selection = [];
        // 选中目标节点
        figma.currentPage.selection = [node];
        // 将视图中心定位到该节点
        figma.viewport.scrollAndZoomIntoView([node]);
      }
      break;
      
    case "fix-vector-names":
      debug("开始修复 Vector 图层命名");
      await fixVectorNames();
      break;
      
    case "open-fill-rule-editor":
      figma.openExternal('https://www.figma.com/c/plugin/771155994770327940');
      break;
      
    case "confirm-fix-fill-rule":
      debug("用户确认继续修复填充规则");
      if (msg.confirmed) {
        await doFixFillRule();
      } else {
        figma.openExternal('https://www.figma.com/c/plugin/771155994770327940');
      }
      break;
      
    case "outline":
      debug("开始轮廓化处理");
      await outlineAndFlatten();
      break;
      
    case "fix-vector-paths":
      debug("开始修复 Vector 图层的多路径问题");
      await fixVectorPaths();
      break;
      
    case "fix-all":
      debug("一键修复所有问题");
      await fixAll(msg.nodeIds, msg.renames);
      break;

    case "get-node-images":
      debug("导出节点图片");
      await getNodeImages(msg.nodeIds);
      break;

    case "generate-description":
      debug("开始生成描述");
      await generateDescription();
      break;
      
    case "update-description":
      debug("更新描述");
      updateDescription(msg.description, msg.nodeId);
      break;
      
    case "update-vector-paths":
       // 处理来自填充规则编辑器的更新
       const vectorNode = figma.getNodeById(msg.nodeId);
       if (vectorNode && vectorNode.type === "VECTOR") {
         vectorNode.vectorPaths = msg.vectorPaths;
         figma.notify("填充规则已更新");
         checkIconRules();
       }
       break;
       
      case "apply-fill-rules":
        // 处理填充规则应用
        const targetNode = figma.getNodeById(msg.nodeId);
        if (targetNode && targetNode.type === "VECTOR") {
          try {
            validateVectorNetwork(msg.vectorNetwork);
            targetNode.vectorNetwork = msg.vectorNetwork;
            figma.notify("填充规则已应用");
            checkIconRules();
          } catch (error) {
            figma.notify(`应用填充规则失败: ${error.message}`);
          }
        }
        break;

      case "get-api-payload":
        try {
          const payload = await figma.clientStorage.getAsync('encrypted_api_key_v1');
          figma.ui.postMessage({ type: 'api-payload', payload });
        } catch (error) {
          figma.ui.postMessage({ type: 'api-payload', payload: undefined });
        }
        break;

      case "set-api-payload":
        try {
          await figma.clientStorage.setAsync('encrypted_api_key_v1', msg.payload);
          figma.ui.postMessage({ type: 'api-set-result', ok: true });
        } catch (error) {
          figma.ui.postMessage({ type: 'api-set-result', ok: false, error: String(error && error.message || error) });
        }
        break;

      case "delete-api-payload":
        try {
          await figma.clientStorage.deleteAsync('encrypted_api_key_v1');
          figma.ui.postMessage({ type: 'api-delete-result', ok: true });
        } catch (error) {
          figma.ui.postMessage({ type: 'api-delete-result', ok: false, error: String(error && error.message || error) });
        }
        break;

      case "get-raw-key-material":
        try {
          const b64 = await figma.clientStorage.getAsync('LOCAL_KEY_MATERIAL_V1');
          figma.ui.postMessage({ type: 'raw-key', b64 });
        } catch (error) {
          figma.ui.postMessage({ type: 'raw-key', b64: undefined });
        }
        break;

      case "set-raw-key-material":
        try {
          await figma.clientStorage.setAsync('LOCAL_KEY_MATERIAL_V1', msg.b64);
          figma.ui.postMessage({ type: 'raw-key-set', ok: true });
        } catch (error) {
          figma.ui.postMessage({ type: 'raw-key-set', ok: false, error: String(error && error.message || error) });
        }
        break;

    case 'kb-get-index':
      try {
        const kbIdx = await figma.clientStorage.getAsync('kb_index');
        figma.ui.postMessage({ type: 'kb-index', index: kbIdx || [] });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-index', index: [] });
      }
      break;

    case 'kb-set-index':
      try {
        await figma.clientStorage.setAsync('kb_index', msg.index);
        figma.ui.postMessage({ type: 'kb-index-set', ok: true });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-index-set', ok: false, error: String(e.message || e) });
      }
      break;

    case 'kb-get-chunk':
      try {
        const chunkVal = await figma.clientStorage.getAsync('kb_chunk_' + msg.key);
        figma.ui.postMessage({ type: 'kb-chunk', key: msg.key, value: chunkVal });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-chunk', key: msg.key, value: null });
      }
      break;

    case 'kb-set-chunk':
      try {
        await figma.clientStorage.setAsync('kb_chunk_' + msg.key, msg.value);
        figma.ui.postMessage({ type: 'kb-chunk-set', key: msg.key, ok: true });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-chunk-set', key: msg.key, ok: false, error: String(e.message || e) });
      }
      break;

    case 'kb-delete-file': {
      try {
        const safeKbKey = msg.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        for (let ci = 0; ci < msg.chunks; ci++) {
          await figma.clientStorage.deleteAsync('kb_chunk_' + safeKbKey + '_' + ci);
          await figma.clientStorage.deleteAsync('kb_vec_' + safeKbKey + '_' + ci);
        }
        figma.ui.postMessage({ type: 'kb-delete-result', name: msg.name, ok: true });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-delete-result', name: msg.name, ok: false, error: String(e.message || e) });
      }
      break;
    }

    case 'kb-clear-all': {
      try {
        const kbIdxAll = await figma.clientStorage.getAsync('kb_index') || [];
        for (const entry of kbIdxAll) {
          const safeKey = entry.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          for (let ci = 0; ci < entry.chunks; ci++) {
            await figma.clientStorage.deleteAsync('kb_chunk_' + safeKey + '_' + ci);
            await figma.clientStorage.deleteAsync('kb_vec_' + safeKey + '_' + ci);
          }
        }
        await figma.clientStorage.deleteAsync('kb_index');
        figma.ui.postMessage({ type: 'kb-clear-result', ok: true });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-clear-result', ok: false, error: String(e.message || e) });
      }
      break;
    }

    case 'kb-get-vec':
      try {
        const vecVal = await figma.clientStorage.getAsync('kb_vec_' + msg.key);
        figma.ui.postMessage({ type: 'kb-vec', key: msg.key, value: vecVal });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-vec', key: msg.key, value: null });
      }
      break;

    case 'kb-set-vec':
      try {
        await figma.clientStorage.setAsync('kb_vec_' + msg.key, msg.value);
        figma.ui.postMessage({ type: 'kb-vec-set', key: msg.key, ok: true });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-vec-set', key: msg.key, ok: false });
      }
      break;

    case 'kb-delete-vec':
      try {
        await figma.clientStorage.deleteAsync('kb_vec_' + msg.key);
        figma.ui.postMessage({ type: 'kb-vec-deleted', key: msg.key, ok: true });
      } catch (e) {
        figma.ui.postMessage({ type: 'kb-vec-deleted', key: msg.key, ok: false });
      }
      break;

    case 'get-component-info': {
      readAndPostComponentInfo(msg.source || 'manual');
      break;
    }

    case 'create-spec-frame': {
      try {
        const specResult = await createSpecFrame(msg.specJson, msg.componentId, msg.componentName, msg.preComposition || null);
        figma.ui.postMessage({ type: 'spec-frame-created', ok: true, frameName: specResult.frameName });
      } catch (e) {
        figma.ui.postMessage({ type: 'spec-frame-created', ok: false, error: String(e.message || e) });
      }
    }
  }
};

async function readAndPostComponentInfo(source) {
  try {
    const sel = figma.currentPage.selection;
    if (!sel || sel.length === 0) {
      figma.ui.postMessage({ type: 'component-info', error: '未选中任何节点', source });
      return;
    }
    const compNode = sel[0];
    if (compNode.type !== 'COMPONENT' && compNode.type !== 'COMPONENT_SET') {
      figma.ui.postMessage({ type: 'component-info', error: '请选中一个组件（Component 或 Component Set）', source });
      return;
    }
    const compProps = compNode.componentPropertyDefinitions
      ? Object.entries(compNode.componentPropertyDefinitions).map(([key, def]) => ({
          name: key,
          type: def.type,
          defaultValue: String(def.defaultValue !== undefined ? def.defaultValue : ''),
          variantOptions: def.variantOptions || []
        }))
      : [];
    const compVariants = (compNode.type === 'COMPONENT_SET' && compNode.children)
      ? compNode.children.map(c => ({ name: c.name, id: c.id }))
      : [];

    // 截图仅在手动请求或生成规范时导出，避免每次选中变化都做耗时的图像导出
    let screenshotB64 = null;
    let componentRenderB64 = null;
    if (source === 'manual' || source === 'spec-generate') {
      try {
        const bytes = await compNode.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
        const encoded = figma.base64Encode(bytes);
        const safe = encoded.length <= 1400000 ? encoded : null;
        if (source === 'manual') screenshotB64 = safe;
        else componentRenderB64 = safe;
      } catch (e) { /* ignore export errors */ }
    }

    figma.ui.postMessage({
      type: 'component-info',
      source,
      data: {
        id: compNode.id,
        name: compNode.name,
        description: compNode.description || '',
        props: compProps,
        variants: compVariants,
        layers: extractLayerStyles(compNode, 0, 3),
        composition: extractCompositionItems(compNode),
        screenshot: screenshotB64,
        componentRender: componentRenderB64
      }
    });
  } catch (e) {
    figma.ui.postMessage({ type: 'component-info', error: String(e.message || e), source });
  }
}

figma.on('selectionchange', () => readAndPostComponentInfo('selectionchange'));

// 数据验证函数
function validateVectorNetwork(vectorNetwork) {
  if (!vectorNetwork || typeof vectorNetwork !== 'object') {
    throw new Error('vectorNetwork must be an object');
  }
  if (!Array.isArray(vectorNetwork.vertices)) {
    throw new Error('vectorNetwork.vertices must be an array');
  }
  if (!Array.isArray(vectorNetwork.segments)) {
    throw new Error('vectorNetwork.segments must be an array');
  }
  if (!Array.isArray(vectorNetwork.regions)) {
    throw new Error('vectorNetwork.regions must be an array');
  }
  // 更多验证逻辑可以在这里添加
}

function validateVectorPaths(vectorPaths) {
  if (!Array.isArray(vectorPaths)) {
    throw new Error('vectorPaths must be an array');
  }
  // 更多验证逻辑可以在这里添加
}
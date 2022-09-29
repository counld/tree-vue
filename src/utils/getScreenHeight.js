/**
 * 判断元素是否进入可视区域
 */
 export const isElementInViewport = el => {
  if (typeof el.getBoundingClientRect !== 'function') {
    return true
  }

  const clientHeight = _getClientHeight()
  const rect = el.getBoundingClientRect()
  return rect.top < clientHeight
}

// 获取视口高度
const _getClientHeight = () => {
  const dClientHeight = document.documentElement.clientHeight
  const bodyClientHeight = document.body.clientHeight
  let clientHeight = 0

  if (bodyClientHeight && dClientHeight) {
    clientHeight = bodyClientHeight < dClientHeight ? bodyClientHeight : dClientHeight
  } else {
    clientHeight = bodyClientHeight > dClientHeight ? bodyClientHeight : dClientHeight
  }

  return clientHeight
}

// 获取视口宽度
export const _getClientWidth = () => {
  const dClientWidth = document.documentElement.clientWidth
  const bodyClientWidth = document.body.clientWidth
  let clientWidth = 0

  if (bodyClientWidth && dClientWidth) {
    clientWidth = bodyClientWidth < dClientWidth ? bodyClientWidth : dClientWidth
  } else {
    clientWidth = bodyClientWidth > dClientWidth ? bodyClientWidth : dClientWidth
  }

  return clientWidth
}


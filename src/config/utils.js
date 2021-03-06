/*
存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return
	if (typeof content !== 'string') {
		content = JSON.stringify(content)
	}
	if (window.localStorage) {
		window.localStorage.setItem(name, content)
	}
}

/*
获取localStorage
 */
export const getStore = name => {
	if (!name) return
	if (window.localStorage) {
		window.localStorage.getItem(name)
	}
}

/*
删除localStorage
 */
export const removeStore = name => {
	if (!name) return
	window.localStorage.removeItem(name)
}
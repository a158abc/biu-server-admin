/**
 * 返回数据实体对象
 */
module.exports = {
    /**
     * 状态码
     */
    CODE: {
        SUCCESS: 200, //成功
        OTHER: 204, //其它状态
        FAILED: 400, //操作失败
        AUTHORITIES: 401, //身份验证失败
        NO_AUTHORITY: 403 //无权限
    },

    /**
     * 返回提示
     */
    MESSAGE: {
        SUCCESS: `SUCCESS!`,
        FAILED: `操作失败!`,
        PARAMS_LACK: `参数不齐!`,
        AUTHORITIES: `登陆失效或身份过期!`, //身份验证失败
        NO_AUTHORITY: `无权访问!` //无权限
    },

    /**
     * 返回成功结果
     */
    success(msg, data) {
        return {
            code: this.CODE.SUCCESS,
            data,
            msg: msg || this.MESSAGE.SUCCESS
        };
    },

    /**
     * 请求操作失败
     */
    failed(msg, code, data) {
        return {
            data,
            msg: msg || this.MESSAGE.FAILED,
            code: code || this.CODE.FAILED
        };
    },

    /**
     * 参数不齐
     * @param {*} msg
     * @param {*} code
     * @param {*} data
     */
    paramsLack(msg, code, data) {
        return {
            code: code || this.CODE.FAILED,
            data,
            msg: msg || this.MESSAGE.PARAMS_LACK
        };
    },

    /**
     * 身份过期
     * @param {*} msg
     * @param {*} code
     * @param {*} data
     */
    authorities(msg, code, data) {
        return {
            code: code || this.CODE.AUTHORITIES,
            data,
            msg: msg || this.MESSAGE.AUTHORITIES
        };
    },

    /**
     * 无权访问
     * @param {*} msg
     * @param {*} code
     * @param {*} data
     */
    noAuthority(msg, code, data) {
        return {
            data,
            code: code || this.CODE.NO_AUTHORITY,
            msg: msg || this.MESSAGE.NO_AUTHORITY
        };
    },

    /**
     * 带分页的数据对象
     * @param {*} msg
     * @param {*} code
     * @param {*} data
     * @param {*} total
     * @param {*} page
     * @param {*} limit
     */
    pageData(msg, code, data, total, page, limit) {
        return {
            code: code || this.CODE.SUCCESS,
            data,
            total,
            page,
            limit,
            msg: msg || this.MESSAGE.SUCCESS
        };
    },

    /**
     * 代码分页(非数据库分页)
     * @param {*} msg
     * @param {*} code
     * @param {*} data 数据列表
     * @param {*} page 当前页
     * @param {*} limit 每页大小
     */
    totalPageData(msg, code, data, page, limit) {
        let result = {
            code: code || this.CODE.SUCCESS,
            data: [],
            limit,
            page,
            total: 0,
            msg: msg || this.MESSAGE.SUCCESS
        };

        //分页
        if (data && limit && page) {
            if (data && data.length > 0) {
                //索引
                let index = (page - 1) * limit;
                for (let i = index; i < page * limit; i++) {
                    if (data[i]) result.data.push(data[i]);
                }
            }
            //总大小
            result.total = data.length;
        } else {
            result.data = data;
        }
        return result;
    }
};

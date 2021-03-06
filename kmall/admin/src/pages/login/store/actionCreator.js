/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import * as types from './actionTypes.js';
import { message } from 'antd';
import { request,setUserName } from 'util';
import { ADMIN_LOGIN } from 'api';


const getLoginRequestAction = ()=>{
	return {
		type:types.LOGIN_REQUEST
	}
}

const getLoginDonetAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
}

export const getLoginAction = (values)=>{
	return (dispatch)=>{
		dispatch(getLoginRequestAction());
		request({
			method:'post',
			url:ADMIN_LOGIN,
			data:values
		})
		.then(result=>{
			if(result.code == 0){//登录成功
				//把用户名保存到本地
				setUserName(result.data.username);
				//跳转后台首页
				window.location.href = '/';
			}else if(result.code == 1){
				message.error(result.message);
			}
		})
		.catch(err=>{
			message.error('网络请求失败,请稍后再试');
		})
		.finally(()=>{
			dispatch(getLoginDonetAction());
		})
	}
}



import commonApi from '../cmmon';


//请求上传视频列表
export function queryAdminsVideo(data) {
	return commonApi.call(this,'post', '/api/admins/adminsVideo',data);
}

//获取视频列表
export function queryAdminsVideoList(nums) {
	return commonApi.call(this,'get', '/api/admins/adminsVideoList', { nums});
}

// 获取热门视频列表
export function queryAdminsHotsVideoList(nums) {
	return commonApi.call(this, 'get', '/api/admins/adminsHotVideoList', { nums })
}
//删除数据库视频数据
export function removeAdminsVideo(id) {
	return commonApi.call(this, 'delete', '/api/admins/removeAdminsVideo', {id});
}

// 删除数据库本地视频
export function deleteSynsVideo(videoId) {
	return commonApi.call(this, 'delete', '/api/deleteSynsVideo', { videoId });
}

// 更新视频文案
export function uploadVideoComment(videoObj) {
	return commonApi.call(this, 'put', '/api/admins/uploadVideo', videoObj);
}
<template>
	<div class="home-top">
		<el-row class="block-col-2">
				<el-col :span="12">
					<span class="demonstration">这是首页,真的可以在添加很多内容了</span>
				</el-col>
				<el-col :span="12">
					<el-dropdown @command="handleExit">
						<span class="el-dropdown-link">
							用户中心<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item icon="el-icon-plus" command="admit">{{username}}</el-dropdown-item>
							<el-dropdown-item icon="el-icon-circle-plus" command="exit">退出</el-dropdown-item>
							<el-dropdown-item icon="el-icon-circle-plus-outline" command="accout">account</el-dropdown-item>
							<el-dropdown-item icon="el-icon-check" command="help">help</el-dropdown-item>
							<el-dropdown-item icon="el-icon-circle-check" command="setting">setting</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
		<!-- 轮播图片 -->
			<span class="demonstration">默认 Hover 指示器触发</span>
    <el-carousel type="card">
      <el-carousel-item v-for="item in swipper" :key="item.id">
				<!-- <image :src="item.thumbnail" class="home_image"/> 以为使用了v-if做判断，导致不能更新 -->
				<el-image :src="item.thumbnail" >
					<div slot="placeholder" class="image-slot">
					加载中<span class="dot">...</span>
				</div>
				</el-image>
      </el-carousel-item>
    </el-carousel>
		<el-row>
			<el-button type="primary" @click="handleSend">发送请求</el-button>
			<el-button type="success">主要按钮</el-button>
		</el-row>
		<div>{{message}}</div>
		<div v-if="visible">
			<div v-for="item in list" :key="item.id" class="list-title">
				<h3>{{item.title}}</h3>
				<div v-html="item.content"></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import { queryApiList, queryApiSwipper } from '../../utils/queryApi';
import { parseDom } from '../../utils/format';

export default {
	name: 'home',
	data() {
		return  {
		visible: false,
		message: '这是mysql连接的数据',
		list: [],
		swipper: [],
		username: localStorage.getItem('username') || '',
	}
	},
	created() {
	},
	mounted() {
		this.getSwipper();
		if(this.username == '') {
			this.$message({
				showClose: true,
				message: `欢迎${this.$route.params.username}您的到来`,
				type: 'success'
			})
			this.username = this.$route.params.username;
			localStorage.setItem("username", this.username)
		}
	}
	,
	methods: {
		handleSend() {
			queryApiList.call(this)
			 .then((response) => {
        if (response.status == 200 && response.data != "失败") {
					this.visible = true;
         this.list = response.data
        } else {
         	this.$message({
						showClose: true,
						content: '提交失败,请刷新页面并重新提交',
						type: 'error',
						offset: 100
					})
        }
      })
      .catch((error) => {
        console.log(error,'error')
      });

		},
		getSwipper() {
			queryApiSwipper.call(this)
			.then(res => {
				this.swipper = res.data;
		})
		},
		parseDom(ele) {
			console.log(parseDom(ele)[0],'ele');
			return parseDom(ele)[0]
		},
		handleExit(command) {
			if(command === 'exit'){
				localStorage.removeItem('token')
				localStorage.removeItem('username')
				window.location.reload() 
				// this.$router.go(0);
				this.$message('click on item ' + command);
			}
		}
	},

	computed: { 
		thumbnailSlice(src) {
			return src.indexOf
		}
	}
}
</script>

<style scoped>
.home-top {
	padding-top: 10px;
}
.el-carousel {
	padding: 4px;
}
.list-title {
	color: #232333;
	font-size: 18px
}
.list-title::v-deep .markdown-toc-list {
	display: flex;
	justify-content: space-evenly;
}
.list-title::v-deep .markdown-toc-list li {
	padding: 4px;
}
.list-title::v-deep div {
	text-align: left;
}

 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

</style>
// 首页分配
<template>
  <div class="app-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard,
  //  editorDashboard
    },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // 这里是看vuex有无登陆 切换 不同的登陆首页
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>

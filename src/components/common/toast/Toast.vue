<template>
    <div id="toast">
      <div v-show="isShow">{{message}}</div>
    </div>
</template>

<script>
	export default {
		name: "Toast",
    // props: {
		//   message: {
		//     type: String,
    //     default: ''
    //   },
    //   show:{
    //     type:Boolean,
    //     default:false
    //   }
    // },
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,duration=1500){
        this.message=message
        this.isShow=true
        setTimeout(()=>{
          this.isShow=false
          this.message=''
        },duration)
      }
    }
    
	}
</script>

<style scoped>
#toast{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,.8);
    color: #fff;
    text-align: center;
    line-height: 35px;
    padding: 0 10px;
    border-radius: 10px;
    z-index: 999;

}
</style>

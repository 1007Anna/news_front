<script>
export default {
    props: ["newsList"],
    data() {
        return {
        }
    },
    methods: {
        // 轉址
        switchURL(title, content, name, updateTime) {
            this.$router.push({
                name: 'news',
                params: { 
                    title: title,
                    content: content,
                    name: name,
                    updateTime: updateTime
                }
            })
        },
    },
    mounted() {
    console.log(this.newsList);
  }

    
}
</script>
<template>
    <div class="d-flex flex-column m-auto my-4"
    style="height: 15%;width: 70%;background-color: #eedad0;" 
    v-for="item in newsList"
    :key="item.newsID"
    :value="item.newsID">
        
        <div class="d-flex justify-content-between"
        @click="switchURL(item.title, item.content, item.name, item.updateTime)">
            <div class="ms-4 my-auto" 
            style="width: 20%; color: rgb(95, 61, 7);">
                {{ item.update_time }}
            </div>
            <div class="my-2 border-start border-secondary border-2 px-4" 
            style="width: 80%;color: rgb(95, 61, 7);">
                <div> 
                    {{ item.category_name }}&nbsp;>&nbsp;{{ item.sub_category_name }}
                </div>
                {{ item.title }}
            </div>
        </div>
    </div>




</template>

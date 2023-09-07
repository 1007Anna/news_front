<script>
export default {
    data() {
        return {
            title: "最新消息",
            newsList: [],
        }
    },
    methods: {
		getHotNews(){
            fetch('http://localhost:8080/searchHotNews')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.newsList = data.newsList
                console.log(this.newsList)
                if(data.message !== undefined){
                    alert(data.message)
                }
            })
        },
  	},
	mounted() {
        this.getHotNews()
    },
};
</script>
<template>
    <div class="mx-8 fs-2" style="width: 60%;">
        {{ title }}
    </div>
    <div class="d-flex justify-content-center">
        <hr width="90%" align="center" class="border border-secondary border-2" />
        <br />
    </div>

    <div class="d-flex flex-column m-auto my-4"
    style="height: 15%;width: 70%;background-color: rgb(232, 227, 222);" 
    v-for="item in newsList"
    :key="item.newsID"
    :value="item.newsID">
        
        <div class="d-flex justify-content-between">
            <div class="mx-4 my-auto border-end border-secondary border-2" 
            style="width: 20%; color: rgb(95, 61, 7);">
                {{ item.update_time }}
            </div>
            <div class="my-2" style="width: 80%;color: rgb(95, 61, 7);">
                <div>
                    <div> 
                        {{ item.category_name }}&nbsp;>&nbsp;{{ item.sub_category_name }}
                    </div>
                </div>
                {{ item.title }}
            </div>
        </div>
    </div>
    
</template>

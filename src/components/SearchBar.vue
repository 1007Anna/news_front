<script>
export default {
    // props: ["newsList"],
    data() {
        return {
            keyword: null,
            startDay: null,
            endDay: null,
            newsList: [],
        }
    },
    methods: {
        searchNews(){
            let body = {
                "keyword": this.keyword,
                "startDay": this.startDay,
                "endDay": this.endDay
            }
            fetch('http://localhost:8080/searchNews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.newsList = data.newsList
                // 將值傳到HomeView
                this.$emit('searchNewsList',this.newsList)
                console.log(data)
                if(data.message !== undefined){
                    alert(data.message)
                }
            })
        },       
        
    },
    mounted() {

    },
    
}
</script>
<template>
    <div class="d-flex m-auto mt-5" style="width: 80%;">      
        <div class="input-group flex-nowrap me-3">
            <span class="input-group-text" 
            style="background-color: rgb(246, 224, 202);">
                標題
            </span>
            <input v-model="keyword" type="text" class="form-control" placeholder="keyword">
        </div>
        <div class="input-group flex-nowrap ">
            <span class="input-group-text"
            style="background-color: rgb(246, 224, 202);">
                發布時間
            </span>
            <input v-model="startDay" type="date" class="form-control" placeholder="Date">
        </div>
        <div class="input-group flex-nowrap ms-2">
            <input v-model="endDay" type="date" class="form-control" placeholder="Date">
        </div>
        <div class="ms-2">
            <button type="button" class="btn text-white" 
            style="background-color: rgb(232, 176, 107);"
            @:click="searchNews">
                Search
            </button>     
        </div>   
    </div>

</template>
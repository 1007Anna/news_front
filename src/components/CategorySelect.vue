<script>
export default {
    data() {
        return {
            categoryList: [
                {
                    categoryName: null,
                    subCategoryList: []
                },       
            ],
            newsList: [],
        }
    },
    methods: {
        getSubCategory(){
            fetch('http://localhost:8080/getAllSubCategory')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.categoryList = data
            })
        },       
        showSubcategory(index) {
            this.categoryList[index].showSubcategory = true;
        },
        hideSubcategory(index) {
            this.categoryList[index].showSubcategory = false;
        },
        getAllNewsBySubCategoryName(subCategory){
            let body = {
                "subCategoryName": subCategory,
            }
            fetch('http://localhost:8080/getAllNewsBySubCategoryName', {
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
                if(data.message !== undefined){
                    alert(data.message)
                }
                this.newsList = data.resList
                console.log(this.newsList);
                // 將值傳到HomeView
                this.$emit('NewsListBySubCategory',this.newsList)
            })
        },
    },
    mounted() {
        this.getSubCategory()
    },
}
</script>
<template>
    <div class="d-flex justify-content-center">
        <div v-for="(category,index) in categoryList" :key="index" class="py-2 px-4"
        style="background-color: rgb(232, 227, 222);"
        @mouseover="showSubcategory(index)"
        @mouseleave="hideSubcategory(index)"
        >
            <h5>{{ category.categoryName }}</h5>
            <div v-if="category.showSubcategory">
                <div v-for="subCategory in category.subCategoryList" 
                :key="subCategory" 
                @click="getAllNewsBySubCategoryName(subCategory)">                   
                    {{ subCategory }}              
                </div>
            </div>
        </div>
    </div>
 
</template>
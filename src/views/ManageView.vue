<script>
import ModalView from '../components/Modal.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
    components: {
        ModalView,
        SearchBar,
    },
    data() {
        return {
            newsList: [],
            // 刪除視窗
            delectModal: false,
            // 修改視窗
            reviseModal: false,
            title: null,
            content: null,
            newsID: null,
            subCategoryID: null,
            // 主分類select
            selectedCategory: null,
            // 子分類select
            selectedSubCategory: null,
            // getAllSubCategory()的data格式
            categoryList: [
                {
                    categoryName: null,
                    subCategoryNameMap: {}
                },       
            ],
            selectedSubCategory: null,
        
        }
    },
    methods: {
        getAllNewsByAccount(){
            fetch('http://localhost:8080/searchAllNewsByAccount', {
                // 連結後端跟前端的session(GET方法的配置)
                credentials: 'include' 
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.newsList = data.resList
                console.log(this.newsList)
                if(data.message !== undefined){
                    alert(data.message)
                }
            })
        },
        deleteNews(){
            this.delectModal = !this.delectModal
            let body = {
                "newsID": this.newsID
            }
            fetch('http://localhost:8080/deleteNews', {
                method: 'POST',
                // 連結後端跟前端的session
                credentials: 'include',
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
                console.log(news_id);
            })
        }, 
        eidtNews(){
            this.reviseModal = !this.reviseModal
            let body = {
                "newsID": this.newsID,
                "subCategoryID": this.selectedSubCategory,
                "title": this.title,
                "content": this.content
            }
            fetch('http://localhost:8080/eidtNews', {
                method: 'POST',
                // 連結後端跟前端的session
                credentials: 'include',
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
            })
        },
        updatedNewsList(updatedNewsList) {
            this.newsList = updatedNewsList;
        },
        delectSwitch(news_id) {
            this.newsID = news_id
            this.delectModal = !this.delectModal
        },
        reviseSwitch(news_id) {
            this.newsID = news_id
            this.reviseModal = !this.reviseModal
        },
        getAllSubCategory(){
            fetch('http://localhost:8080/getAllSubCategoryId')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.categoryList = data;

            })
        },
        
    },
    mounted() {
        this.getAllNewsByAccount()
        this.getAllSubCategory()
    },
    computed: {
        SubCategoryNameMapValue() {
            if (this.selectedCategory) {
                const selectedCategoryObj = this.categoryList.find(
                    (category) => category.categoryName === this.selectedCategory
                );
                return selectedCategoryObj.subCategoryNameMap;
            } else {
                return {};
            }
        },
    }
}
</script>
<template>
    <SearchBar @searchNewsList="updatedNewsList"/>

    <!-- NewsSelect -->
    <div class="d-flex flex-column m-auto my-4"
    style="height: 15%;width: 70%;background-color: #e0dbd9;" 
    v-for="item in newsList"
    :key="item.news_id"
    :value="item.news_id">
        <div class="d-flex justify-content-between">
            <div class="mx-4 my-auto py-3 border-end border-secondary border-2" 
            style="width: 20%; color: rgb(95, 61, 7);">
                {{ item.update_time }}
            </div>
            <div class="my-2 py-1 border-end border-secondary border-2" 
            style="width: 50%;color: rgb(95, 61, 7);">
                <div>
                    <div> 
                        {{ item.category_name }}&nbsp;>&nbsp;{{ item.sub_category_name }}
                    </div>
                </div>
                {{ item.title }}
            </div>
            <div class=" btn-group-sm my-auto mx-2"
            style="width: 20%;">
                <button type="button" class="btn text-white h-50 ms-3 me-3"
                style="background-color: rgb(230, 202, 168);"
                @click="reviseSwitch(item.news_id)">
                    編輯
                </button>
                <button type="button" class="btn text-white h-50 me-2"
                style="background-color: rgb(232, 102, 66);"
                @click="delectSwitch(item.news_id)">
                    刪除
                </button>
            </div>
        </div>
    </div>
    <!-- 刪除視窗 -->
    <ModalView v-if="delectModal" @close="delectSwitch()">
        <div style="height: 150px; width: 350px">
            <h4 class="text-center mt-5">確定刪除此文章嗎？</h4>
            <div class="d-flex justify-content-center">
                <button type="button" @click="deleteNews()"
                class="btn btn-danger px-5 fw-bolder text-white mt-5">
                    刪除
                </button>
            </div>
        </div>
    </ModalView>
    <!-- 修改視窗 -->
    <ModalView v-if="reviseModal" @close="reviseSwitch()">
        <div class="d-flex flex-column justify-content-center"
        style="height: 120%; width: 600px;">
            <div class="d-flex flex-column justify-content-center mx-5">
                <div class="d-flex">
                    <select v-model="selectedCategory"
                    class="input-group flex-nowrap form-select col me-3"
                    aria-label="Default select example">
                        <option v-for="(category,index) in categoryList" :key="index">
                            {{ category.categoryName }}
                        </option>
                    </select>
    
                    <select v-if="selectedCategory" v-model="selectedSubCategory"
                    class="input-group flex-nowrap form-select col ms-3"
                    aria-label="Default select example">
                        <option v-for="(value,subCategory) in SubCategoryNameMapValue" 
                        :key="value" :value="value">
                            {{ subCategory }}
                        </option>
                    </select>
                </div>
                <div class="input-group flex-nowrap my-4">
                    <span class="input-group-text">標題</span>
                    <input v-model="title" type="text" class="form-control">
                </div>
                <div class="input-group flex-nowrap card text-center">
                    <div class="card-header">
                        內文
                    </div>
                    <div class="card-body" >
                        <textarea v-model="content" class="form-control" rows="10">
                        </textarea>
                    </div>
                </div>    
            </div>
            <div class="d-flex justify-content-center my-4">
                <button type="button" class="btn btn-secondary"
                @click="eidtNews()">
                    修改
                </button>
            </div>
        </div> 
    </ModalView>

</template>
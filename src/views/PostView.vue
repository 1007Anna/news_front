<script>
export default {
    data() {
        return {
            title: null,
            content: null,
            selectedCategory: null,
            selectedSubCategory: null,
            categoryList: [
                {
                    categoryName: null,
                    subCategoryNameMap: {}
                },       
            ],
            categoryText: null,
            subCategoryText: null,
          
        }
    },
    methods: {
        addNews(){
            let body = {
                "subCategoryID": this.selectedSubCategory,
                "title": this.title,
                "content": this.content
            }
            fetch('http://localhost:8080/addNews', {
                // 連結後端跟前端的session
                credentials: 'include',
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
                console.log(data)
                if(data.message !== undefined){
                    alert(data.message)
                }
                location.reload();
            })
        },
        getAllSubCategory(){
            fetch('http://localhost:8080/getAllSubCategoryId')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.categoryList = data;
                this.categoryList.push({
                    categoryName: "新增主分類",
                    
                })
                // 儲存原本"categoryList[0]"的值
                var categoryIndex0 = this.categoryList[0]; 
                // 將this.categoryList[6]的值代入this.categoryList[0]
                this.categoryList[0] = this.categoryList[6]; 
                // 將categoryIndex0代入this.categoryList[6]
                this.categoryList[6] = categoryIndex0;
            })           
        },
        addCategory(){
            let body = {
                "categoryName": this.categoryText
            }
            fetch('http://localhost:8080/addCategory', {
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
        addSubCategory(){
            let body = {
                "categoryID":1,
                "subCategoryName": this.subCategoryText
            }
            fetch('http://localhost:8080/addSubCategory', {
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
    },
    mounted() {
        this.getAllSubCategory()
    },
    computed: {
        subCategoryNameMapKey() {
            if (this.selectedCategory) {
                const selectedCategoryObj = this.categoryList.find(
                    (category) => category.categoryName === this.selectedCategory
                );
                return Object.keys(selectedCategoryObj.subCategoryNameMap);
            } else {
                return [];
            }
        },
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
    },
    
}
</script>

<template>
                {{ categoryList }}<br>{{ selectedCategory }}{{ selectedSubCategory }}
    
    <div class="d-flex justify-content-center my-5">
        <div class="d-flex flex-column justify-content-center col-8">
            <div class="d-flex justify-content-center mb-3">   
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
                    <option >新增子分類</option>
                    <option v-for="(value,subCategory) in SubCategoryNameMapValue" 
                    :key="value" :value="value">
                        {{ subCategory }}
                    </option>
                </select>
            </div>
            <div v-if="selectedCategory === '新增主分類' " class="input-group mb-3">
                <input v-model="categoryText" type="text" class="form-control" placeholder="填寫主分類名稱">
                <button @click="addCategory()" class="btn btn-outline-secondary" type="button">Add</button>
            </div>

            <div v-if="selectedSubCategory === '新增子分類'" class="input-group mb-3">
                <input v-model="subCategoryText" type="text" class="form-control" placeholder="填寫子分類名稱">
                <button @click="addSubCategory()" class="btn btn-outline-secondary" type="button">Add</button>
            </div>

            <!-- 新增新聞 -->
            <div class="input-group flex-nowrap col">
                <span class="input-group-text">標題</span>
                <input v-model="title" type="text" class="form-control">
            </div>
        </div>     
    </div>
    <div class="d-flex justify-content-center my-3 ">
        <div class="card text-center col-8">
            <div class="card-header">
                內文
            </div>
            <div class="card-body" >
                <textarea v-model="content" class="form-control" rows="10"></textarea>
            </div>
    
        </div>
    </div>
    <div class="d-flex justify-content-center my-5">
        <button type="button" class="btn btn-secondary"
        @click="addNews()">
            刊登
        </button>
    </div>

</template>
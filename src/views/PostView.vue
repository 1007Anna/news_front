<script>
export default {
    data() {
        return {
            title: null,
            content: null,
            selectedCategory: null,
            selectedCategoryID: null,
            selectedSubCategory: null,
            categoryList: [
                {
                    categoryIdMap: {},
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
                    // categoryName: "新增主分類",
                    categoryIdMap: { "新增主分類": 0 }
                    
                })
                // 儲存原本"categoryList[0]"的值
                var categoryIndex0 = this.categoryList[0]; 
                // 將this.categoryList[6]的值代入this.categoryList[0]
                this.categoryList[0] = this.categoryList[6]; 
                // 將categoryIndex0代入this.categoryList[6]
                this.categoryList[6] = categoryIndex0;
            })           
        },
        addCategorySubCategory(){
            let body = {
                "categoryName":this.categoryText,
                "subCategoryName":this.subCategoryText
            }
            fetch('http://localhost:8080/addCategoryAndSubCategory', {
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
                location.reload();
            })
        },
        addSubCategory(){
            let body = {
                "categoryID":this.selectedCategoryID,
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
                location.reload();
            })
        },
        updateCategoryID() {
            // 更新 selectedCategoryID
            const selectedCategoryObj = this.categoryList.find(
                (category) => Object.keys(category.categoryIdMap)[0] === this.selectedCategory
            );
            if (selectedCategoryObj) {
                this.selectedCategoryID = selectedCategoryObj.categoryIdMap[this.selectedCategory];
            } else {
                // 沒有匹配的值時則設為null
                this.selectedCategoryID = null;
            }
            
        },
    },
    mounted() {
        this.getAllSubCategory()
    },
    computed: {
        SubCategoryNameMapValue() {
            if (this.selectedCategory !== null) {
                const selectedCategoryObj = this.categoryList.find(
                    (category) => category.categoryIdMap[this.selectedCategory] !== undefined
                );
                if (selectedCategoryObj) {
                    return selectedCategoryObj.subCategoryNameMap;
                } else {
                    return {};
                }
            } else {
                return {};
            }
        },
    },
    
}
</script>

<template>
    <div class="d-flex justify-content-center mt-6 mb-3">
        <div class="d-flex flex-column justify-content-center col-8">
            <div class="d-flex justify-content-center mb-3">   
                <select v-model="selectedCategory"
                class="input-group flex-nowrap form-select col me-3"
                aria-label="Default select example"
                @change="updateCategoryID">
                    <option v-for="(categoryName, categoryID) in categoryList" 
                    :key="categoryID" >
                        {{ Object.keys(categoryName.categoryIdMap)[0] }}
                    </option>
                </select>
                <select v-if="selectedCategory" v-model="selectedSubCategory"
                class="input-group flex-nowrap form-select col ms-3"
                aria-label="Default select example">
                    <option >新增子分類</option>
                    <option v-for="(subCategoryID,subCategoryName) in SubCategoryNameMapValue" 
                    :key="subCategoryID" :value="subCategoryID">
                        {{ subCategoryName }}
                    </option>
                </select>
            </div>
            <div v-if="selectedCategory === '新增主分類' " class="input-group mb-3">
                <input v-model="categoryText" type="text" class="form-control" placeholder="填寫主分類名稱">
                <input v-model="subCategoryText" type="text" class="form-control" placeholder="填寫子分類名稱">
                <button @click="addCategorySubCategory()" class="btn btn-outline-secondary" type="button">Add</button>
            </div>

            <div v-if="selectedSubCategory === '新增子分類' && selectedCategory !== '新增主分類' " 
            class="input-group mb-3">
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
    <div class="d-flex justify-content-center my-2">
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
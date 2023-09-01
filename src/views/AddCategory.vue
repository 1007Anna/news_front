<script>
export default {
    data() {
        return {
            categoryList:[],
            selectedCategory:null,
            selectedSubCategory:null,
        }
    },
    methods: {
        getAllCategory(){
            fetch('http://localhost:8080/getAllCategory')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.categoryList = data.categoryList;
                console.log(this.categoryList)
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
        this.getAllCategory()
    },
}
</script>

<template>
    {{ selectedCategory }}

    <div class="d-flex flex-column justify-content-center col-8 m-auto">
        <div class="d-flex justify-content-center mb-3">   
                <select v-model="selectedCategory"
                class="input-group flex-nowrap form-select col me-3"
                aria-label="Default select example">
                    <option v-for="(category,index) in categoryList" :key="index">
                        {{ category.categoryName }}{{ category.categoryID }}
                    </option>
                </select>
                
            </div>
        </div>

    <div class="d-flex flex-column justify-content-center m-auto col-8">
    <div class="input-group mb-3">
                <input v-model="categoryText" type="text" class="form-control" placeholder="填寫主分類名稱">
                <button @click="addCategory()" class="btn btn-outline-secondary" type="button">Add</button>
            </div>

            <div  class="input-group mb-3">
                <input v-model="subCategoryText" type="text" class="form-control" placeholder="填寫子分類名稱">
                <button @click="addSubCategory()" class="btn btn-outline-secondary" type="button">Add</button>
            </div>
        </div>
</template>
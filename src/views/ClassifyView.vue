<script>
export default {
    data() {
        return {
            selectedCategory: "新增主分類",
            selectedCategoryID: null,
            selectedSubCategory: "新增子分類",
            categoryList: [
                {
                    categoryIdMap: {},
                    subCategoryNameMap: {}
                },       
            ],
            categoryText: null,
            subCategoryText: null,
            categoryList02:[
                {
                    categoryIdMap: {},
                    subCategoryNameMap: {}
                },       
            ],
            categorySelect: null,
            subCategorySelect: null,
            categoryIDSelect: null,
            categoryText02: null,
            subCategoryText02: null,
        }
    },
    methods: {
        getAllSubCategory(){
            fetch('http://localhost:8080/getAllSubCategoryId')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.categoryList = data;
                this.categoryList.push({
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
        getSubCategory(){
            fetch('http://localhost:8080/getAllSubCategoryId')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.categoryList02 = data;
                console.log(this.categoryList02)
            })
        },
        updateCategoryValue() {
            // 更新 selectedCategoryID
            const categorySelectOjb = this.categoryList02.find(
                (category) => Object.keys(category.categoryIdMap)[0] === this.categorySelect
            );
            if (categorySelectOjb) {
                this.categoryIDSelect = categorySelectOjb.categoryIdMap[this.categorySelect];
            } else {
                // 沒有匹配的值時則設為null
                this.categoryIDSelect = null;
            }  
        },
        editCategory(){
            this.reviseModal = !this.reviseModal
            let body = {
                "categoryName": this.categoryText02,
                "categoryID": this.categoryIDSelect,
            }
            fetch('http://localhost:8080/editCategory', {
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
        editSubCategory(){
            this.reviseModal = !this.reviseModal
            let body = {
                "subCategoryID": this.subCategorySelect,
                "categoryID": this.categoryIDSelect,
                "subCategoryName": this.subCategoryText02,
            }
            fetch('http://localhost:8080/editSubCategory', {
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
    },
    mounted() {
        this.getAllSubCategory()
        this.getSubCategory()
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
        subCategoryMapValue() {
            if (this.categorySelect !== null) {
                const categorySelectObj = this.categoryList02.find(
                    (category) => category.categoryIdMap[this.categorySelect] !== undefined
                );
                if (categorySelectObj) {
                    return categorySelectObj.subCategoryNameMap;
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
    <!-- 新增 -->
    <form class="d-flex justify-content-center mt-5">
        <div class="card text-center col-8">
            <div class="card-header py-2 mb-3">
                新增分類
            </div>
            <div class="row mb-3 mt-3 d-flex justify-content-center mx-3">
                <div class="px-5 mb-3">
                    <select v-model="selectedCategory"
                    class="input-group flex-nowrap form-select col me-3"
                    aria-label="Default select example"
                    @change="updateCategoryID">
                        <option v-for="(categoryName, categoryID) in categoryList" 
                        :key="categoryID" >
                            {{ Object.keys(categoryName.categoryIdMap)[0] }}
                        </option>
                    </select>
                </div>
                <div v-if="selectedCategory === '新增主分類' " class="input-group px-5 my-3">
                    <input v-model="categoryText" type="text" class="form-control" 
                    placeholder="填寫主分類名稱">
                    <input v-model="subCategoryText" type="text" class="form-control" 
                    placeholder="填寫子分類名稱">
                    <button @click="addCategorySubCategory()" 
                    class="btn btn-outline-secondary" type="button">
                        Add
                    </button>
                </div>
                <div v-if="selectedCategory !== '新增主分類'" class="input-group px-5 my-3">
                    <input v-model="subCategoryText" type="text" class="form-control" 
                    placeholder="填寫子分類名稱">
                    <button @click="addSubCategory()" 
                    class="btn btn-outline-secondary" type="button">
                        Add
                    </button>
                </div>
            </div>
        </div>
    </form>
    <!-- 修改 -->
    <form class="d-flex justify-content-center mt-5">
        <div class="card text-center col-8">
            <div class="card-header py-2 mb-3">
                修改分類
            </div>
            <div class="row mb-3 mt-3 d-flex justify-content-center mx-3">
                <div class="row mb-3 px-5">
                    <label class="col-sm-2 col-form-label">主分類</label>
                    <div class="col-sm-10">
                        <select v-model="categorySelect"
                        class="input-group flex-nowrap form-select col me-3"
                        aria-label="Default select example"
                        @change="updateCategoryValue()">
                            <option v-for="(categoryName, categoryID) in categoryList02" 
                            :key="categoryID" >
                                {{ Object.keys(categoryName.categoryIdMap)[0] }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-10 input-group px-5">
                        <input v-model="categoryText02" type="text" class="form-control" 
                        placeholder="填寫主分類名稱">
                        <button @click="editCategory" 
                        class="btn btn-outline-secondary" type="button">
                            Revise
                        </button>
                        
                    </div>
                </div>
                
                <div class="row mb-3 px-5">
                    <label class="col-sm-2 col-form-label">子分類</label>
                    <div class="col-sm-10">
                        <select v-model="subCategorySelect"
                        class="input-group flex-nowrap form-select col"
                        aria-label="Default select example">
                            <option v-for="(subCategoryID,subCategoryName) in subCategoryMapValue" 
                            :key="subCategoryID" :value="subCategoryID">
                                {{ subCategoryName }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 input-group px-5">
                        <input v-model="subCategoryText02" type="text" class="form-control" 
                        placeholder="填寫子分類名稱">
                        <button @click="editSubCategory" 
                        class="btn btn-outline-secondary" type="button">
                            Revise
                        </button>
                        
                    </div>
                </div>
    
            </div>
        </div>
    </form>
</template>
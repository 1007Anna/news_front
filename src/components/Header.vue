<script>

export default {
    data() {
        return {
            location: 0,
            categories: [
                {
                    name: '文章管理',
                    subcategories: [
                        {
                            name:'刊登文章',
                            url:"/post"
                        },
                        {
                            name:'編輯文章',
                            url:"/manage"
                        },                  
                    ],
                    isShow: false
                },
            ],
        }
    },
    methods: {
        switchLocation(locoNum) {
            this.location = locoNum;
        },
        showSubcategory(index) {
            this.categories[index].isShow = true;
        },
        hideSubcategory(index) {
            this.categories[index].isShow = false;
        }
    }
    
}
</script>
<template >
    <header class="d-flex flex-wrap align-items-center 
    justify-content-center py-3 mb-4 border-bottom col">
        <div>
            <nav class="d-flex col-12 col-md-auto justify-content-center">
                <RouterLink to="/home" @click="switchLocation(1)" class="navBtn" :class="{target: location === 1}">
                Home
                </RouterLink>
                <RouterLink to="/hotNews" @click="switchLocation(2)" class="navBtn" :class="{target: location === 2}">
                    最新消息
                </RouterLink>   

                
                <div class="navBtn"
                @mouseover="showSubcategory(0)"
                @mouseleave="hideSubcategory(0)">
                    {{ categories[0].name }}
                    <div v-if="categories[0].isShow">
                        <div v-for="(subcategories, index) in categories[0].subcategories" :key="index">
                            <RouterLink v-bind:to="subcategories.url" 
                            @click="switchLocation(index+3)" class="navBtn" 
                            :class="{target: location === index+3}">
                                {{ subcategories.name }}
                            </RouterLink>              
                        </div>
                    </div>
                </div>         
                
                <RouterLink to="/home" @click="switchLocation(5)" class="navBtn" :class="{target: location === 5}">
                    問題回報
                </RouterLink>
            </nav>
        </div>
        
        <RouterLink to="/" type="button" 
        class="btn btn-outline-light ms-8">
                Log in
        </RouterLink>

    </header>
</template>
<style lang="scss" scoped>
header{
    background-color: #E2C2B3;
}
.navBtn {
    color: white;
    padding: 10px 40px;
    text-decoration: none;
}
.target {
    background-color: #e0dbd9;
    color: rgb(145, 93, 10);
}
</style>







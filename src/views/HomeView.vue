<script>
import CategorySelect from "../components/CategorySelect.vue";
import SearchBar from "../components/SearchBar.vue";
import NewsSelect from "../components/NewsSelect.vue";

export default {
    components: {
      	CategorySelect,
      	SearchBar,
      	NewsSelect
    },
	data() {
        return {
            keyword: null,
            startDay: null,
            endDay: null,
            // 所有搜尋出的新聞資料
            newsList: [],
        }
	},
    methods: {
		getAllNews(){
            fetch('http://localhost:8080/getNewsAll')
                
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.newsList = data
                console.log(this.newsList)

            })
        },
		updatedNewsList(updatedNewsList) {
            this.newsList = updatedNewsList;
        },
        updatedSubNewsList(updatedSubNewsList){
            this.newsList = updatedSubNewsList
        }
  	},
	mounted() {
        this.getAllNews()
        // this.getAllNewsBySubCategoryName()
    },
    
};
</script>

<template>
  <CategorySelect @NewsListBySubCategory="updatedSubNewsList"/>
  <SearchBar @searchNewsList="updatedNewsList" />
  <NewsSelect :newsList="newsList" />
</template>

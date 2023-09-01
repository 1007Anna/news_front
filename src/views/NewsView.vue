<script>
export default {
    props: ['title','content','name','updateTime'],
    data() {
        return {
        }
    },
    methods: {
             
    },
    mounted() {
    },
}
</script>
<template>

    <div class="card text-center d-flex m-auto mt-6" style="width: 70%;">
        <div class="card-header"></div>
        <div class="card-body">
            <h3 class="card-title my-4 mb-5">{{ title }}</h3>
            <div class="d-flex justify-content-center">
                <h6 class="card-text mb-4" style="width: 80%;">{{ content }}</h6>
            </div>
            <div class="mt-4 me-5">
                <p class="text-end">
                    撰寫人 : {{ name }}
                    <p class="text-end">配信時間 : {{ updateTime }}</p>
                </p>
                
            </div>
            
        </div>
        <div class="card-footer text-muted"></div>
    </div>

</template>
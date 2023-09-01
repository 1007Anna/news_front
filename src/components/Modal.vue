<script>
export default {
    // 傳入一個 title 字串作為標題顯示
    props: ["title"],
    data() {
        return {
            rent: null,
            managementFee: null,
            startingTime: null,
            timeLimit: null,
        }
    },
    methods: {
        // 綁訂一個 @close 作為右上角取消按鈕的方法
        closeModal() {
            this.$emit("close");
        }
    }
}
</script>
<template>
    <div class="modal-view">
        <div class="card">
            <div class="closeBtn" @click="closeModal"></div>
            <h2>{{ title }}</h2>
            <!-- 插槽(可供父層插入內容) -->
            <slot></slot>
        </div>
        <div class="bg"></div>
    </div>
</template>
<style lang="scss" scoped>
.modal-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .card {
        background-color: #fff;
        padding: 2rem;
        z-index: 1;
        position: relative;

        .closeBtn {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
            transition: 0.3s;
            
            &:hover {
                cursor: pointer;
                scale: 1.05;
            }

            &:active {
                scale: 0.95;
            }

            &::before, &::after {
                content: "";
                width: 20px;
                height: 2px;
                background-color: black;
                border-radius: 1px;
                position: absolute;
                top: 10px;
                left: 0;
                
            }

            &::before {
                rotate: 45deg;
            }

            &::after {
                rotate: -45deg;
            }
        }

        h2 {
            text-align: center;
        }

        .line {
            margin: 0.5rem;
            border: 1.5px solid #B8D26E;
            border-radius: 1px;
            min-width: 16rem;
        }
    }
    
    .bg {
        position: inherit;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #162a3d;
        opacity: 0.9;
    }
}

</style>
<template>
    <b-navbar id="chat-navbar" toggleble="md" type="dark" variant="info">
        <b-navbar-brand to="/">
            Vue Chat
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-text class="user-pin">{{user.name}}</b-nav-text>
            <b-nav-item href="#" @click="onLogout" active>Logout</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>
<script>
    import { mapState, mapActions, mapMutations } from 'vuex';
    export default {
        name:'ChatNavBar',
        computed: {
            ...mapState([
                'user',
                'reconnect'
            ])
        },
        methods: {
            ...mapActions([
                'logout',
                'login'
            ]),
            ...mapMutations([
                'setReconnect'
            ]),
            onLogout(){
                this.$router.push({path: '/'});
                this.logout()
            },
            unload(){
                if(this.user.username){
                    this.setReconnect(true)
                }
            }
        },
        mounted() {
            window.addEventListener("beforeunload", this.unload);
            if(this.reconnect){
                this.login(this.user.username)
            }
        }
    }
</script>
<style scoped>
    #chat-navbar {
        margin-bottom: 15px;
    }
    .user-pin {
    }
</style>

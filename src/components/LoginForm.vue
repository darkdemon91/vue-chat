<template>
    <div class="login-form">
        <div v-if="!user">
            <h5 class="text-center">ChatLogin</h5>
            <hr>
            <b-form @submit.prevent="onSubmit">
                <b-alert variant="danger" :show="hasError">{{error}}</b-alert>
                <b-form-group id="userInputGroup"
                              label="User Name"
                              label-for='userInput'>
                    <b-form-input id="userInput"
                                  type="text"
                                  placeholder="Enter user name"
                                  v-model="userId"
                                  autocomplite="off"
                                  :disabled="loading"
                                  required>
                    </b-form-input>
                </b-form-group>
                <b-button type="submit"
                          variant="primary"
                          class="ld-ext-right"
                          v-bind:class="{running:loading}"
                          :disabled="isValid">
                    Login
                    <div class="ld ld-ring ld-spin"></div>
                </b-button>
            </b-form>
        </div>
        <div v-else>
            <div v-if="loading">
                загрузка...
            </div>
            <div v-else>
                <h4>Hello {{user.name}}</h4>
                <b-btn to="/chat">
                    Go Chat Room
                </b-btn>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex';
    export default {
        name: 'login-form',
        data(){
            return {
                userId: ''
            }
        },
        computed: {
            isValid: function () {
                const result = this.userId.length < 3;
                return result ? result : this.loading
            },
            ...mapState([
                'loading',
                'error',
                'user'
            ]),
            ...mapGetters([
                'hasError'
            ])
        },
        methods: {
            ...mapActions([
                'login'
            ]),
            async onSubmit() {
                const result = await this.login(this.userId);
                if(result) {
                    this.$router.push('chat')
                }
            }
        }
    }
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>User List</h3>
    <ul v-for="user in users" :key="user.id">
      <li>{{ user.id }}</li>
      <li>{{ user.name }}</li>
      <li>{{ user.createdAt }}</li>
      <li><img :src="user.avatar"/></li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import axios, {AxiosResponse} from 'axios';

type User = { id: string, createdAt: Date, name: string, avatar: string };
const USER_API_URL = 'https://60b881f2b54b0a0017c03bb3.mockapi.io/v1/users';

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;

  private users: Array<User> = [];

  /**
   * Check the first created state.
   */
  private afterLoaded = false;

  /**
   * Vue lifeCycle - init component at the Dom ready
   */
  protected mounted() {
    console.info('call mounted...')
    this.fetchDatas();
  }

  /**
   * Vue lifeCycle - keepAlive Activated
   */
  protected activated() {
    if(this.afterLoaded) {
      console.info('call activated');
      this.fetchDatas();
    }

    this.afterLoaded = true;
  }

  /**
   * request todos list from the server
   *
   * @private
   */
  private fetchDatas() {
    axios.get(USER_API_URL)
        .then((response: AxiosResponse) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  }

}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

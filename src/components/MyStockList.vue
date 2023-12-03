<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Brand</th>
        <th>ISO</th>
        <th>Image</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="stock in stocks" :key="stock.id">
        <td>{{ stock.name }}</td>
        <td>{{ stock.brand }}</td>
        <td>{{ stock.iso }}</td>
        <td><img :src="stock.staticImageURL"  alt="thing.name" height="50px"></td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StockList',
  data () {
    return {
      stocks: []
    }
  },
  methods: {
    loadStocks () {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch('http://localhost:8080/api/stocks', requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result),
                result.forEach(stock => {
                  this.stocks.push(stock)
                })
          })
          .catch(error => console.log('error', error))
    },
    save () {
      const baseUrl = process.env.VUE_APP_BACKEND_BASE_URL
      const endpoint = baseUrl + '/things'
      const data = {
        name: this.nameField,
        price: this.priceField,
        owner: this.claims.email
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Authorization: 'Bearer ' + this.accessToken
        },
        body: JSON.stringify(data)
      }
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
          })
          .catch(error => console.log('error', error))
    }
  },
  mounted () {
    this.loadStocks()
  }
}
</script>

<style scoped>
</style>
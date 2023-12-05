<template>
  <div class="row row-cols-1 row-cols-md-4 g-4">
    <div class="col" v-for="stock in stocks" :key="stock.id">
      <div class="card">
        <img :src=stock.staticImageUrl class="card-img-top" :alt="stock.name">
        <div class="card-body">
          <h5 class="card-title">{{ stock.brand }} {{ stock.name }}</h5>
          <p class="card-text">{{ stock.description }}</p>
        </div>
      </div>
    </div>
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
      fetch(baseUrl + '/stocks', requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result),
                result.forEach(stock => {
                  this.stocks.push(stock)
                })
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
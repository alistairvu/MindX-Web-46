// RTK Setup
const RTK = window.RTK
const countSlice = RTK.createSlice({
  name: "count",
  initialState: 0,

  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
})

const { increment, decrement } = countSlice.actions
const store = RTK.configureStore({
  reducer: countSlice.reducer,
})

// App
const $clickBtn = $(".click-btn")
const $countDisplay = $("#counter")

store.subscribe(() => $countDisplay.html(store.getState()))

$clickBtn.on("click", function () {
  const $this = $(this)
  const type = $this.attr("data-type")

  switch (type) {
    case "down": {
      store.dispatch(decrement())
      break
    }
    case "up": {
      store.dispatch(increment())
      break
    }
  }
})

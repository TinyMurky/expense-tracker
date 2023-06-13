// 以下為呈現每日總和花費的code

// 使用set整理畫面上所有出現的日期
const allDateNode = Array.from(document.querySelectorAll('.create-time'))
const allDateSet = new Set(allDateNode.map((item) => item.textContent))
const allDateMap = new Map()
// set中的日期在map中創造一個項目
allDateSet.forEach(date => {
  allDateMap.set(date, 0)
})
// 把一個日期的所有花費用forEach加在該項目裡
allDateNode.forEach(item => {
  allDateMap.set(
    item.textContent,
    allDateMap.get(item.textContent) + parseInt(item.parentElement.parentElement.parentElement.querySelector('.number').textContent)
  )
})

const allEntries = document.querySelectorAll('.entry')
const entriesBody = document.querySelector('.entries-table').querySelector('tbody')
// 紀錄今天與昨天
const today = new Date()
const yesterday = new Date(Date.now() - 86400000)

allEntries.forEach(entry => {
  // 畫面中的每一個entries，用entries的日期去尋找map中當天金額的總和
  let entryDate = entry.querySelector('.create-time').textContent
  if (allDateMap.has(entryDate)) {
    // 如果日期存在於map中，在該entry前面插入當天的花費總和
    const newNode = document.createElement('tr')
    const entrySum = allDateMap.get(entryDate)
    // 用完就刪掉，讓我們只在每天的第一筆entry前插入總和
    allDateMap.delete(entryDate)
    switch (entryDate) {
      // 日期是今天或昨天會顯示特別字樣
      case today.toLocaleDateString('zh-TW'):
        entryDate = 'Today'
        break
      case yesterday.toLocaleDateString('zh-TW'):
        entryDate = 'Yesterday'
        break
    }
    newNode.classList.add('date-sum')
    newNode.innerHTML = `
                    <th scope="col"></th>
                    <th scope="col" class="text-body-secondary">${entryDate}:</th>
                    <th scope="col" class="text-body-secondary">$<spam class="number">${entrySum}</spam></th>
                    <th scope="col" class="text-body-secondary"></th>
                  `
    entriesBody.insertBefore(newNode, entry)
  }
})

// 以下為幫數字打上打上千分位
function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const numbers = document.querySelectorAll('.number')
for (const number of numbers) {
  number.textContent = numberWithCommas(number.textContent)
}

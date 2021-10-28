const { Shop, Item } = require("../src/gilded_rose")

describe("Assert all item properties exist", function () {
  it("Has sellIn value", function () {
    const gildedRose = new Shop([
      new Item("malk", 0, 0),
      new Item("eggs", 1, 2),
      new Item("potions", 3, 5),
    ])

    gildedRose.items.forEach((item) => {
      expect(item.sellIn).toBeDefined()
    })
  })

  it("Has quality value", function () {
    const gildedRose = new Shop([
      new Item("malk", 0, 0),
      new Item("eggs", 1, 2),
      new Item("potions", 3, 5),
    ])

    gildedRose.items.forEach((item) => {
      expect(item.quality).toBeDefined()
    })
  })

  it("Has a name", function () {
    const gildedRose = new Shop([
      new Item("malk", 0, 0),
      new Item("eggs", 1, 2),
      new Item("potions", 3, 5),
    ])

    gildedRose.items.forEach((item) => {
      expect(item.name).toBeDefined()
    })
  })
})

describe("quality and sellAt tests for generic items", function () {
  it("quality degrades by 1 after one day", function () {
    const quality = 20
    const sellIn = 10
    const gildedRose = new Shop([new Item("potions", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(quality - 1)
  })

  it("sellAt decreases by 1 after one day", function () {
    const quality = 20
    const sellIn = 10
    const gildedRose = new Shop([new Item("potions", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].sellIn).toBe(sellIn - 1)
  })

  it("quality degrades twice as fast after sellIn date", function () {
    const quality = 20
    const sellIn = 0
    const gildedRose = new Shop([new Item("potions", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(quality - 2)
  })

  it("quality is never negative", function () {
    const quality = 0
    const sellIn = 10
    const gildedRose = new Shop([new Item("potions", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(0)
  })

  it("Negative sellIn is valid", function () {
    const quality = 15
    const sellIn = -10
    const gildedRose = new Shop([new Item("potions", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(13)
  })
})

describe("quality tests for Aged Brie", function () {
  it("quality increases by 1 after one day before sellIn", function () {
    const quality = 20
    const sellIn = 10
    const gildedRose = new Shop([new Item("Aged Brie", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(quality + 1)
  })

  it("quality increases by 2 after one day after sellIn", function () {
    const quality = 20
    const sellIn = 0
    const gildedRose = new Shop([new Item("Aged Brie", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(quality + 2)
  })

  it("quality does not increase over 50", function () {
    const quality = 50
    const sellIn = 10
    const gildedRose = new Shop([new Item("Aged Brie", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(50)
  })

  it("quality limited to 50 even if incremented by 2 from 49", function () {
    const quality = 49
    const sellIn = -2
    const gildedRose = new Shop([new Item("Aged Brie", sellIn, quality)])

    const items = gildedRose.updateQuality()

    expect(items[0].quality).toBe(50)
  })
})

describe("quality and sellAt tests for Sulfuras", function () {})

describe("quality and sellAt tests for Backstage passes", function () {})

/*
DO NOT alter the Item class or the Item properties!

	- All items have a SellIn value which denotes the number of days we have to sell the item
	- All items have a Quality value which denotes how valuable the item is
	- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

	- Once the sell by date has passed, Quality degrades twice as fast
	- The Quality of an item is never negative
	- "Aged Brie" actually increases in Quality the older it gets
	- The Quality of an item is never more than 50
	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

	- "Conjured" items degrade in Quality twice as fast as normal items
*/

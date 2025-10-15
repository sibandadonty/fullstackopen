const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test("of an empty list", () => {
    const result = listHelper.totalLikes([]);

    assert.strictEqual(result, 0);
  })
  test("of a bigger list", () => {
    const result = listHelper.totalLikes(listHelper.blogs);
    assert.strictEqual(result, 36)    
  })
})

describe("favourite blog", () => {

    test("a list with multiple blogs", () => {
    const result = listHelper.favoriteBlog(listHelper.blogs);

    assert.deepStrictEqual(result,   {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    })

    test("list with one blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);

        assert.deepStrictEqual(result, listWithOneBlog[0]);
    })

})
})

describe("most likes", () => {
    test("list with only one item", () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test("list with multiple items", () => {
        const result = listHelper.mostLikes(listHelper.blogs);

        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 12 });
    })
})
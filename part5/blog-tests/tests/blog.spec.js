const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginUser } = require("../helper")

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole("button", {name: 'login'})).toBeVisible()
  })

   describe('Login', () => {
    beforeEach(async ({ page, request }) => {
        await request.get("http://localhost:3003/api/testing/reset")
        await request.post("http://localhost:3003/api/users", {
            data: {
              name: 'Donty Sibanda',
              username: 'root',
              password: 'qwerty123'
            }
        })
        await page.goto('http://localhost:5173')
    })
  
    test('succeeds with correct credentials', async ({ page }) => {
      await loginUser(page, "root", "qwerty123")
      await expect(page.getByText("admin is logged in")).toBeVisible()
     })

    test('fails with wrong credentials', async ({ page }) => {
      await loginUser(page, "root", "incorrect")
      await expect(page.getByText("admin is logged in")).not.toBeVisible()
    })
  })

   describe('When logged in', () => {
    beforeEach(async ({ page }) => {
       await loginUser(page, "root", "qwerty123")
    })

    test('a new blog can be created', async ({ page }) => {
       await page.getByRole("button", {name: "create new blog"}).click()
       const textboxes = await page.getByRole("textbox").all()
       await textboxes[0].fill("we move we move")
       await textboxes[1].fill("maluvha")
       await textboxes[2].fill("www.mjolo.co.zw")

       await page.getByRole("button", {name: "Submit"}).click()
       await expect(page.getByAltText("Create New")).not.toBeVisible()

    })
  })
})
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole("button", {name: 'login'})).toBeVisible()
  })

   describe('Login', () => {
  
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel("username").fill("root")
      await page.getByLabel("password").fill("qwerty123")
      await page.getByRole("button", {name: 'login'}).click()
      await expect(page.getByText("admin is logged in")).toBeVisible()
     })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel("username").fill("root")
      await page.getByLabel("password").fill("wrong")
      await page.getByRole("button", {name: 'login'}).click()
      await expect(page.getByText("admin is logged in")).not.toBeVisible()
    })
  })
})